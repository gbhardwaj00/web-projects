"use strict";

const habitsList = document.getElementById('habits-list')

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
                <button class="done-today-btn" type="button" data-id="${habit.id}">Done</button>
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
}

render()