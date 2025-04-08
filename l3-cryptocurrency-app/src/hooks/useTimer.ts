import { useCallback, useEffect, useRef } from "react";

const useTimer = (callback: () => void) => {
  const timerRef = useRef<number>();

  const setTimer = useCallback(() => {
    const intervalId = setInterval(() => {
      callback();
    }, 10000);
    timerRef.current = intervalId;
  }, [callback]);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = -1;
    callback();
    setTimer();
  }, [setTimer, callback]);

  useEffect(() => {
    setTimer();

    return () => {
      clearInterval(timerRef.current);
    };
  }, [setTimer]);

  return { resetTimer };
};

export default useTimer;
