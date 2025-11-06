import { createContext, useContext, useEffect, useState } from "react";
import { useToast, Link as CLink } from "@chakra-ui/react";
import Link from "next/link";

interface AuthState {
  loggedIn: boolean;
  login: (access: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState>({
  loggedIn: false,
  login: (access: string) => void 0,
  logout: () => void 0,
});

export const AuthProvider: React.FC = ({ children }) => {
  const toast = useToast();

  const [loggedIn, setLoggedIn] = useState(
    typeof localStorage !== "undefined" && !!localStorage.getItem("access")
  );

  function login(access: string) {
    setLoggedIn(true);
    localStorage.setItem("access", access);
    toast({
      title: "You have been logged in",
      description: "You can now manage your vacuum",
      status: "success",
      isClosable: true,
    });
  }

  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem("access");
    toast({
      title: "You have been logged out",
      description: "You will need to log in again to manage your vacuum",
      status: "warning",
      isClosable: true,
    });
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};
