import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";

export interface ShowMessageProps {
    message: string;
    status: "success" | "error"
}

const Message = forwardRef((_, ref) => {
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<ShowMessageProps['status']>('error');
    const [isVisible, setIsVisible] = useState(false);

    const showMessage = useCallback(({ message, status }: ShowMessageProps) => {
        setMessage(message);
        setStatus(status);
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
        <div className="message-box">{status === 'success' ? <CheckCircleFilled style={{ color: 'green' }} /> : <CloseCircleFilled style={{ color: 'red' }} />} {message}</div>
    )
})

export default Message