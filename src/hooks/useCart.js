import { useState, useEffect } from 'react';
import { getStorageForCurrentUser, setStorageForCurrentUser } from '../utils/userStorage';

const CART_KEY = 'cart';

const validateCartItem = (item) => {
  if (!item || typeof item !== 'object') return false;
  return ['id', 'title', 'price', 'quantity'].every(field => field in item) &&
         !isNaN(item.price) && !isNaN(item.quantity) && item.quantity >= 1;
};

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart from storage on mount
  useEffect(() => {
    const savedCart = getStorageForCurrentUser(CART_KEY, []);
    setCartItems(Array.isArray(savedCart) ? savedCart.filter(validateCartItem) : []);
    setLoading(false);
  }, []);

  // Save cart to storage when it changes
  useEffect(() => {
    if (!loading) setStorageForCurrentUser(CART_KEY, cartItems);
  }, [cartItems, loading]);

  const addToCart = (product, quantity = 1) => {
    if (!product) return false;
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, {
        id: product.id,
        title: product.title,
        price: Number(product.price),
        image: product.image || null,
        quantity,
        category: product.category || 'Uncategorized'
      }];
    });
    return true;
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    return true;
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId);
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
    return true;
  };

  const clearCart = () => {
    setCartItems([]);
    return true;
  };

  const getCartTotal = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const getItemCount = () => cartItems.reduce((count, item) => count + item.quantity, 0);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getItemCount,
    loading
  };
};