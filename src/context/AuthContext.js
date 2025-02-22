import { useContext, createContext } from "react";

const AuthContext = createContext();

export function AuthProvider({value, children}) {
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export function AuthValue() {
    return useContext(AuthContext); 
}