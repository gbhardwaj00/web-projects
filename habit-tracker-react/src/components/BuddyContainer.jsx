function BuddyContainer({ stats }) {
    const { total, completed } = stats;
    let className;
    if (total === 0) {
        className = 'state-sleepy';
        return;
    }
    const ratio = completed / total;
    className = ratio >= 0.66 ? 'state-ecstatic' : ratio >= 0.33 ? 'state-happy' : 'state-sleepy';

    return <>
        <div id="buddy-container" className={className}>
            <svg viewBox="0 0 200 200" id="habit-buddy">
                <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                {/* Body */}
                <circle cx="100" cy="100" r="60" className="buddy-body" />

                {/* Expressions Group */}
                <g className="buddy-face">
                    {/* Eyes */}
                    <g className="eyes open">
                        <circle cx="80" cy="90" r="6" fill="#1e293b" />
                        <circle cx="120" cy="90" r="6" fill="#1e293b" />
                    </g>
                    <g className="eyes closed">
                        <path d="M74 92 Q80 96 86 92" stroke="#1e293b" strokeWidth="3" fill="none"
                            strokeLinecap="round" />
                        <path d="M114 92 Q120 96 126 92" stroke="#1e293b" strokeWidth="3" fill="none"
                            strokeLinecap="round" />
                    </g>

                    {/* Mouths */}
                    <path className="mouth sleepy" d="M90 110 Q100 110 110 110" stroke="#1e293b" strokeWidth="3"
                        fill="none" strokeLinecap="round" />
                    <path className="mouth happy" d="M80 105 Q100 125 120 105" stroke="#1e293b" strokeWidth="3" fill="none"
                        strokeLinecap="round" />
                    <path className="mouth ecstatic" d="M80 100 Q100 135 120 100" stroke="#1e293b" strokeWidth="4"
                        fill="none" strokeLinecap="round" />
                </g>

                {/* Party Hat (Hidden by default) */}
                <g className="party-hat">
                    <path d="M80 50 L100 10 L120 50 Z" fill="#f43f5e" />
                    <circle cx="100" cy="10" r="5" fill="#fbbf24" />
                </g>
            </svg>
        </div>
    </>
}

export default BuddyContainer;
