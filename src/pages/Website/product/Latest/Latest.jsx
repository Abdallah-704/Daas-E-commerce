import { useCallback, useMemo } from "react";
import { Axios } from "../../../../API/Axios";
import { api_latest } from "../../../../API/Api";
import Product from "../Product";
import Skeleton from 'react-loading-skeleton';
import { Container } from "../../Style/Navbar";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import {
    MainTitle,
    Section,
    ProductGrid,
    Button,
    SectionWrapper,
    Title,
} from './style';
import styled from "styled-components";
import logo from '../../../../assets/daas-logo.svg';

// Styled component for product container
const ProductContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    transition: transform 0.3s ease;
    &:hover {
        transform: translateY(-5px);
    }
`;

// Styled component for the third product in both sections on large devices
const FullWidthProduct = styled(ProductContainer)`
    grid-column: 1 / -1; /* Span the full width of the grid */
`;

const fetchProducts = async () => {
    const response = await Axios.get(`/${api_latest}`);
    if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid data format received from server');
    }
    return response.data.filter(product => product && product.id && product.title);
};

const Latest = () => {
    const { data: products = [], isLoading: loading, error } = useQuery({
        queryKey: ['latest-products'],
        queryFn: fetchProducts,
        staleTime: 300000, // Cache data for 5 minutes
        cacheTime: 3600000, // Keep unused data in cache for 1 hour
        retry: 2,
        refetchOnWindowFocus: false
    });
    const navigate = useNavigate();
    const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");
    const isMediumDevice = useMediaQuery(
        "only screen and (min-width: 769px) and (max-width: 992px)"
    );



    const sportsProducts = useMemo(() => products.slice(0, 3).reverse(), [products]);
    const shoesProducts = useMemo(() => products.slice(3, 7).reverse(), [products]);

    const handleShopMore = useCallback((category) => {
        navigate(`/categories?type=${category}`);
    }, [navigate]);

    const renderProduct = useCallback((product, isThird = false) => {
        if (!product || !product.id) return null;

        const imageUrl = product.images?.[0]?.image || product.image || logo;

        const productId = product.id > 1000 ? product.id : product.id;

        const ProductComponent = isThird ? FullWidthProduct : ProductContainer;

        return (
            <ProductComponent key={productId}>
                <Product
                    image={imageUrl}
                    latest={true}
                    id={productId}
                    title={product.title || 'Untitled Product'}
                    price={Number(product.price) || 0}
                    description={product.description || 'No description available'}
                    rating={Number(product.rating) || 0}
                    stock={product.stock || 0}
                    category={product.category || 'Uncategorized'}

                />
            </ProductComponent>
        );
    }, []);

    if (error) {
        return (
            <Container>
                <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
                    {error}
                </div>
            </Container>
        );
    }

    return (
        <Container isSmallDevice={isSmallDevice} isMediumDevice={isMediumDevice}>
            <MainTitle
                style={{
                    fontSize: isSmallDevice ? "22px" : "24px",
                    marginBottom: isSmallDevice ? "30px" : "70px",
                    textAlign: "start",
                }}
            >
                Latest Products
            </MainTitle>
            <SectionWrapper
                style={{
                    flexDirection: isSmallDevice ? "column" : "row",
                    gap: isSmallDevice ? "30px" : isMediumDevice ? "20px" : "20px",
                }}
            >
                {/* Sports Needs Section */}
                <Section
                    style={{
                        backgroundColor: "#f0f0f0",
                        width: isSmallDevice ? "100%" : isMediumDevice ? "48%" : "48%",
                        padding: isSmallDevice ? "20px 15px" : "20px",
                        borderRadius: "12px",
                        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                    }}
                >
                    <Title
                        style={{
                            fontSize: isSmallDevice ? "18px" : isMediumDevice ? "18px" : "18px",
                            marginBottom: isSmallDevice ? "25px" : "40px",
                            textAlign: "center",
                        }}
                    >
                        WIDE SELECTION OF SPORTS NEEDS
                    </Title>
                    {loading ? (
                        <ProductGrid
                            style={{
                                gridTemplateColumns: isSmallDevice ? "repeat(1, 1fr)" : isMediumDevice ? "repeat(1, 1fr)" : "repeat(2, 1fr)",
                                gap: isSmallDevice ? "20px" : "20px",
                            }}
                        >
                            {Array.from({ length: 3 }).map((_, index) => (
                                <Skeleton height="180px" width="100%" key={index} />
                            ))}
                        </ProductGrid>
                    ) : (
                        <ProductGrid
                            style={{
                                gridTemplateColumns: isSmallDevice ? "repeat(1, 1fr)" : isMediumDevice ? "repeat(1, 1fr)" : "repeat(2, 1fr)",
                                gap: isSmallDevice ? "20px" : "20px",
                            }}
                        >
                            {sportsProducts.map((product, index) =>
                                renderProduct(product, !isSmallDevice && !isMediumDevice && index === 2) // Full width on large devices
                            )}
                        </ProductGrid>
                    )}
                    <Button
                        style={{
                            padding: isSmallDevice ? "10px" : "12px",
                            fontSize: isSmallDevice ? "14px" : "16px",
                            marginTop: "20px",
                            borderRadius: "8px",
                            fontWeight: "600",
                            letterSpacing: "1px",
                        }}
                        onClick={() => handleShopMore('gmaing')}
                    >
                        SHOP MORE
                    </Button>
                </Section>

                {/* Electronic Section */}
                <Section
                    style={{
                        backgroundColor: "#f0f0f0",
                        width: isSmallDevice ? "100%" : isMediumDevice ? "48%" : "48%",
                        padding: isSmallDevice ? "20px 15px" : "20px",
                        borderRadius: "12px",
                        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                    }}
                >
                    <Title
                        style={{
                            fontSize: isSmallDevice ? "18px" : isMediumDevice ? "18px" : "18px",
                            marginBottom: isSmallDevice ? "25px" : "40px",
                            textAlign: "center",
                        }}
                    >
                        Electronic
                    </Title>
                    {loading ? (
                        <ProductGrid
                            style={{
                                gridTemplateColumns: isSmallDevice ? "repeat(1, 1fr)" : isMediumDevice ? "repeat(1, 1fr)" : "repeat(2, 1fr)",
                                gap: isSmallDevice ? "20px" : "20px",
                            }}
                        >
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Skeleton height="180px" width="100%" key={index} />
                            ))}
                        </ProductGrid>
                    ) : (
                        <ProductGrid
                            style={{
                                gridTemplateColumns: isSmallDevice ? "repeat(1, 1fr)" : isMediumDevice ? "repeat(1, 1fr)" : "repeat(2, 1fr)",
                                gap: isSmallDevice ? "20px" : "20px",
                            }}
                        >
                            {shoesProducts.map((product, index) =>
                                renderProduct(product, !isSmallDevice && !isMediumDevice && index === 2) // Full width on large devices
                            )}
                        </ProductGrid>
                    )}
                    <Button
                        style={{
                            padding: isSmallDevice ? "10px" : "12px",
                            fontSize: isSmallDevice ? "14px" : "16px",
                            marginTop: "20px",
                            borderRadius: "8px",
                            fontWeight: "600",
                            letterSpacing: "1px",
                        }}
                        onClick={() => handleShopMore('electronic')}
                    >
                        SHOP MORE
                    </Button>
                </Section>
            </SectionWrapper>
        </Container>
    );
};

export default Latest;