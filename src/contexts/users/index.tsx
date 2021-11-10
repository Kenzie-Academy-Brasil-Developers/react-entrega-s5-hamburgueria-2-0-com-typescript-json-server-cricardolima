import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useState, ReactNode } from "react";
import { History } from "history";
import api from "../../services/api";

interface AuthProps {
  children: ReactNode;
}

interface UserLoginData {
  email: string;
  password: string;
}

interface UserSignInData {
  name: string;
  password: string;
  email: string;
}

interface AuthProviderData {
  token: string;
  userId: string;
  login: (data: UserLoginData, history: History) => void;
  signIn: (data: UserSignInData, history: History) => void;
  logout: (history: History) => void;
}

export const AuthContext = createContext<AuthProviderData>(
  {} as AuthProviderData
);

export const AuthProvider = ({ children }: AuthProps) => {
  const toast = useToast();

  const [token, setToken] = useState<string>(
    () => localStorage.getItem("@KenzieBurguer:token") || ""
  );

  const [userId, setUserId] = useState<string>(
    () => localStorage.getItem("@KenzieBurguer:userId") || ""
  );

  const login = (data: UserLoginData, history: History) => {
    api
      .post("login", data)
      .then((resp) => {
        localStorage.setItem("@KenzieBurguer:token", resp.data.accessToken);
        setToken(resp.data.acessToken);
        localStorage.setItem("@KenzieBurguer:userId", resp.data.user.id);
        setUserId(resp.data.user.id);
        history.push("/dashboard");
      })
      .then(() =>
        toast({
          position: "top",
          title: "Bem-Vindo!",
          description: "Conta logada com sucesso!",
          status: "success",
          duration: 5000,
          isClosable: true,
        })
      )
      .catch((e) => console.log(e));
  };

  const signIn = (data: UserSignInData, history: History) => {
    api
      .post("register", data)
      .then((resp) => {
        history.push("/");
      })
      .then(() =>
        toast({
          position: "top",
          title: "Bem-Vindo!",
          description: "Conta criada com sucesso!",
          status: "info",
          duration: 5000,
          isClosable: true,
        })
      )
      .catch((e) => console.log(e));
  };

  const logout = (history: History) => {
    localStorage.clear();
    setToken("");
    toast({
      position: "top",
      title: "Muito obrigado!",
      description: "Conta deslogada com sucesso. Volte sempre!",
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
    history.push("/");
  };

  return (
    <AuthContext.Provider value={{ token, userId, signIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
