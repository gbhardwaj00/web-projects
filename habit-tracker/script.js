"use strict";

const habitsList = document.getElementById('habits-list')
const habitNameInput = document.getElementById('habit-name')
const addHabitForm = document.getElementById('add-habit-form')
const errorMsg = document.getElementById('error-message')

const state = {
    habits: [
      { id: "h1", name: "Gym", completedDates: [] },
      { id: "h2", name: "Cook", completedDates: ["2026-01-14"] },
    ],
};

const render = () => {
    let html = "";
    for (const habit of state.habits) {
        html += `
        <div class='habit-card' data-id="${habit.id}"> 
            <h2 class='habit-name'></h2>
            <p class='text-streak'>Streak: 0</p>
            <div class="habit-actions">
                <button class="done-today-btn" type="button" data-id="${habit.id}">Mark Done</button>
                <button class="delete-habit-btn" type="button" data-id="${habit.id}">Delete</button>
            </div>
        </div>
        `
    }

    habitsList.innerHTML = html;
    
    const habitNameEls = habitsList.querySelectorAll('.habit-card .habit-name')
    habitNameEls.forEach((habit, i) => {
        habit.textContent = state.habits[i].name;
    })
    console.log(state)
}

render()

const generateId = (habitName) => {
    return Date.now().toString(36) + Math.random().toString(36).slice(2)
}
addHabitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = habitNameInput.value.trim();
    if (!name) {
        errorMsg.textContent = 'Please enter a valid habit name.';
        return;
    }
    errorMsg.textContent = ''
    const habit = {
        id: generateId(name),
        name: name,
        completedDates: []
    }
    state.habits.push(habit)
    habitNameInput.value = ''
    habitNameInput.focus()
    render()
});

const getYesterday = (dateStr) => {
    const today = dateStr
    return getDateString(new Date(today) - 24 * 60 * 60 * 60)
}

const getStreak = (completedDates) => {
    let current = getDateString(new Date())
    let streak = 0
    let completedDatesSet = new Set(completedDates)
    if (completedDatesSet.has(today)) {
        streak += 1
        while (completedDatesSet.has(getYesterday(current))) {
            current = getYesterday(current)
            streak += 1
        }
    }
    return streak
}

const getDateString = (dateObj) => dateObj.toISOString().slice(0, 10)

habitsList.addEventListener('click', (e)=> {
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
            btn.innerText = 'Mark Done'
        } else {
            habit.completedDates.push(date)
            btn.innerText = 'Done'
        }
        console.log("DONE clicked for:", habitId);
        return;
      }
    
      if (btn.classList.contains("delete-habit-btn")) {
        const habitId = btn.dataset.id;
        // run your "delete habit" logic here using habitId
        const index = state.habits.findIndex((h) => h.id === habitId)
        if (index === -1) return;
        state.habits.splice(index, 1)
        console.log("DELETE clicked for:", habitId);
        render()
        return;
      }
})