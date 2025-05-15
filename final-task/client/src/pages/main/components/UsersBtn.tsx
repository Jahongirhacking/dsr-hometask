import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../../routes/config';
import { Role } from '../../../store/slices/type';
import { RootState } from '../../../store/store';

const UsersBtn = () => {
    const user = useSelector((store: RootState) => store.auth.user);

    if (user?.role !== Role.Admin) return null;

    return (
        <Link to={RouteNames.Users}>
            <Button type="primary" icon={<UserOutlined />}>Users</Button>
        </Link>
    )
}

export default UsersBtn