import { ArrowDownOutlined, ArrowUpOutlined, DeleteFilled, MinusOutlined, ReloadOutlined } from "@ant-design/icons";
import axios from "axios";
import { forwardRef, memo, useCallback, useContext, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import { CoinsContext } from "../CoinsContext";
import { getBaseUrl } from "../utils/config";
import { ShowMessageProps } from "./Message";
import { IPrice, PriceStatus } from "./types";

const CryptoCard = memo(forwardRef(({ coin, showMessage }: { coin: string, showMessage?: ({ message }: ShowMessageProps) => void }, ref) => {
    const [price, setPrice] = useState<IPrice>({});
    const oldPrice = useRef<number>();
    const [error, setError] = useState<string | null>(null);
    const context = useContext(CoinsContext);

    useImperativeHandle(ref, () => ({
        getPrice,
    }))

    const getPrice = useCallback(async () => {
        setError(null);
        try {
            const { data } = await axios.get(getBaseUrl(coin));
            if (data?.Response === "Error") {
                context!.handleDeleteCoin(coin);
                if (showMessage) {
                    showMessage({ message: `Couldn't find any coin with a name ${coin.toUpperCase()} in the list` });
                }
            }
            let status = PriceStatus.Neutral;
            if (oldPrice.current) {
                if (oldPrice.current < data?.USD) status = PriceStatus.Bullish;
                else if (oldPrice.current > data?.USD) status = PriceStatus.Bearish;
            }
            oldPrice.current = data?.USD;
            setPrice({ ...data, status });
        } catch (err) {
            setError('Failed to fetch price');
            console.error('API Error:', err);
        }
    }, [coin, context, showMessage]);

    useLayoutEffect(() => {
        getPrice();
    }, [getPrice]);

    if (!price?.USD) return null;

    return (
        <div className="crypto-card">
            <div className="card-display">
                <h3>{coin}</h3>
                <div className="card-price">
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {!error && price?.USD && <p>${price.USD}</p>}
                    <span className="indicator">
                        {
                            price.status === PriceStatus.Bullish
                                ? <ArrowUpOutlined style={{ color: 'green' }} />
                                : price.status === PriceStatus.Bearish
                                    ? <ArrowDownOutlined style={{ color: 'red' }} />
                                    : <MinusOutlined style={{ color: 'blue' }} />
                        }
                    </span>
                </div>
            </div>
            <div className="card-controls">
                <button className="delete-btn" onClick={() => context && context.handleDeleteCoin(coin)}>
                    <DeleteFilled />
                </button>
                <button className="update-btn" onClick={() => context && context.handleUpdateCoin(coin)}>
                    <ReloadOutlined />
                </button>
            </div>
        </div>
    );
}));

export default CryptoCard