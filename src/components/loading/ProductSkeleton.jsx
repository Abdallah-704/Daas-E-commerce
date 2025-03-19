import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductSkeleton = () => {
    const { theme } = useTheme();

    return (
        <div style={{
            padding: "20px",
            backgroundColor: theme.colors.card,
            borderRadius: theme.borderRadius.medium,
            boxShadow: theme.shadows.medium,
            animation: "fadeIn 0.5s ease-in-out"
        }}>
            <div style={{ marginBottom: "20px" }}>
                <Skeleton height={40} width="80%" />
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <Skeleton circle width={20} height={20} />
                    <Skeleton width={60} />
                </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
                <Skeleton height={24} width="60%" />
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <Skeleton width={100} />
                </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
                <Skeleton count={3} height={20} />
            </div>

            <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
                <Skeleton width={100} height={40} />
            </div>

            <Skeleton height={50} />
        </div>
    );
};

export default ProductSkeleton; 