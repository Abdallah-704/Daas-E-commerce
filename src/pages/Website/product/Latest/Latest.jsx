import axios from "axios";
import { useEffect, useState, useCallback, useMemo } from "react"; // أضفنا useMemo هنا
import { api, api_latest } from "../../../../API/Api";
import Product from "../Product";
import Skeleton from 'react-loading-skeleton';
import { Container } from "../../Style/Navbar";
import { useMediaQuery } from "@uidotdev/usehooks";
import {
    MainTitle,
    Section,
    ProductGrid,
    Button,
    SectionWrapper,
    Title,
} from './style';

const Latest = () => {
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
                const response = await axios.get(`${api}/${api_latest}`);
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

    // استخدمنا useMemo لتقسيم المنتجات
    const sportsProducts = useMemo(() => products.slice(0, 4), [products]);
    const shoesProducts = useMemo(() => products.slice(4, 8), [products]);

    // Memoized function to render product images
    const renderProduct = useCallback((product) => {
        return (
            <Product
                key={product.id}
                image={product.images[0].image}
                latest={true}
                id={product.id}
            />
        );
    }, []);

    return (
        <Container
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
            isSmallDevice={isSmallDevice}
            isMediumDevice={isMediumDevice}
        >
            <MainTitle>Latest</MainTitle>
            <SectionWrapper>
                {/* Sports Needs Section */}
                <Section>
                    <Title>WIDE SELECTION OF SPORTS NEEDS</Title>
                    {loading ? (
                        <ProductGrid>
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Skeleton height="150px" width="100%" key={index} />
                            ))}
                        </ProductGrid>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <ProductGrid>
                            {sportsProducts.map((product) => renderProduct(product))}
                        </ProductGrid>
                    )}
                    <Button>SHOP MORE</Button>
                </Section>

                {/* Men's Shoes Section */}
                <Section>
                    <Title>SHOP MEN'S SHOES STARTING FROM SAR 15</Title>
                    {loading ? (
                        <ProductGrid>
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Skeleton height="150px" width="100%" key={index} />
                            ))}
                        </ProductGrid>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <ProductGrid>
                            {shoesProducts.map((product) => renderProduct(product))}
                        </ProductGrid>
                    )}
                    <Button>SHOP ALL</Button>
                </Section>
            </SectionWrapper>
        </Container>
    );
};

export default Latest;