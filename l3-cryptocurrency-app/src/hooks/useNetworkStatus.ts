import { useEffect, useState } from "react";

const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [backToOnline, setBackToOnline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline((prev) => {
        if (!prev) setBackToOnline(true);
        return true;
      });
    };
    const handleOffline = () => {
      setIsOnline(false);
      setBackToOnline(false);
    };
    window.addEventListener("online", () => handleOnline);
    window.addEventListener("offline", () => handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return { isOnline, backToOnline };
};

export default useNetworkStatus;
