import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import { IUser } from "../services/user/type";
import { deleteUser } from "../store/slices/userSlice";
import { useCallback, useState } from "react";
import UserDetailsModal from "./UserDetailsModal";

const UsersTable = () => {
    const users = useSelector((store: RootState) => store.userReducer.users);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();

    const handleDeleteUser = (username: IUser['username']) => {
        if (confirm(`Do you agree to delete ${username}?`)) {
            dispatch(deleteUser(username));
        }
    }

    const handleOpenUser = (username: IUser['username']) => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('username', username);
        window.history.pushState({}, "", `?${searchParams.toString()}`);
        setIsModalOpen(true);
    }

    const closeModal = useCallback(() => {
        window.history.pushState({}, "", `${window.location.pathname}`);
        setIsModalOpen(false)
    }, []);

    if (!users.length) return (
        <p>No user found! Please add user</p>
    )

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user?.username}>
                                <td>{user?.username}</td>
                                <td>{user?.address}</td>
                                <td>{user?.email}</td>
                                <td>
                                    <button className="more-btn" onClick={() => handleOpenUser(user?.username)}>More</button>
                                    <button className="delete-btn" onClick={() => handleDeleteUser(user?.username)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <UserDetailsModal open={isModalOpen} onCancel={closeModal} />
        </>
    )
}

export default UsersTable