import BuddyContainer from "./BuddyContainer";

function Header({ stats }) {
    return (
        <header>
            <h1>Habit Tracker</h1>
            <BuddyContainer stats={stats} />
        </header>
    )
}

export default Header;