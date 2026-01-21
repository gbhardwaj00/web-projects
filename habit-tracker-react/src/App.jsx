import './App.css';
import Header from './components/Header.jsx';
import useLocalStorage from './hooks/useLocalStorage';
import AddHabitForm from './components/AddHabitForm.jsx';

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

  const createId = () => {
    return crypto.randomUUID();
  }

  const addHabit = (habitName) => {
    // Return false if duplicate exists
    if (habits.some(h => h.name.trim().toLowerCase() === habitName.toLowerCase())) {
      return false;
    }

    const newHabit = {
      id: createId(habitName),
      name: habitName,
      completedDates: [],
    }
    setHabits([...habits, newHabit]);
    return true; // Return true if successful
  }

  return (
    <>
      <Header stats={stats} />
      <main>
        <AddHabitForm onAddHabit={addHabit} />
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
