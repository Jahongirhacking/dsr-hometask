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

    return (
        <div className="stopwatch-card">
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
        </div>
    )
}

export default Stopwatch