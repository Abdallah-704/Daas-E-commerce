import { useEffect, useState, memo } from "react";
import axios from "axios";
import { api, api_catagories } from "../../../API/Api";
import { Container } from "../Style/Navbar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Memoized Category Item Component (Prevents Unnecessary Re-renders)
const CategoryItem = memo(({ image, name }) => (
    <div style={styles.itemContainer}>
        <img
            src={image}
            alt={name}
            loading="lazy"
            style={styles.image} />
        <p style={styles.itemName}>{name}</p>
    </div>
));

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [useFallback, setUseFallback] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${api}/${api_catagories}`);
                if (response.data && response.data.length > 0) {
                    setCategories(response.data);
                } else {
                 
                    setUseFallback(true);
                }
            } catch (error) {
               
                setError("Failed to load categories. Using placeholder data instead.");
                // Use fallback categories on error
                setUseFallback(true);

            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    // Determine the number of skeleton placeholders to show
    const skeletonCount = categories.length > 0 ? categories.length : 10;

    return (
        <Container>
            {error && <p style={styles.message}>{error}</p>}

            <div style={styles.gridContainer}>
                {loading
                    ? [...Array(skeletonCount)].map((_, index) => (
                        <div key={index} style={styles.itemContainer}>
                            <Skeleton height={200} width={250} style={styles.skeletonImage} />
                            <Skeleton width={150} style={styles.skeletonText} />
                        </div>
                    ))
                    : categories.map((item, index) => (
                        <CategoryItem
                            key={useFallback ? `fallback-${index}` : item.id}
                            image={item.image}
                            name={item.name}
                        />
                    ))}
            </div>
        </Container>
    );
};

export default Categories;

// Styles Object for Better Maintainability
const styles = {
    gridContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "30px",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
        padding: "20px",
    },
    itemContainer: {
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "transform 0.3s ease",
        cursor: "pointer",
        "&:hover": {
            transform: "translateY(-10px)",
        },
    },
    image: {
        width: "100%",
        height: "200px",
        objectFit: "cover",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
        },
    },
    itemName: {
        marginTop: "12px",
        fontSize: "18px",
        fontWeight: "600",
    },
    message: {
        textAlign: "center",
        margin: "20px 0",
        fontSize: "16px",
    },
    skeletonImage: {
        borderRadius: "8px",
        marginBottom: "10px",
    },
    skeletonText: {
        marginTop: "10px",
    },
};
