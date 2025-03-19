import React, { useState } from 'react';
import { useTheme } from '../../../../context/ThemeContext';
import { useMediaQuery } from "@uidotdev/usehooks";
import { FaSearchPlus } from 'react-icons/fa';

const ProductGallery = ({ images, title }) => {
    const { theme } = useTheme();
    const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");
    const [selectedImage, setSelectedImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    const handleImageClick = (index) => {
        setSelectedImage(index);
    };

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
        }}>
            <div style={{
                position: "relative",
                width: "100%",
                height: isSmallDevice ? "300px" : "400px",
                backgroundColor: theme.colors.cardBackground,
                borderRadius: "10px",
                overflow: "hidden",
                cursor: isZoomed ? "zoom-out" : "zoom-in",
            }} onClick={toggleZoom}>
                <img
                    src={images[selectedImage]}
                    alt={title}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transform: isZoomed ? "scale(1.5)" : "scale(1)",
                        transition: "transform 0.3s ease",
                    }}
                />
                <div style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.text,
                    padding: "8px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <FaSearchPlus size={20} />
                </div>
            </div>

            {images.length > 1 && (
                <div style={{
                    display: "flex",
                    gap: "10px",
                    overflowX: "auto",
                    padding: "10px 0",
                }}>
                    {images.map((image, index) => (
                        <div
                            key={index}
                            onClick={() => handleImageClick(index)}
                            style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "5px",
                                overflow: "hidden",
                                cursor: "pointer",
                                border: selectedImage === index ? `2px solid ${theme.colors.primary}` : "none",
                                opacity: selectedImage === index ? 1 : 0.7,
                                transition: "all 0.3s ease",
                            }}
                        >
                            <img
                                src={image}
                                alt={`${title} - ${index + 1}`}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductGallery; 