import React, { useState } from 'react';
import { useTheme } from '../../../../context/ThemeContext';
import { MdStar, MdOutlineStarBorder, MdShoppingCart, MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useMediaQuery } from "@uidotdev/usehooks";

const ProductDetails = ({
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

    const handleQuantityChange = (change) => {
        setQuantity(prev => {
            const newQuantity = prev + change;
            return newQuantity >= 1 && newQuantity <= stock ? newQuantity : prev;
        });
    };

    return (
        <div style={{
            padding: isSmallDevice ? "15px" : "30px",
            backgroundColor: theme.colors.card,
            borderRadius: theme.borderRadius.medium,
            boxShadow: theme.shadows.medium,
        }}>
            <div style={{ marginBottom: "20px" }}>
                <h1 style={{
                    fontSize: isSmallDevice ? "24px" : "32px",
                    color: theme.colors.text,
                    marginBottom: "10px",
                }}>
                    {title}
                </h1>

                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "15px",
                }}>
                    <div style={{ display: "flex" }}>
                        {Array.from({ length: filledStars }).map((_, index) => (
                            <MdStar key={index} color={theme.colors.warning} size={20} />
                        ))}
                        {Array.from({ length: emptyStars }).map((_, index) => (
                            <MdOutlineStarBorder key={index + filledStars} color={theme.colors.textSecondary} size={20} />
                        ))}
                    </div>
                    <span style={{ color: theme.colors.textSecondary }}>
                        ({rating} / 5)
                    </span>
                </div>

                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    marginBottom: "20px",
                }}>
                    <span style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: theme.colors.text,
                    }}>
                        ${price}
                    </span>
                    {discountPercentage > 0 && (
                        <span style={{
                            backgroundColor: theme.colors.error,
                            color: theme.colors.text,
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "14px",
                        }}>
                            {discountPercentage}% OFF
                        </span>
                    )}
                </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
                <p style={{
                    color: theme.colors.textSecondary,
                    lineHeight: "1.6",
                }}>
                    {description}
                </p>
            </div>

            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                marginBottom: "20px",
            }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                }}>
                    <span style={{ color: theme.colors.textSecondary }}>Category:</span>
                    <span style={{ color: theme.colors.text }}>{category}</span>
                </div>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                }}>
                    <span style={{ color: theme.colors.textSecondary }}>Brand:</span>
                    <span style={{ color: theme.colors.text }}>{brand}</span>
                </div>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                }}>
                    <span style={{ color: theme.colors.textSecondary }}>Stock:</span>
                    <span style={{
                        color: stock > 10 ? theme.colors.success :
                            stock > 0 ? theme.colors.warning :
                                theme.colors.error
                    }}>
                        {stock > 10 ? "In Stock" :
                            stock > 0 ? `Only ${stock} left` :
                                "Out of Stock"}
                    </span>
                </div>
            </div>

            <div style={{
                display: "flex",
                gap: "15px",
                marginBottom: "20px",
            }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: "4px",
                    padding: "5px",
                }}>
                    <button
                        onClick={() => handleQuantityChange(-1)}
                        style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: theme.colors.text,
                            cursor: "pointer",
                            padding: "5px 10px",
                        }}
                    >
                        -
                    </button>
                    <span style={{
                        color: theme.colors.text,
                        padding: "0 10px",
                    }}>
                        {quantity}
                    </span>
                    <button
                        onClick={() => handleQuantityChange(1)}
                        style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: theme.colors.text,
                            cursor: "pointer",
                            padding: "5px 10px",
                        }}
                    >
                        +
                    </button>
                </div>

                <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    style={{
                        backgroundColor: "transparent",
                        border: `1px solid ${theme.colors.border}`,
                        borderRadius: "4px",
                        color: theme.colors.text,
                        cursor: "pointer",
                        padding: "5px 15px",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                    }}
                >
                    {isFavorite ? <MdFavorite color={theme.colors.error} /> : <MdFavoriteBorder />}
                    {isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
                </button>
            </div>

            <button
                onClick={() => onAddToCart(quantity)}
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
                    "&:hover": {
                        backgroundColor: stock === 0 ? theme.colors.textSecondary : theme.colors.buttonHover,
                    }
                }}
            >
                <MdShoppingCart size={20} />
                {stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
        </div>
    );
};

export default ProductDetails; 