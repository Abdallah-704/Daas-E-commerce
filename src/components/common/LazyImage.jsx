import React, { useState, useEffect, memo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { imageSettings } from '../../config';

// A component that lazy loads images for better performance
const LazyImage = ({ src, alt, style, placeholderSrc, ...props }) => {
    const { theme } = useTheme();
    const [imageSrc, setImageSrc] = useState(placeholderSrc || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=');
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        // Create new image element
        const img = new Image();

        // Set up listeners
        img.onload = () => {
            setImageSrc(src);
            setImageLoaded(true);
        };

        img.onerror = () => {
            console.error(`Failed to load image: ${src}`);
            setIsError(true);
        };

        // Start loading the image
        img.src = src;

        // Clean up
        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [src]);

    if (isError) {
        return (
            <div style={{
                width: style?.width,
                height: style?.height,
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
            {!imageLoaded && (
                <Skeleton
                    width={style?.width}
                    height={style?.height}
                    baseColor={theme.colors.card}
                    highlightColor={theme.colors.border}
                />
            )}
            <img
                src={imageSrc}
                alt={alt}
                style={{
                    width: style?.width,
                    height: style?.height,
                    objectFit: 'cover',
                    opacity: imageLoaded ? 1 : 0.5,
                    transition: 'opacity 0.3s, filter 0.3s',
                    filter: imageLoaded ? 'none' : `blur(${imageSettings.placeholderBlur}px)`,
                }}
                loading="lazy"
                {...props}
            />
        </div>
    );
};

export default memo(LazyImage); 