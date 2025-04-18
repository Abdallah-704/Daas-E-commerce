import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FiUsers, FiShoppingBag, FiDollarSign, FiTrendingUp } from 'react-icons/fi';

const DashboardHome = () => {
    const { theme } = useTheme();


    return (
        <div style={{
            padding: '30px',
            flex: 1,
            backgroundColor: theme.colors.background,
            minHeight: '100%'
        }}>
            <h1 style={{
                color: theme.colors.text,
                marginBottom: '30px',
                fontSize: '2.5rem',
                fontWeight: '600'
            }}>
                Dashboard Overview
            </h1>

            <div style={{
                backgroundColor: theme.colors.card,
                borderRadius: theme.borderRadius.medium,
                padding: '30px',
                marginBottom: '30px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: `1px solid ${theme.colors.border || 'rgba(0, 0, 0, 0.1)'}`
            }}>
                <h2 style={{ 
                    color: theme.colors.text, 
                    marginBottom: '20px',
                    fontSize: '1.8rem',
                    fontWeight: '500'
                }}>Welcome to Your Dashboard</h2>
                <p style={{ 
                    color: theme.colors.textSecondary,
                    fontSize: '1.1rem',
                    lineHeight: '1.6'
                }}>
                    This is your admin dashboard where you can manage your e-commerce platform.
                    Use the sidebar navigation to access different sections of your admin panel.
                </p>
            </div>
        </div>
    );
};

export default DashboardHome; 