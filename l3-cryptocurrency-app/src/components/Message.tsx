import { forwardRef, useCallback, useImperativeHandle, useState } from "react";

export interface ShowMessageProps {
    message: string;
}

const Message = forwardRef((_, ref) => {
    const [message, setMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const showMessage = useCallback(({ message }: ShowMessageProps) => {
        setMessage(message);
        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 5000)
    }, []);

    useImperativeHandle(ref, () => ({
        showMessage
    }));

    if (!isVisible) return null;

    return (
        <div className="message-box">{message}</div>
    )
})

export default Message