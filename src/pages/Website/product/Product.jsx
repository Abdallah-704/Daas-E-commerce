import { useMediaQuery } from "@uidotdev/usehooks";
import { MdOutlineStarBorder, MdStar } from "react-icons/md";
import { Link } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";

const Product = ({ image, title, description, price, rating, id, latestsale, toprated, latest = false, discount = 0 }) => {
    const { theme } = useTheme();
    const filledStars = Math.floor(rating);
    const totalStars = 5;
    const emptyStars = totalStars - filledStars;

    const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");
    const isMediumDevice = useMediaQuery("only screen and (min-width: 769px) and (max-width: 992px)");

    const discountPercentage = discount ? Math.round((discount / price) * 100) : 0;

    return (
        <Link
            to={`/product/${id}`}
            style={{
                overflow: "hidden",
                padding: "0 0 10px 10px",
                borderRadius: "10px",
                height: toprated || latestsale ? (toprated ? "450px" : "500px") : "auto",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                backgroundColor: theme.colors.cardBackground || "white",
                cursor: "pointer",
                border: isSmallDevice || latestsale ? `1px solid ${theme.colors.border}` : "none",
                textDecoration: "none",
                color: theme.colors.text,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: theme.shadows.medium,
                }
            }}
        >
            {toprated && (
                <span
                    style={{
                        position: "absolute",
                        top: "5px",
                        left: "5px",
                        backgroundColor: theme.colors.info,
                        color: theme.colors.text,
                        borderRadius: "5px",
                        fontSize: "13px",
                        fontWeight: "bold",
                        padding: "4px 13px",
                        textTransform: "uppercase",
                        animation: "glow 2s infinite",
                        boxShadow: `0 0 5px ${theme.colors.info}80`,
                        transformOrigin: "center",
                        writingMode: "vertical-rl",
                        height: "fit-content",
                        width: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        lineHeight: "1",
                    }}
                >
                    Top Pick
                </span>
            )}

            {latestsale && discountPercentage > 0 && (
                <span
                    style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        backgroundColor: theme.colors.error,
                        color: theme.colors.text,
                        padding: "4px 8px",
                        borderRadius: "5px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        animation: "pulse 2s infinite",
                        boxShadow: `0 0 5px ${theme.colors.error}80`,
                        transformOrigin: "center",
                        zIndex: 1
                    }}
                >
                    {discountPercentage}% OFF
                </span>
            )}

            <div
                style={{
                    width: latest ? (isSmallDevice ? "120px" : "160px") : "160px",
                    height: "160px",
                    textAlign: "start",
                    margin: "auto",
                    padding: "5px",
                    borderRadius: "5px",
                    backgroundColor: "#white"
                }}
            >
                <img
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "10px",
                    }}
                    src={image}
                    alt={title}
                />
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "5px 10px",
                    gap: "10px",
                    alignItems: "start",
                }}
            >
                {latest && (
                    <span
                        style={{
                            backgroundColor: theme.colors.success,
                            color: theme.colors.text,
                            padding: "4px 8px",
                            borderRadius: "5px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            animation: "slideIn 2s infinite",
                            transformOrigin: "left",
                        }}
                    >
                        New Arrival
                    </span>
                )}
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "12px",
                padding: "0 10px 0 0",
                width: "100%"
            }}>

                <h2
                    style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: theme.colors.text,
                        textAlign: "left",
                        width: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        lineHeight: "1.5",
                        margin: 0,
                        opacity: 0.95
                    }}
                >
                    {title}
                </h2>

                <p
                    style={{
                        fontSize: "14px",
                        color: theme.colors.textSecondary,
                        textAlign: "left",
                        width: "100%",
                        margin: 0,
                        overflow: "visible",
                        textOverflow: "clip",
                        display: "block",
                        lineHeight: "1.5",
                        opacity: 0.8
                    }}
                >
                    {description}
                </p>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "auto",
                    alignItems: "start",
                }}
            >
                {(toprated || latestsale) && (
                    <p
                        style={{
                            fontSize: "16px",
                            marginBottom: "10px",
                            fontWeight: "bold",
                            color: theme.colors.text,
                            opacity: 0.9,
                            textAlign: "center"
                        }}
                    >
                        Price: ${price}
                    </p>
                )}

                {(toprated || latestsale) && (
                    <div
                        style={{
                            display: "flex",
                            fontSize: "20px",
                            marginBottom: "10px",
                        }}
                    >
                        {Array.from({ length: filledStars }).map((_, index) => (
                            <MdStar color="gold" key={index} />
                        ))}
                        {Array.from({ length: emptyStars }).map((_, index) => (
                            <MdOutlineStarBorder key={index + filledStars} />
                        ))}
                    </div>
                )}

                {toprated && latestsale && (
                    <Link
                        to="/cart"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            fontSize: "15px",
                            backgroundColor: "#FFD814",
                            borderRadius: "20px",
                            padding: "5px 10px",
                            color: "black",
                            textDecoration: "none",
                            cursor: "pointer",
                            width: "fit-content",
                        }}
                    >
                        Add to cart
                    </Link>
                )}
            </div>
        </Link>
    );
};

export default Product;

// Inline CSS for animations
const styles = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); box-shadow: 0 0 10px rgba(255, 0, 0, 0.7); }
    100% { transform: scale(1); }
  }
  
  @keyframes slideIn {
    0% { opacity: 0.7; transform: translateX(-5px); }
    50% { opacity: 1; transform: translateX(2px); }
    100% { opacity: 0.7; transform: translateX(-5px); }
  }
  
  @keyframes glow {
    0% { opacity: 0.8; box-shadow: 0 0 5px rgba(33, 150, 243, 0.5); }
    50% { opacity: 1; box-shadow: 0 0 10px rgba(33, 150, 243, 0.8); }
    100% { opacity: 0.8; box-shadow: 0 0 5px rgba(33, 150, 243, 0.5); }
  }
`;

// Add the animation styles to the document
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);