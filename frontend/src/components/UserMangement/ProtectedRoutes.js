import withAuth from './WithAuth';
import AdminDashboard from '../../pages/Admin';
import UserDashboard from '../../pages/User';

const ProtectedAdminDashboard = withAuth(AdminDashboard);
const ProtectedUserDashboard = withAuth(UserDashboard);

export { ProtectedAdminDashboard, ProtectedUserDashboard };
