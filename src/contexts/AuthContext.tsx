import { createContext, useContext, useState } from 'react';

interface AuthContextProps {
    user: any;
    setAuth: (authUser: any) => void;
}

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<any>(null);

    function setAuth(authUser: any) {
        setUser(authUser);
    }

    return (
        <AuthContext.Provider value={{ user, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
