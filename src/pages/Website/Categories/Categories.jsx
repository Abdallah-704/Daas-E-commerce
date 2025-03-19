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
        <p>{name}</p>
    </div>
));

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${api}/${api_catagories}`);
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setError("فشل تحميل التصنيفات، يرجى المحاولة لاحقًا.");
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    // تحديد عدد السكليتون بناءً على التصنيفات المحملة أو 50 كحد أدنى
    const skeletonCount = categories.length > 0 ? categories.length : 50;

    return (
        <Container>
            {error ? (
                <p style={styles.errorText}>{error}</p>
            ) : (
                <div style={styles.gridContainer}>
                    {loading
                        ? [...Array(skeletonCount)].map((_, index) => (
                            <div key={index} style={styles.itemContainer}>
                                <Skeleton height={100} width={200} />
                                <Skeleton width={200} style={{ marginTop: 10 }} />
                            </div>
                        ))
                        : categories.map((item, index) => (
                            <CategoryItem key={index} image={item.image} name={item.name} />
                        ))}
                </div>
            )}
        </Container>
    );
};

export default Categories;

// Styles Object for Better Maintainability
const styles = {
    gridContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
    },
    itemContainer: {
        textAlign: "center",
    },
    image: {
        maxWidth: "100%",
        height: "auto",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    errorText: {
        color: "red",
        textAlign: "center",
    },
};
