import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'cookie-universal';

const AuthContext = createContext(null);
const cookie = Cookie();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const token = cookie.get('user');

            if (token) {
                setUser(token);
            } else {
                console.log("No token found in cookies");
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = (userData) => {
        setUser(userData);
        // Store user data in cookies with appropriate options
        cookie.set('user', userData, {
            path: '/', // Make it accessible on all paths
            maxAge: 7 * 24 * 60 * 60, // 7 days
            secure: true, // Only send over HTTPS
            sameSite: 'strict' // Protect against CSRF
        });
        navigate('/dashboard');
    };

    const logout = () => {
        console.log("Logging out user");
        setUser(null);
        // Remove user token cookie
        cookie.remove('user', { path: '/' });
        navigate('/login');
    };

    const value = {
        user,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};