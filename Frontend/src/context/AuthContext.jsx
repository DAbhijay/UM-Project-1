import React, { createContext, useState, useEffect } from 'react';
import { authApi } from '../api/authApi';

export const AuthContext =  createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    const body = await authApi.getProfile();
                    setUser(body.data?.user ?? null);
                } catch (error) {
                    console.error('Failed to load data: ',error);
                    logout();
                }
            }
            setLoading(false);
        };
        loadUser();
    }, [token]);

    const login = async(credentials) => {
        const response = await authApi.login(credentials);
        const { user, token } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        setToken(token);
        setUser(user);

        return response;
    };

    const register = async(userData) => {
        const response = await authApi.register(userData);
        const { user, token } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        setToken(token);
        setUser(user);

        return response;
    };

    const logout = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        loading,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isCustomer: user?.role === 'customer',
        isProvider: user?.role === 'provider',
    };

    return (
        <AuthContext.Provider value={value}>
            {children}  
        </AuthContext.Provider>
    )
}