import { createContext } from "react";

export interface ICoinsContext {
    coins: string[];
    handleDeleteCoin: (coin: string) => void;
    handleUpdateCoin: (coin: string) => void;
}

export const CoinsContext = createContext<ICoinsContext | null>(null);