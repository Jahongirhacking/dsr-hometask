import { CaretRightOutlined, DeleteOutlined, PauseOutlined, ReloadOutlined } from "@ant-design/icons";
import { FC } from "react";
import { IStopwatch } from "../types";
import { IStopwatchProps } from "./Stopwatch";

interface IControlsProps extends Omit<IStopwatchProps, 'stopwatch'> {
    seconds: IStopwatch['seconds'];
    isActive: IStopwatch['isActive'];
}

const Controls: FC<IControlsProps> = ({ seconds, isActive, startTimer, setTimer, pauseTimer, deleteTimer }) => {
    return (
        <div className="stopwatch-buttons">
            <div>
                {
                    seconds === 0 && !isActive ? (
                        <button onClick={startTimer}><CaretRightOutlined /></button>
                    ) : (
                        <>
                            {
                                isActive ? (
                                    <button onClick={pauseTimer}><PauseOutlined /></button>
                                ) : (
                                    <button onClick={startTimer}><CaretRightOutlined /></button>
                                )
                            }

                            <button onClick={() => setTimer(0)}><ReloadOutlined /></button>
                        </>
                    )
                }
            </div>
            <button onClick={deleteTimer}><DeleteOutlined /></button>
        </div >
    )
}

export default Controls