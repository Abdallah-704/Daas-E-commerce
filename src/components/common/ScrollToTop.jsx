import React, { useState, useEffect, memo } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { theme } = useTheme();

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top scroll position to 0
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    style={{
                        position: 'fixed',
                        bottom: '30px',
                        right: '30px',
                        zIndex: 1000,
                        backgroundColor: theme.colors.primary || '#2196F3',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        boxShadow: `0 4px 10px ${theme.colors.shadow || 'rgba(0,0,0,0.2)'}`,
                        transition: 'all 0.3s ease',
                        opacity: 0.8,
                        '&:hover': {
                            opacity: 1,
                            transform: 'translateY(-5px)',
                            backgroundColor: theme.colors.primaryDark || '#1976D2',
                        },
                        '&:focus': {
                            outline: 'none',
                        }
                    }}
                    aria-label="Scroll to top"
                >
                    <FaArrowUp size={20} />
                </button>
            )}
        </>
    );
};

export default memo(ScrollToTop); 