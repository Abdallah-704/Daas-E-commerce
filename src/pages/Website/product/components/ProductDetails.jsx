import React, { useState, useCallback, memo } from 'react';
import { useTheme } from '../../../../context/ThemeContext';
import { MdStar, MdOutlineStarBorder, MdShoppingCart, MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useMediaQuery } from "@uidotdev/usehooks";

const ProductDetails = memo(({
    title,
    description,
    price,
    rating,
    stock,
    category,
    brand,
    discount = 0,
    onAddToCart
}) => {
    const { theme } = useTheme();
    const [isFavorite, setIsFavorite] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");

    const filledStars = Math.floor(rating);
    const totalStars = 5;
    const emptyStars = totalStars - filledStars;
    const discountPercentage = discount ? Math.round((discount / price) * 100) : 0;

    const handleQuantityChange = useCallback((change) => {
        setQuantity(prev => {
            const newQuantity = prev + change;
            return newQuantity >= 1 && newQuantity <= stock ? newQuantity : prev;
        });
    }, [stock]);

    const handleAddToCartClick = useCallback(() => {
        onAddToCart(quantity);
    }, [quantity, onAddToCart]);

    const handleFavoriteToggle = useCallback(() => {
        setIsFavorite(prev => !prev);
    }, []);

    return (
        <div style={{
            padding: isSmallDevice ? "15px" : "30px",
            backgroundColor: theme.colors.card,
            borderRadius: theme.borderRadius.medium,
            boxShadow: theme.shadows.medium,
        }}>
            {/* ... existing JSX ... */}
            <button
                onClick={handleAddToCartClick}
                disabled={stock === 0}
                style={{
                    backgroundColor: stock === 0 ? theme.colors.textSecondary : theme.colors.button,
                    color: theme.colors.text,
                    border: "none",
                    borderRadius: "20px",
                    padding: "10px 20px",
                    cursor: stock === 0 ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    width: "100%",
                    justifyContent: "center",
                    transition: "background-color 0.3s ease",
                }}
            >
                <MdShoppingCart size={20} />
                {stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
        </div>
    );
});

ProductDetails.displayName = 'ProductDetails';

export default ProductDetails; 