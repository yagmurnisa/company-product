import { useState, createContext, ReactNode } from "react";

type ContextType = {
    token: string | null | undefined,
    setToken: React.Dispatch<React.SetStateAction<string | null | undefined>>,
}
export const UserContext = createContext<ContextType>({} as ContextType);

export const UserProvider = (props: {children: ReactNode}) => {
    const [token, setToken] = useState(localStorage.token);
    return (
        <UserContext.Provider value={{token, setToken}}>
            {props.children}
        </UserContext.Provider>
    )
}