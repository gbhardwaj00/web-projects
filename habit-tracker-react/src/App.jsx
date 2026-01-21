import './App.css';
import Header from './components/Header';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [habits, setHabits] = useLocalStorage('habits-list', []);

  const isDoneToday = (habit) => {
    const today = new Date().toISOString().split('T')[0];
    return habit.completedDates?.includes(today);
  }

  const stats = {
    totalHabits: habits.length,
    doneHabits: habits.filter(habit => isDoneToday(habit)).length,
  }

  return (
    <>
      <Header stats={stats} />
      <main>
        {/* <AddHabitForm onAdd={addHabit} /> */}
        {/* <Filters currentFilter={filter} onFilterChange={setFilter} /> */}

        {/* <HabitList 
            habits={habits} 
            filter={filter} 
            onToggle={toggleHabit} 
            onDelete={confirmDelete} 
        /> */}

        {/* <DeleteModal 
            ref={deleteModalRef} 
            onConfirm={handleDelete} 
            onCancel={cancelDelete} 
        /> */}
      </main>
    </>
  );
}

export default App;
