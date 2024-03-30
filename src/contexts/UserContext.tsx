import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { User } from "@/lib/types/User";

interface IUserProvider {
  children: React.ReactNode;
}

export interface IUserContext {
  user: User | null;
  token: string | null;
  isUserAuthenticated: () => boolean;
  redirectUrl: string;
  setUser: Dispatch<SetStateAction<User | null>>;
  setToken: Dispatch<SetStateAction<string | null>>;
  setRedirectUrl: Dispatch<SetStateAction<string>>;
}

const UserContext = createContext<IUserContext | null>(null);

const UserProvider = ({ children }: IUserProvider) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState("");

  const isUserAuthenticated = () => !!user;

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        isUserAuthenticated,
        redirectUrl,
        setRedirectUrl,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
