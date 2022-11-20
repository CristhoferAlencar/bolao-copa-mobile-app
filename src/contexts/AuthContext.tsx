import { createContext, ReactNode } from "react";

export interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextDataProps);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const signIn = async () => {
    console.log("vamos Logar!");
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user: {
          name: "Cristhofer",
          avatarUrl: "https://github.com/cristhoferalencar.png",
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
