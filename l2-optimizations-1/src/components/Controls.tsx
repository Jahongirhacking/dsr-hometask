import { CaretRightOutlined, DeleteOutlined, PauseOutlined, ReloadOutlined } from "@ant-design/icons";
import React, { FC } from "react";
import { IStopwatch } from "../types";
import { IStopwatchProps } from "./Stopwatch";

interface IControlsProps extends Omit<IStopwatchProps, 'stopwatch'> {
    seconds: IStopwatch['seconds'];
    isActive: IStopwatch['isActive'];
}

const Controls: FC<IControlsProps> = React.memo(({ seconds, isActive, startTimer, setTimer, pauseTimer, deleteTimer }) => {
    return (
        <div className="stopwatch-buttons">
            <div>
                {
                    seconds === 0 && !isActive ? (
                        <button onClick={startTimer} title="Start"><CaretRightOutlined /></button>
                    ) : (
                        <>
                            {
                                isActive ? (
                                    <button onClick={pauseTimer} title="Pause"><PauseOutlined /></button>
                                ) : (
                                    <button onClick={startTimer} title="Resume"><CaretRightOutlined /></button>
                                )
                            }

                            <button onClick={() => setTimer(0)} title="Clear"><ReloadOutlined /></button>
                        </>
                    )
                }
            </div>
            <button onClick={deleteTimer} title="Delete" className="delete-btn"><DeleteOutlined /></button>
        </div >
    )
},
    (prev, next) => {
        return prev.isActive === next.isActive && !(next.seconds === 0 && !(prev.isActive || next.isActive))
    }
)

export default Controls