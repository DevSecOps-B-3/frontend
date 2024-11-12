import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../provider/user_context_provider';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { CustomJwtPayload } from '../data/dto/user_context_type';
import { getProfile } from '../api/profile/profile';

const PrivateRoute = () => {
  const { token, setUser } = useUserContext()
  const profile = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  })

  useEffect(() => {
    if (token && profile.data) {
      const userData = jwtDecode<CustomJwtPayload>(token)
      setUser({
        user_id: userData!.user_id,
        name: profile.data?.data.name,
        role: userData?.role,
        exp: userData.exp,
        iat: userData.iat,
      })
    }
  }, [token, profile.data, setUser])

  if (!token) {
    return <Navigate to={'/'} />;
  }
  return <Outlet />
};

export default PrivateRoute;