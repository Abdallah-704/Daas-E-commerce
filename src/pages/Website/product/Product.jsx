import React, { useMemo } from 'react';
import { useMediaQuery } from '@uidotdev/usehooks';
import { MdOutlineStarBorder, MdStar } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';

import { useCart } from '../../../hooks/useCart';
import logo from '../../../assets/daas-logo.svg'; // Adjust path to your logo

const Product = React.memo(({ id, image, title, price, description, rating, discount = 0, latestsale = false, category, stock, latest }) => {
    const { addToCart } = useCart();
    const isSmallDevice = useMediaQuery('only screen and (max-width: 768px)');
    const { theme } = useTheme();
    const colors = {
        cardBackground: '#ffffff',
        text: '#333333',
        textSecondary: '#666666',
        border: '#e0e0e0',
        error: '#ff6b6b',
        primary: '#007bff',
        ...(theme.colors || {}),
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            id,
            image: image || logo,
            title,
            price,
            quantity: 1,
            category: category || 'Uncategorized',
            stock: stock || 10
        });
    };


    // Memoize price calculations
    const priceCalculations = useMemo(() => {
        const numericPrice = Number(price) || 0;
        return {
            discountedPrice: discount > 0 ? numericPrice * (1 - discount / 100) : numericPrice,
            discountPercentage: discount > 0 ? Math.round(discount) : 0,
        };
    }, [price, discount]);

    const { discountedPrice } = priceCalculations;

    return (
        <Link
            to={`/product/${id}`}
            style={{
                padding: '0 0 10px 10px',
                borderRadius: '12px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                backgroundColor: colors.cardBackground,
                border: isSmallDevice || latestsale ? `1px solid ${colors.border}` : 'none',
                textDecoration: 'none',
                color: colors.text,
                boxShadow: theme.isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.08)',
            }}
        >


            {discount > 0 && (
                <div
                    style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        backgroundColor: theme.isDark ? '#ff4e50' : 'red',
                        color: 'white',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        zIndex: "100"
                    }}
                >
                    SALE {discount}%
                </div>
            )}

            <div
                style={{
                    width: isSmallDevice ? '180px' : '200px',
                    height: isSmallDevice ? '180px' : '200px',
                    borderRadius: '10px',
                    margin: '20px auto 0',
                    position: 'relative',
                    overflow: 'hidden',

                    backgroundColor: theme.isDark ? '#252525' : 'transparent',
                }}
            >
                <img
                    src={image || logo}
                    alt={title || 'Product'}
                    width={isSmallDevice ? '180' : '200'}
                    height={isSmallDevice ? '180' : '200'}
                    loading="lazy"
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '8px',
                        objectFit: 'contain', // Changed to 'contain' to match screenshot
                        position: 'relative',
                        zIndex: 2,
                        display: "block",
                        margin: "auto",
                        backgroundColor: '#fff', // Add background to match screenshot
                    }}
                    onError={(e) => (e.target.src = logo)}
                />
            </div>

            <div
                style={{
                    padding: isSmallDevice ? '10px 12px' : '10px 15px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div style={{ marginBottom: isSmallDevice ? '5px' : '10px' }}>
                    {Array.from({ length: Math.floor(rating || 0) }).map((_, i) => (
                        <MdStar key={`filled-${i}`} color="#FFD700" size={16} />
                    ))}
                    {Array.from({ length: 5 - Math.floor(rating || 0) }).map((_, i) => (
                        <MdOutlineStarBorder key={`empty-${i}`} color="#FFD700" size={16} />
                    ))}
                </div>

                <h2
                    style={{
                        fontSize: isSmallDevice ? '15px' : '16px',
                        fontWeight: '600',
                        color: colors.text,
                        textAlign: 'left',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: '1.5',
                        margin: 0,
                    }}
                >
                    {title}
                </h2>

                <p
                    style={{
                        fontSize: isSmallDevice ? '13px' : '14px',
                        color: theme.isDark ? 'rgba(255,255,255,0.6)' : colors.textSecondary,
                        textAlign: 'left',
                        margin: '5px 0',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        maxHeight: '42px',
                    }}
                >
                    {description}
                </p>

                <div
                    style={{
                        marginTop: isSmallDevice ? "40px" : " 30px",
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {discount > 0 ? (
                            <>
                                <span
                                    style={{
                                        fontSize: '12px',
                                        textDecoration: 'line-through',
                                        color: theme.isDark ? 'rgba(255,255,255,0.5)' : colors.textSecondary,
                                    }}
                                >
                                    ${price.toFixed(2)}
                                </span>
                                <span
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        color: theme.isDark ? '#ff6b6b' : colors.error,
                                    }}
                                >
                                    ${discountedPrice.toFixed(2)}
                                </span>
                            </>
                        ) : (
                            <span
                                style={{
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    color: theme.isDark ? '#ff6b6b' : colors.text,
                                }}
                            >
                                ${price.toFixed(2)}
                            </span>
                        )}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        style={{
                            fontSize: isSmallDevice ? '13px' : '15px',
                            backgroundColor: theme.isDark ? '#ffa41c' : '#FFD814', // Yellow to match screenshot
                            borderRadius: '20px',
                            padding: isSmallDevice ? '4px 10px' : '5px 10px',
                            color: 'black',
                            cursor: 'pointer',
                            width: 'fit-content',
                            fontWeight: '500',
                            border: 'none',
                        }}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </Link>
    );
});

export default Product;