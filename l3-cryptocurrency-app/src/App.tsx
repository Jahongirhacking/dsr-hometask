import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { CoinsContext } from "./CoinsContext";
import Controls from "./components/Controls";
import CryptoCard from "./components/CryptoCard";
import Message, { ShowMessageProps } from "./components/Message";
import useTimer from "./hooks/useTimer";
import { getLocalStorage, localStorageNames, setLocalStorage } from "./utils/storageUtils";

interface IChildProps {
  [key: string]: { getPrice: () => void }
}

const INITIAL_COINS = ['doge'];

function App() {
  const firstVisit = useRef(getLocalStorage(localStorageNames.firstVisit));
  const [coins, setCoins] = useState<string[]>(firstVisit.current === null ? INITIAL_COINS : getLocalStorage(localStorageNames.coins));
  const [, startTransition] = useTransition();
  const messageRef = useRef<{ showMessage: ({ message }: ShowMessageProps) => void }>();
  const childRefs = useRef<IChildProps>({});

  const handleUpdateCoin = useCallback((coin: string) => {
    if (childRefs.current[coin]) {
      childRefs.current[coin].getPrice();
    }
  }, []);

  const handleUpdateAllCoins = useCallback(() => {
    coins.forEach(coin => handleUpdateCoin(coin));
  }, [handleUpdateCoin, coins]);

  const handleDeleteCoin = useCallback((coin: string) => {
    startTransition(() => {
      setCoins(prev => {
        const newCoins = prev.filter(el => el !== coin);
        setLocalStorage(localStorageNames.coins, newCoins);
        return newCoins;
      });
    });
  }, []);

  const handleAddCoin = useCallback((coin: string) => {
    setCoins(prev => {
      const newCoins = [...prev, coin];
      setLocalStorage(localStorageNames.coins, newCoins);
      return newCoins;
    })
  }, [])

  const { resetTimer } = useTimer(handleUpdateAllCoins);

  useEffect(() => {
    if (getLocalStorage(localStorageNames.firstVisit) === null) {
      setLocalStorage(localStorageNames.coins, INITIAL_COINS);
    }
    setLocalStorage(localStorageNames.firstVisit, false);
  }, []);

  return (
    <CoinsContext.Provider
      value={{ coins, handleDeleteCoin, handleUpdateCoin }}
    >
      <Message ref={messageRef} />
      <div className="app-container">
        <Controls
          resetTimer={resetTimer}
          handleAddCoin={handleAddCoin}
        />
        <div className="crypto-cards">
          {
            coins.length
              ? coins.map(coin => (
                <CryptoCard
                  key={coin}
                  coin={coin}
                  showMessage={messageRef.current?.showMessage}
                  ref={(el) => el && (childRefs.current[coin] = (el as { getPrice: () => void }))}
                />
              ))
              : <h2>No coins found :(</h2>
          }
        </div>
      </div>
    </CoinsContext.Provider>
  );
}

export default App;
