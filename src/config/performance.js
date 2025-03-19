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