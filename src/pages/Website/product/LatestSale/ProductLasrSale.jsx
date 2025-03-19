import axios from "axios";
import { useEffect, useState, useCallback, useMemo } from "react";
import { api, api_latestSale } from "../../../../API/Api";
import Product from "../Product";
import Skeleton from 'react-loading-skeleton';
import { Container } from "../../Style/Navbar";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Title } from './style';

const LatestSale = () => {
    const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");
    const isMediumDevice = useMediaQuery(
        "only screen and (min-width: 769px) and (max-width: 992px)"
    );

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${api}/${api_latestSale}`);
                setProducts(response.data.slice(1));
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

    const renderProduct = useCallback((product) => (
        <Product
            key={product.id}
            image={product.images[0].image}
            title={product.title}
            price={product.price}
            description={product.description}
            rating={product.rating}
            id={product.id}
            discount={product.discount}
            latestsale={true}
        />
    ), []);

    const productElements = useMemo(() => {
        return products.map(renderProduct);
    }, [products, renderProduct]);

    // Memoized Skeleton elements
    const skeletonElements = useMemo(() => {
        return Array.from({ length: 4 }).map((_, index) => (
            <Skeleton height="500px" key={index} />
        ));
    }, []); // Empty dependency array since Skeleton props are static

    return (
        <Container
            isSmallDevice={isSmallDevice}
            isMediumDevice={isMediumDevice}
        >
            <Title className="last-sales">Latest Sales Product</Title>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
                    gridGap: "20px",
                    marginTop: "20px",
                    justifyContent: "center",
                    alignItems: "stretch",
                    padding: "20px",
                    backgroundColor: "#F5F5F5",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                }}>
                {loading ? skeletonElements : error ? <p>{error}</p> : productElements}
            </div>
        </Container>
    );
}

export default LatestSale;