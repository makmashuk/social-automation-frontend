import React, { useState } from 'react';
import apiClient from '../services/api';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useRouter } from 'next/router';

const AuthContext = React.createContext({
    user: {},
    login: () => null,
    logout: () => null,
    isLoggedIn: false,
});

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {

    const [user, setUser] = useLocalStorage("user", {});
    const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
    const [token, setToken] = useLocalStorage("token", null);
    const [responseError, setResponseError] = useState();

    const router = useRouter();

    const login = (data) => {
        setResponseError(null);
        handleUser(data);
    };
    const handleUser = async (data) => {
        if (!isLoggedIn) {
            const user = await apiClient.post('/login', data);
            const token = user.data.data.token;
            setIsLoggedIn(true);
            setUser(user.data.data);
            console.log(token);
            setToken(token);
            router.push('/dashboard');
        }
        else{
            router.push('/dashboard');
        }
        
       
       

    };
    const logout = () => {

        setIsLoggedIn(false);
        setUser({});
        setToken(null);
        router.push('/');
    }


    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const sharedData = {
        user,
        login,
        logout,
        isLoggedIn,
        responseError
    };
    // console.log(sharedData);
    return (
        <AuthContext.Provider value={sharedData}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
