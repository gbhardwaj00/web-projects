"use strict";

const habitsList = document.getElementById('habits-list')
const habitNameInput = document.getElementById('habit-name')
const addHabitForm = document.getElementById('add-habit-form')
const errorMsg = document.getElementById('error-message')
const filters = document.getElementById('filters')
const filterBtns = document.querySelectorAll('.filter-btn')
const STORAGE_KEY = "habit-tracker-state";

const state = {
    habits: [],
    filter: 'all'
};

const saveState = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

const loadState = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

const getDateString = (dateObj) => dateObj.toISOString().slice(0, 10)

const getYesterday = (dateStr) => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() - 1);               // go back 1 day
    return getDateString(d);
}

const getStreak = (completedDates) => {
    let current = getDateString(new Date())
    let streak = 0
    let completedDatesSet = new Set(completedDates)
    if (completedDatesSet.has(current)) {
        streak += 1
        let prev = getYesterday(current)
        while (completedDatesSet.has(prev)) {
            prev = getYesterday(prev)
            streak += 1
        }
    }
    return streak
}

const render = () => {
    if (state.habits.length === 0) {
        habitsList.innerHTML = '<p class="empty-state">No habits yet — add one above.</p>'
        return
    }
    let html = "";
    const today = getDateString(new Date())
    let filteredHabits = state.habits;
    if (state.filter == 'done') {
        filteredHabits = state.habits.filter((h) => h.completedDates.includes(today))
    } else if (state.filter == 'notDone') {
        filteredHabits = state.habits.filter((h) => !(h.completedDates.includes(today)))
    }

    for (const habit of filteredHabits) {
        const isDone = habit.completedDates.includes(today)
        const streak = getStreak(habit.completedDates);
        html += `
        <div class='habit-card ${isDone ? 'done' : ''}' data-id="${habit.id}"> 
            <h2 class='habit-name'></h2>
            <p class='text-streak'>Streak: ${streak}</p>
            <div class="habit-actions">
                <button class="done-today-btn" type="button" data-id="${habit.id}">${isDone ? 'Completed' : 'Mark Done'}</button>
                <button class="delete-habit-btn" type="button" data-id="${habit.id}">Delete</button>
            </div>
        </div>
        `
    }

    habitsList.innerHTML = html;

    const habitNameEls = habitsList.querySelectorAll('.habit-card .habit-name')
    habitNameEls.forEach((habitEl, i) => {
        habitEl.textContent = filteredHabits[i].name;
    })
}

const generateId = (habitName) => {
    return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

const habitExists = (habitName) => {
    return state.habits.some((h) => h.name.trim().toLowerCase() === habitName.trim().toLowerCase())
}

addHabitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = habitNameInput.value.trim();
    if (!name) {
        errorMsg.textContent = 'Please enter a valid habit name.';
        return;
    }
    if (habitExists(name)) {
        errorMsg.textContent = "That habit already exists."
        habitNameInput.focus()
        return
    }
    errorMsg.textContent = ''
    const habit = {
        id: generateId(name),
        name: name,
        completedDates: []
    }
    state.habits.push(habit)
    saveState()
    habitNameInput.value = ''
    habitNameInput.focus()
    render()
});

habitsList.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    // Didnt click on a button, return
    if (!btn) {
        return;
    }

    // cases where buttons are clicked
    if (btn.classList.contains("done-today-btn")) {
        const habitId = btn.dataset.id;
        const habit = state.habits.find((h) => h.id === habitId)
        if (!habit) return;

        const date = getDateString(new Date());
        if (habit.completedDates.includes(date)) {
            let index = habit.completedDates.indexOf(date)
            habit.completedDates.splice(index, 1)
        } else {
            habit.completedDates.push(date)
        }
        saveState()
        render()
        return;
    }

    if (btn.classList.contains("delete-habit-btn")) {
        const hasConfirmed = confirm('Delete this habit?')
        if (!hasConfirmed) return;
        const habitId = btn.dataset.id;
        // run your "delete habit" logic here using habitId
        const index = state.habits.findIndex((h) => h.id === habitId)
        if (index === -1) return;
        state.habits.splice(index, 1)
        saveState()
        render()
        return;
    }
})

filters.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) {
        return;
    }
    if (!btn.dataset.filter) return;
    state.filter = btn.dataset.filter;
    for (let filterBtn of filterBtns) {
        filterBtn.classList.remove('is-active')
    }
    btn.classList.add('is-active')
    saveState()
    render()
})

const loaded = loadState();
if (loaded) {
    state.habits = loaded.habits ?? [];
    state.filter = loaded.filter ?? "all";
    const selectedBtn = filters.querySelector(`.filter-btn[data-filter="${state.filter}"]`);
    for (let filterBtn of filterBtns) {
        filterBtn.classList.remove('is-active')
    }
    if (selectedBtn) selectedBtn.classList.add("is-active");
}

habitNameInput.addEventListener('input', () => {
    errorMsg.textContent = ''
})

render();