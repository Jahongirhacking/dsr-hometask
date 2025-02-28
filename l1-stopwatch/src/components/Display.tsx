import { FC } from "react";

interface IDisplayProps {
    seconds: number;
}

const Display: FC<IDisplayProps> = ({ seconds }) => {
    const getTime = () => {
        let temp = seconds;
        const arr = [];
        while (temp) {
            arr.unshift(temp % 60);
            temp = Math.floor(temp / 60);
        }
        return arr.map((el, index) => el <= 9 && index !== 0 ? `0${el}` : el).join(':');
    }

    return (
        <h2>{getTime() || 0}</h2>
    )
}

export default Display