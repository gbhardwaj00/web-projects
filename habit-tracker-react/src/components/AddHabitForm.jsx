import React from 'react';

function AddHabitForm({ onAddHabit }) {
    const [habitName, setHabitName] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const trimmedHabitName = habitName.trim();

        if (!trimmedHabitName) {
            setErrorMessage('Please enter a habit name');
            return;
        }

        const success = onAddHabit(trimmedHabitName);
        if (success) {
            setHabitName('');
            setErrorMessage('');
        } else {
            setErrorMessage('Habit already exists');
        }
    }

    const handleHabitNameChange = (event) => {
        setHabitName(event.target.value);
        setErrorMessage('');
    }

    return (
        <div id="add-habit-container">
            <form id="add-habit-form" onSubmit={handleSubmit}>
                <label htmlFor="habit-name">Habit Name</label>
                <input type="text" id="habit-name" placeholder="Enter habit name" value={habitName} onChange={handleHabitNameChange} />
                <button type="submit" id="add-habit-btn">Add Habit</button>
            </form>
            <p id="error-message" role="alert">{errorMessage}</p>
        </div>
    )
}

export default AddHabitForm;
