import axios from "axios";
import { useEffect, useState, useCallback, useMemo } from "react"; // Added useCallback and useMemo
import { api, api_toprated } from "../../../../API/Api";
import Product from "../Product";
import Skeleton from 'react-loading-skeleton';
import { Container } from "../../Style/Navbar";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Title } from './style'; // Import the Title style

const TopRated = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");
    const isMediumDevice = useMediaQuery(
        "only screen and (min-width : 769px) and (max-width : 992px)"
    );
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${api}/${api_toprated}`);
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Memoized function to render a single product
    const renderProduct = useCallback((product) => (
        <Product
            key={product.id}
            image={product.images[0].image}
            id={product.id}
            discount={product.discount}
            title={product.title}
            description={product.description}
            price={product.price}
            rating={product.rating}
            toprated={true}
        />
    ), []); // No dependencies since the function doesn't rely on any external variables

    // Memoized product elements array
    const productElements = useMemo(() => {
        return products.map(renderProduct);
    }, [products, renderProduct]); // Depends on products and renderProduct

    return (
        <Container
            isSmallDevice={isSmallDevice}
            isMediumDevice={isMediumDevice}
        >
            <Title>Top Rated</Title>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gridGap: "20px",
                    marginTop: "20px",
                    justifyContent: "center",
                    alignItems: "stretch",
                    backgroundColor: "#F5F5F5",
                    marginBottom: "30px",
                    padding: "10px",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)", 
                }}>
                {loading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton
                            height="300px"
                            key={index} />
                    ))
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    productElements
                )}
            </div>
        </Container>
    );
}

export default TopRated;