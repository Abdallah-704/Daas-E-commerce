/**
 * Performance Configuration
 * 
 * This file contains settings and utilities for optimizing the application's performance.
 */

// Image optimization settings
export const imageSettings = {
    // Default quality for JPEG images (0-100)
    jpegQuality: 80,

    // Default quality for WebP images (0-100)
    webpQuality: 75,

    // Lazy loading threshold (in pixels) - how close to viewport to start loading
    lazyLoadThreshold: 200,

    // Use WebP format when browser supports it
    useWebPWhenSupported: true,

    // Placeholder blur amount (in pixels)
    placeholderBlur: 10,

    // Placeholder size (tiny preview image as percentage of original)
    placeholderSize: 5,
};

// API caching settings
export const apiCacheSettings = {
    // Default cache time for API responses (in milliseconds)
    defaultCacheTime: 5 * 60 * 1000, // 5 minutes

    // Maximum cache entries to store
    maxCacheEntries: 100,

    // Enable cache invalidation on user actions
    invalidateOnUserAction: true,

    // Endpoints that should never be cached
    noCacheEndpoints: [
        '/api/auth/login',
        '/api/auth/logout',
        '/api/cart/add',
        '/api/cart/remove',
        '/api/checkout',
    ],

    // Endpoints with custom cache times
    customCacheTimes: {
        '/api/products': 15 * 60 * 1000, // 15 minutes
        '/api/categories': 30 * 60 * 1000, // 30 minutes
    },
};

// Component optimization settings
export const componentSettings = {
    // Default list virtualization threshold
    defaultVirtualizationThreshold: 50,

    // Use React.memo for all components exported from a central location
    useMemoForComponents: true,

    // Use React.lazy for routes
    useLazyRoutes: true,

    // Default threshold for throttling frequent updates (in milliseconds)
    throttleThreshold: 100,

    // Default threshold for debouncing user input (in milliseconds)
    debounceThreshold: 300,

    // Prioritize visible components' rendering
    prioritizeVisibleContent: true,
};

// Bundle optimization settings
export const bundleSettings = {
    // Split chunks by route
    splitChunksByRoute: true,

    // Prefetch important routes
    prefetchRoutes: [
        '/',
        '/products',
        '/categories',
    ],

    // Preload critical assets
    preloadCriticalAssets: true,

    // Inline critical CSS
    inlineCriticalCSS: true,
};

// Memoization helper for expensive computations
export const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);

        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};

// Throttle function to limit execution frequency
export const throttle = (fn, delay = componentSettings.throttleThreshold) => {
    let lastCall = 0;
    return (...args) => {
        const now = new Date().getTime();
        if (now - lastCall < delay) return;

        lastCall = now;
        return fn(...args);
    };
};

// Debounce function for inputs
export const debounce = (fn, delay = componentSettings.debounceThreshold) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
};

export const PERFORMANCE_CONFIG = {
    // Image optimization
    imageOptimization: {
        quality: 80,
        maxWidth: 1200,
        lazyLoad: true,
        placeholder: true,
        blurEffect: true,
        webpSupport: true
    },

    // API caching
    apiCaching: {
        enabled: true,
        duration: 5 * 60 * 1000, // 5 minutes
        maxSize: 50, // MB
        staleWhileRevalidate: true
    },

    // Component optimization
    componentOptimization: {
        memoThreshold: 1000, // Number of renders before memoization
        lazyLoadThreshold: 100, // KB size threshold for lazy loading
        skeletonLoading: true,
        transitionEffects: true
    },

    // Route optimization
    routeOptimization: {
        prefetchThreshold: 1000, // ms before prefetching
        prefetchDistance: 2, // Number of links to prefetch
        smoothScroll: true
    },

    // Animation settings
    animations: {
        enabled: true,
        duration: 300, // ms
        easing: 'easeInOut',
        pageTransition: true,
        componentTransition: true
    },

    // Loading states
    loadingStates: {
        skeleton: true,
        spinner: true,
        progressBar: true,
        fadeIn: true
    }
}; 