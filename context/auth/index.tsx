import { createContext, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const AuthContext = createContext<any>({});

export default function AuthProvider({ children }: IProps) {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
