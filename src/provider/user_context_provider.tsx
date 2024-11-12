import { ReactNode, useContext, useState } from "react"
import { userContext } from "../context/user_context"
import { userType } from "../data/dto/user_context_type";
import Cookies from 'js-cookie';


const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<userType | null>(null);
  const [token, setToken] = useState(Cookies.get("ACCESS_TOKEN"));
  // const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

  const setTokenToLocal = (token: string) => {
    setToken(token);
    if (token) {
      // localStorage.setItem('ACCESS_TOKEN', token);
      Cookies.set('ACCESS_TOKEN', token);
    } else {
      // localStorage.removeItem('ACCESS_TOKEN');
      Cookies.remove('ACCESS_TOKEN');
    }
  };

  return (
    <userContext.Provider value={{
      user, setUser, token, setTokenToLocal
    }}>
      {children}
    </userContext.Provider >
  )
}
export default UserContextProvider
export const useUserContext = () => useContext(userContext) 