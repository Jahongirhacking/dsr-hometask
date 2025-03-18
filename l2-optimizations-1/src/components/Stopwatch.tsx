import { FC } from "react";
import { IStopwatch } from "../types";
import Controls from "./Controls";
import Display from "./Display";

export interface IStopwatchProps {
    stopwatch: IStopwatch;
    startTimer: () => void;
    pauseTimer: () => void;
    setTimer: (seconds: number) => void;
    deleteTimer: () => void;
}

const Stopwatch: FC<IStopwatchProps> = ({
    stopwatch,
    startTimer,
    pauseTimer,
    setTimer,
    deleteTimer
}) => {
    const seconds = stopwatch?.seconds;
    const isActive = stopwatch?.isActive;
    const minutes = Math.floor(seconds / 60);

    return (
        <div className={`stopwatch-card 
            ${!seconds && !isActive ? 'initial' : isActive ? 'active' : 'paused'}`
        }>
            <Display seconds={seconds} />
            <Controls
                {...{
                    seconds,
                    isActive,
                    setTimer,
                    startTimer,
                    pauseTimer,
                    deleteTimer
                }}
            />
            <div className="overlay" style={{
                height: `${((60 + (minutes % 2 ? -1 : 1) * (seconds % 60)) % 60 || (minutes % 2 ? 60 : 0)) / 60 * 100}%`
            }} />
        </div>
    )
}

export default Stopwatch