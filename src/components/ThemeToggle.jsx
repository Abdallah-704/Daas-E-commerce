import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: isDark ? '#ffffff' : '#333333',
                color: isDark ? '#333333' : '#ffffff',
                cursor: 'pointer',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
                zIndex: 1000,

            }}
        >
            {isDark ? <FaSun size={24} /> : <FaMoon size={24} />}
        </button>
    );
};

export default ThemeToggle; 