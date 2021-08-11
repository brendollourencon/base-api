import {createContext, useContext, useEffect, useState} from "react";
import {userLogin} from "./services/UserService";

export const AuthContext = createContext({});

export function AuthProvider(props) {
    const [user, setUser] = useState(null);

    useEffect( () => {
        const storageUser = sessionStorage.getItem('user');
        const storageToken = sessionStorage.getItem('token');

        if(storageUser && storageToken){
            setUser(JSON.parse(storageUser));
        }
    }, []);

    async function login(userData) {
        const result = await userLogin(userData);

        if(result){
            setUser({name: result.name, email: result.email});
            sessionStorage.setItem('user', JSON.stringify({name: result.name, email: result.email}));
            sessionStorage.setItem('token', result.token);
        }
    }

    function logout() {
        setUser(null);
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={{isLogged: Boolean(user), user, setUser, login, logout}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}