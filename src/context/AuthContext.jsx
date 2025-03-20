import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in (e.g., check localStorage or session)
        const checkAuth = () => {
            const storedUser = localStorage.getItem('user');
            console.log("Checking auth, stored user:", storedUser);
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    console.log("User found in localStorage:", parsedUser);
                    setUser(parsedUser);
                } catch (error) {
                    console.error("Error parsing user from localStorage:", error);
                    // If there's an error parsing, clear the corrupted data
                    localStorage.removeItem('user');
                }
            } else {
                console.log("No user found in localStorage");
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = (userData) => {
        console.log("Logging in user:", userData);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/dashboard');
    };

    const logout = () => {
        console.log("Logging out user");
        setUser(null);
        localStorage.removeItem('user');
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