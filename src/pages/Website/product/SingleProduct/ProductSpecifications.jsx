import React from 'react';
import { useTheme } from '../../../../context/ThemeContext';
import { useMediaQuery } from "@uidotdev/usehooks";

const ProductSpecifications = ({ specifications }) => {
    const { theme } = useTheme();
    const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");

    return (
        <div style={{
            backgroundColor: theme.colors.card,
            padding: isSmallDevice ? "15px" : "30px",
            borderRadius: theme.borderRadius.medium,
            boxShadow: theme.shadows.medium,
        }}>
            <h2 style={{
                fontSize: isSmallDevice ? "20px" : "24px",
                color: theme.colors.text,
                marginBottom: "20px",
            }}>
                Product Specifications
            </h2>

            <div style={{
                display: "grid",
                gridTemplateColumns: isSmallDevice ? "1fr" : "repeat(2, 1fr)",
                gap: "20px",
            }}>
                {Object.entries(specifications).map(([category, specs]) => (
                    <div key={category}>
                        <h3 style={{
                            fontSize: "18px",
                            color: theme.colors.text,
                            marginBottom: "15px",
                            paddingBottom: "10px",
                            borderBottom: `1px solid ${theme.colors.border}`,
                        }}>
                            {category}
                        </h3>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                        }}>
                            {Object.entries(specs).map(([key, value]) => (
                                <div
                                    key={key}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        padding: "8px 0",
                                        borderBottom: `1px solid ${theme.colors.border}`,
                                    }}
                                >
                                    <span style={{
                                        color: theme.colors.textSecondary,
                                        fontWeight: "500",
                                    }}>
                                        {key}
                                    </span>
                                    <span style={{
                                        color: theme.colors.text,
                                        fontWeight: "500",
                                    }}>
                                        {value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{
                marginTop: "20px",
                padding: "15px",
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.small,
            }}>
                <h3 style={{
                    fontSize: "16px",
                    color: theme.colors.text,
                    marginBottom: "10px",
                }}>
                    Warranty Information
                </h3>
                <p style={{
                    color: theme.colors.textSecondary,
                    lineHeight: "1.6",
                }}>
                    This product comes with a standard warranty of 1 year from the date of purchase.
                    The warranty covers manufacturing defects and hardware issues.
                    Please keep your purchase receipt for warranty claims.
                </p>
            </div>

            <div style={{
                marginTop: "20px",
                padding: "15px",
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.small,
            }}>
                <h3 style={{
                    fontSize: "16px",
                    color: theme.colors.text,
                    marginBottom: "10px",
                }}>
                    Shipping Information
                </h3>
                <p style={{
                    color: theme.colors.textSecondary,
                    lineHeight: "1.6",
                }}>
                    Free shipping on orders over $50. Standard delivery takes 3-5 business days.
                    Express shipping is available for an additional fee.
                </p>
            </div>
        </div>
    );
};

export default ProductSpecifications; 