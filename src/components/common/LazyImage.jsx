import React, { useState, useEffect, memo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LazyImage = ({ src, alt, style, ...props }) => {
  const { theme } = useTheme();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isError, setIsError] = useState(!src);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setIsError(true);
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  if (isError) {
    return (
      <div
        style={{
          width: style?.width,
          height: style?.height,
          backgroundColor: theme.colors.card,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.colors.textSecondary,
          fontSize: '14px',
          ...style,
        }}
      >
        No image
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', ...style,display:'flex',justifyContent:"center" }}>
      {!imageLoaded && (
        <Skeleton
          width={style?.width}
          height={style?.height}
          baseColor={theme.colors.card}
          highlightColor={theme.colors.border}
        />
      )}
      <img
        src={src}
        alt={alt}
        style={{
          height: style?.height,
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.3s',
          ...style,
        }}
        loading="lazy"
        {...props}
      />
    </div>
  );
};

export default memo(LazyImage);