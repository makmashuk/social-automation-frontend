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

    const router = useRouter();

    const login = (data) => {
        // console.log(data);
        apiClient.get('/sanctum/csrf-cookie')
            .then(response => {
                if (response.status === 204) {
                    handleUser(data);
                }
            })
            .catch(e => {
                console.log(e);
            })
    };
    const handleUser = async (data) => {
        if (!isLoggedIn) {
            let res = await apiClient.post('/login', data);
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', true);
            apiClient.get('/api/user', data).then(response => {
                setUser(response.data);
            });
            router.push('/dashboard');
        }
        
       
       

    };
    const logout = () => {
        apiClient.post('/logout')
            .then(response => {
                setIsLoggedIn(false);
                setUser({});
                localStorage.setItem('isLoggedIn', false);
                localStorage.setItem('user', JSON.stringify({}));
                router.push('/login');
            })
            .catch(e => {
                console.log(e);
            })
    }


    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const sharedData = {
        user,
        login,
        logout,
        isLoggedIn
    };
    // console.log(sharedData);
    return (
        <AuthContext.Provider value={sharedData}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
