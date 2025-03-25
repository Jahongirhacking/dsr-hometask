import { PlusOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IStopwatch } from "../types";
import Stopwatch from "./Stopwatch";

const INTERVAL_TIME = 1000;

const StopwatchContainer = () => {
    const [stopwatches, setStopwatches] = useState<IStopwatch[]>([]);
    const intervalRefs = useRef<{ [key: string]: number | null }>({});

    const findAndUpdateStopwatch = useCallback((id: IStopwatch['id'], props: Partial<IStopwatch>, step: IStopwatch['seconds'] = 0) => {
        setStopwatches(prev => prev.map(sw => {
            if (sw.id !== id) return sw;
            const newStopwatch = {
                ...sw,
                ...props,
                ...(step != 0 ? { seconds: sw.seconds + step } : {})
            };
            return (
                JSON.stringify(sw) === JSON.stringify(newStopwatch) ? sw : newStopwatch
            )
        }));
    }, []);

    const addTimer = useCallback(() => {
        const id = uuidv4();
        setStopwatches(prev => [...prev, {
            id,
            seconds: 0,
            isActive: false
        }]);
        intervalRefs.current[id] = null;
    }, []);

    const startTimer = useCallback((id: IStopwatch['id']) => () => {
        if (intervalRefs.current[id]) return;
        // increment seconds
        const intervalId = setInterval(() => {
            findAndUpdateStopwatch(id, {}, 1);
        }, INTERVAL_TIME);
        // make active
        findAndUpdateStopwatch(id, { isActive: true });
        intervalRefs.current[id] = intervalId;
    }, [findAndUpdateStopwatch]);

    const pauseTimer = useCallback((id: IStopwatch['id']) => () => {
        if (intervalRefs.current[id]) {
            // clear interval
            clearInterval(intervalRefs.current[id]!);
            intervalRefs.current[id] = null;
            // make inactive
            findAndUpdateStopwatch(id, { isActive: false });
        }
    }, [findAndUpdateStopwatch]);

    const setTimer = useCallback((id: IStopwatch['id']) => (seconds: number) => {
        pauseTimer(id)();
        findAndUpdateStopwatch(id, { seconds });
    }, [findAndUpdateStopwatch, pauseTimer]);

    const deleteTimer = useCallback((id: IStopwatch['id']) => () => {
        pauseTimer(id);
        delete intervalRefs.current[id];
        setStopwatches(prev => prev.filter(sw => sw.id !== id));
    }, [pauseTimer])

    useEffect(() => {
        const intervals = intervalRefs.current;
        return () => {
            // cleanup
            Object.values(intervals).forEach(interval => {
                if (interval) clearInterval(interval);
            });
        };
    }, []);

    return (
        <div className="stopwatch-container">
            {!stopwatches.length && <p>You have no stopwatches. Please press the plus button to add a stopwatch!</p>}
            {stopwatches.map(stopwatch => (
                <Stopwatch
                    key={stopwatch.id}
                    stopwatch={stopwatch}
                    startTimer={startTimer(stopwatch.id)}
                    pauseTimer={pauseTimer(stopwatch.id)}
                    setTimer={setTimer(stopwatch.id)}
                    deleteTimer={deleteTimer(stopwatch.id)}
                />
            ))}
            <button className="add-btn" onClick={addTimer} title="Add stopwatch"><PlusOutlined /></button>
        </div>
    );
};

export default StopwatchContainer;
