import { IStopwatch } from "../types"

const Stopwatch = ({ stopwatch, handleStartStopwatch, handlePauseStopwatch, handleClearStopwatch }: {
    stopwatch: IStopwatch;
    handleStartStopwatch: () => void;
    handlePauseStopwatch: () => void;
    handleClearStopwatch: () => void;
}) => {
    return (
        <div className="stopwatch-card">
            <h2>{stopwatch.seconds}</h2>
            <div className="stopwatch-buttons">
                {
                    stopwatch.seconds === 0 ? (
                        <button onClick={handleStartStopwatch}>Start</button>
                    ) : (
                        <>
                            <button onClick={handlePauseStopwatch}>Pause</button>
                            <button onClick={handleClearStopwatch}>Clear</button>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Stopwatch