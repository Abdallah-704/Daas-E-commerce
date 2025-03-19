import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LazyImage = ({ src, alt, width, height, style }) => {
    const { theme } = useTheme();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => setIsLoaded(true);
        img.onerror = () => setIsError(true);
    }, [src]);

    if (isError) {
        return (
            <div style={{
                width,
                height,
                backgroundColor: theme.colors.error,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.colors.text,
                ...style
            }}>
                Failed to load image
            </div>
        );
    }

    return (
        <div style={{ position: 'relative', ...style }}>
            {!isLoaded && (
                <Skeleton
                    width={width}
                    height={height}
                    baseColor={theme.colors.card}
                    highlightColor={theme.colors.border}
                />
            )}
            <img
                src={src}
                alt={alt}
                style={{
                    width,
                    height,
                    objectFit: 'cover',
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out',
                    filter: isLoaded ? 'none' : 'blur(10px)',
                }}
            />
        </div>
    );
};

export default LazyImage; 