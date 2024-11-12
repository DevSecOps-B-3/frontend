import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../provider/user_context_provider';
const PublicRoute = () => {
  const { token } = useUserContext();
  if (token) {
    return <Navigate to={'/film'} />;
  }
  return <Outlet />;
};

export default PublicRoute;