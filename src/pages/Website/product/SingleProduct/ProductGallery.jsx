import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useTheme } from '../../../../context/ThemeContext';
import { useMediaQuery } from "@uidotdev/usehooks";
import { LazyImage } from '../../../../components/common';



const ProductGallery = React.memo(({ image, title = 'Product' }) => {
    const { theme } = useTheme();
    const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");
    const [isZoomed, setIsZoomed] = useState(false);
    const [clickPosition, setClickPosition] = useState({ x: 50, y: 50 });
    const containerRef = useRef(null);
    const zoomScale = 2;

    // Memoize handlers
    const handleImageClick = useCallback((e) => {
        if (!containerRef.current) return;

        if (!isZoomed) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            setClickPosition({ x, y });
            setIsZoomed(true);
        } else {
            setIsZoomed(false);
        }
    }, [isZoomed]);

    // Memoize styles
    const containerStyle = useMemo(() => ({
        width: "100%",
        height: isSmallDevice ? "300px" : "400px",
        backgroundColor: theme.isDark ? "#252525" : "white",
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: `1px solid ${theme.colors.border}`,
        boxShadow: theme.colors.shadow,
        padding: "10px",
        position: "relative",
        cursor: isZoomed ? "zoom-out" : "zoom-in",
        transition: "all 0.3s ease"
    }), [isSmallDevice, theme.colors.border, theme.colors.shadow, theme.isDark, isZoomed]);

    const imageStyle = useMemo(() => {
        if (isZoomed) {
            return {
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "8px",
                transition: "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                transform: `scale(${zoomScale})`,
                transformOrigin: `${clickPosition.x}% ${clickPosition.y}%`,
                cursor: "zoom-out"
            };
        } else {
            return {
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "8px",
                transition: "transform 0.3s ease-out",
                transform: "scale(1)",
                cursor: "zoom-in"
            };
        }
    }, [isZoomed, clickPosition.x, clickPosition.y, zoomScale]);

    const zoomIndicatorStyle = useMemo(() => ({
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        color: "white",
        padding: "8px 16px",
        borderRadius: "20px",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        opacity: isZoomed ? 0 : 1,
        transition: "opacity 0.3s ease",
        pointerEvents: "none"
    }), [isZoomed]);

    const renderMagnifyIcon = () => (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    );

    return (
        <div
            className="product-gallery"
            style={containerStyle}
            onClick={handleImageClick}
            ref={containerRef}
        >
            <LazyImage
                src={image}
                alt={title}
                style={imageStyle}
            />
            {!isZoomed && (
                <div style={zoomIndicatorStyle}>
                    {renderMagnifyIcon()} Click to zoom
                </div>
            )}
        </div>
    );
});

ProductGallery.displayName = 'ProductGallery';

export default ProductGallery;
