export interface CustomJwtPayload {
  user_id: string;
  role: string;
  exp: string;
  iat: string;
}
export interface userType extends CustomJwtPayload {
  name: string;
}

export interface UserContextValue {
  user: userType | null;
  token: string | undefined;
  setUser: (user: userType | null) => void;
  setTokenToLocal: (token: string) => void;
}
