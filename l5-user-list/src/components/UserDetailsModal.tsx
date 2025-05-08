import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { changeAddress } from "../store/slices/userSlice";

const UserDetailsModal = ({ open, onCancel }: { open: boolean, onCancel: () => void }) => {
    const ref = useRef<HTMLDivElement>(null);
    const username = new URLSearchParams(window.location.search).get('username') || '';
    const user = useSelector((store: RootState) => store.userReducer.users?.find(u => u.username === username));
    const [address, setAddress] = useState<string>('');
    const dispatch = useDispatch();

    useEffect(() => {
        setAddress(user?.address || '');
    }, [user?.address])

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onCancel();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onCancel]);

    const saveUser = () => {
        dispatch(changeAddress({ username, address }));
        onCancel();
    }

    if (!open) return null;

    return (
        createPortal(
            <div className="modal-overlay" key={username}>
                <div ref={ref} className="user-details-modal">
                    <p>Username: {username}</p>
                    <p>Name: {user?.name}</p>
                    <p>Gender: {user?.sex === "M" ? "Male" : "Female"}</p>
                    <p>Birthday: {user?.birthday}</p>
                    <p>Email: {user?.email}</p>
                    <p>Address:
                        <input value={address} onChange={(e) => setAddress(e.target.value)} />
                    </p>
                    <button onClick={saveUser}>Save</button>
                </div>
            </div>,
            document.body
        )
    );
}

export default UserDetailsModal