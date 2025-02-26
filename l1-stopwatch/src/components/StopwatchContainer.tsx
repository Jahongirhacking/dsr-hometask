import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Stopwatch from "./Stopwatch";
import { IStopwatch } from "../types";

const INTERVAL_TIME = 1000;

const StopwatchContainer = () => {
    const [stopwatches, setStopwatches] = useState<IStopwatch[]>([]);
    const intervalRefs = useRef<{ [key: string]: number | null }>({});

    const handleAddStopwatch = () => {
        const id = uuidv4();
        setStopwatches(prev => [...prev, { id, intervalId: null, seconds: 0 }]);
        intervalRefs.current[id] = null;
    };

    const handleStartStopwatch = (id: IStopwatch['id']) => {
        if (intervalRefs.current[id]) return; // Prevent multiple intervals

        const intervalId = setInterval(() => {
            setStopwatches(prev =>
                prev.map(sw =>
                    sw.id === id ? { ...sw, seconds: sw.seconds + 1 } : sw
                )
            );
        }, INTERVAL_TIME);

        intervalRefs.current[id] = intervalId;
    };

    const handlePauseStopwatch = (id: IStopwatch['id']) => {
        if (intervalRefs.current[id]) {
            clearInterval(intervalRefs.current[id]!);
            intervalRefs.current[id] = null;
        }
    };

    const handleClearStopwatch = (id: IStopwatch['id']) => {
        handlePauseStopwatch(id);
        setStopwatches(prev =>
            prev.map(sw =>
                sw.id === id ? { ...sw, seconds: 0 } : sw
            )
        );
    };

    useEffect(() => {
        return () => {
            Object.values(intervalRefs.current).forEach(interval => {
                if (interval) clearInterval(interval);
            });
        };
    }, []);

    return (
        <div>
            {stopwatches.map(stopwatch => (
                <Stopwatch
                    key={stopwatch.id}
                    stopwatch={stopwatch}
                    handleStartStopwatch={() => handleStartStopwatch(stopwatch.id)}
                    handlePauseStopwatch={() => handlePauseStopwatch(stopwatch.id)}
                    handleClearStopwatch={() => handleClearStopwatch(stopwatch.id)}
                />
            ))}
            <button onClick={handleAddStopwatch}>Add Stopwatch</button>
        </div>
    );
};

export default StopwatchContainer;
