import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

const Controls = ({ resetTimer, handleAddCoin }: {
    resetTimer: () => void,
    handleAddCoin: (coin: string) => void
}) => {
    const [inputValue, setInputValue] = useState('');

    const handleSearch = (e: React.MouseEvent) => {
        e.preventDefault();
        handleAddCoin(inputValue);
        setInputValue('');
    }

    return (
        <div className="app-controls">
            <form>
                <div className="input-search">
                    <input
                        value={inputValue}
                        onChange={({ target: { value } }) => setInputValue(value)}
                    />
                    <button
                        className="search-btn"
                        onClick={handleSearch}
                        type="submit"
                    >
                        <SearchOutlined />
                    </button>
                </div>
            </form>
            <button onClick={resetTimer} className="update-all-btn"><ReloadOutlined /></button>
        </div>
    )
}

export default Controls