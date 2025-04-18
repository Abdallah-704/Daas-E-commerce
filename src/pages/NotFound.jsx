import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FiAlertCircle, FiHome, FiUsers, FiGrid } from 'react-icons/fi';

const NotFound = () => {
    const { theme } = useTheme();

    return (
        <div style={{
            padding: '50px 20px',
            minHeight: 'calc(100vh - 200px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.background,
            textAlign: 'center'
        }}>
            <FiAlertCircle size={80} color={theme.colors.error} style={{ marginBottom: '20px' }} />

            <h1 style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: theme.colors.text,
                marginBottom: '10px'
            }}>
                404 - Page Not Found
            </h1>

            <p style={{
                fontSize: '18px',
                color: theme.colors.textSecondary,
                maxWidth: '600px',
                marginBottom: '30px'
            }}>
                The page you're looking for doesn't exist or has been moved.
            </p>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '15px',
                justifyContent: 'center'
            }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 20px',
                        backgroundColor: theme.colors.primary,
                        color: 'white',
                        border: 'none',
                        borderRadius: theme.borderRadius.small,
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>
                        <FiHome size={18} />
                        Go Home
                    </button>
                </Link>

                <Link to="/categories" style={{ textDecoration: 'none' }}>
                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 20px',
                        backgroundColor: theme.colors.card,
                        color: theme.colors.text,
                        border: `1px solid ${theme.colors.border}`,
                        borderRadius: theme.borderRadius.small,
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>
                        <FiGrid size={18} />
                        Browse Categories
                    </button>
                </Link>

                <Link to="/customers" style={{ textDecoration: 'none' }}>
                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 20px',
                        backgroundColor: theme.colors.card,
                        color: theme.colors.text,
                        border: `1px solid ${theme.colors.border}`,
                        borderRadius: theme.borderRadius.small,
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>
                        <FiUsers size={18} />
                        View Customers
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound; 