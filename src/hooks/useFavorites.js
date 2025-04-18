import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { getStorageForCurrentUser, setStorageForCurrentUser } from '../utils/userStorage';

const FAVORITES_KEY = 'favorites';

const validateProduct = (product) => {
    if (!product || typeof product !== 'object') return false;

    const requiredFields = ['id', 'title', 'price'];
    for (const field of requiredFields) {
        if (!(field in product)) return false;
    }

    const price = Number(product.price);
    if (isNaN(price)) return false;

    return true;
};

export const useFavorites = () => {
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();

    useEffect(() => {
        try {
            const savedFavorites = getStorageForCurrentUser(FAVORITES_KEY, []);
            if (Array.isArray(savedFavorites)) {
                const validProducts = savedFavorites.filter(validateProduct);
                setFavoriteProducts(validProducts);
            }
        } catch (error) {
            console.error('Error loading favorites:', error);
            setFavoriteProducts([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!loading) {
            try {
                setStorageForCurrentUser(FAVORITES_KEY, favoriteProducts);
            } catch (error) {
                console.error('Error saving favorites:', error);
            }
        }
    }, [favoriteProducts, loading]);

    const addToFavoriteProducts = (product) => {
        try {
            if (!validateProduct(product)) {
                console.error('Invalid product data:', product);
                return false;
            }

            setFavoriteProducts(prev => {
                if (prev.some(item => item.id === product.id)) {
                    return prev;
                }

                const newProduct = {
                    id: product.id,
                    title: product.title,
                    price: Number(product.price),
                    image: product.image || null,
                    description: product.description || '',
                    category: product.category || 'Uncategorized'
                };

                return [...prev, newProduct];
            });
            return true;
        } catch (error) {
            console.error('Error adding product to favorites:', error);
            return false;
        }
    };

    const removeFromFavoriteProducts = (productId) => {
        try {
            setFavoriteProducts(prev => prev.filter(item => item.id !== productId));
            return true;
        } catch (error) {
            console.error('Error removing product from favorites:', error);
            return false;
        }
    };

    const isFavorite = (productId) => {
        try {
            return favoriteProducts.some(item => item.id === productId);
        } catch (error) {
            console.error('Error checking if product is favorite:', error);
            return false;
        }
    };

    const clearAllFavorites = () => {
        try {
            setFavoriteProducts([]);
            return true;
        } catch (error) {
            console.error('Error clearing favorites:', error);
            return false;
        }
    };

    return {
        favoriteProducts,
        addToFavoriteProducts,
        removeFromFavoriteProducts,
        isFavorite,
        clearAllFavorites,
        loading
    };
};