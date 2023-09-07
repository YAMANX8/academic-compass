import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [isAuth, setIsAuth] = useState(false);

    return (
        <AuthContext.Provider value={{ auth, setAuth, isAuth, setIsAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;