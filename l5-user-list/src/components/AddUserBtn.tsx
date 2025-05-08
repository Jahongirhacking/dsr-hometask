import { useLazyGetUserQuery } from "../services/user"

const AddUserBtn = () => {
    const [getUserTrigger, { isFetching }] = useLazyGetUserQuery();

    const handleAddUser = () => {
        getUserTrigger();
    }

    return (
        <button onClick={handleAddUser} disabled={isFetching} className="add-user-btn">
            {isFetching ? "User is being added..." : "Add user"}
        </button>
    )
}

export default AddUserBtn