import axios from "axios";
import { useEffect, useState, useCallback, useMemo } from "react"; // Removed useEffect, useState
import { useQuery } from '@tanstack/react-query'; // Import useQuery
import { Axios } from "../../../../API/Axios"; // Import Axios
import { api, api_toprated } from "../../../../API/Api";
import Product from "../Product";
import Skeleton from 'react-loading-skeleton';
import { Container } from "../../Style/Navbar";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Title } from './style'; // Import the Title style


const TopRated = () => {
    // Removed useState hooks for products, loading, error
    const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");
    const isMediumDevice = useMediaQuery(
        "only screen and (min-width : 769px) and (max-width : 992px)"
    );

    // Define the query function
    const fetchTopRatedProducts = async () => {
        const { data } = await Axios.get(`${api}/${api_toprated}`);
        return data;
    };

    // Use React Query
    const { data: products = [], isLoading, isError, error } = useQuery({
        queryKey: ['topRatedProducts'],
        queryFn: fetchTopRatedProducts,
    });

    // Removed useEffect hook

    // Memoized function to render a single product
    const renderProduct = useCallback((product) => { // Changed parameter name
        // Handle both data structures (Fake Store API and your API)
        const imageUrl = product.images?.[0]?.image || product.image;
        const productId = product.id;

        return (
            <Product
                key={productId}
                image={imageUrl}
                id={productId}
                discount={product.discount || 0}
                title={product.title || 'Untitled Product'}
                description={product.description || 'No description available'}
                price={Number(product.price) || 0}
                rating={product.rating || 0}
                toprated={true}
                stock={product.stock}
            />
        );
    }, []); // No dependencies since the function doesn't rely on any external variables

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
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton
                            height="300px"
                            key={index} />
                    ))
                ) : isError ? (
                    <p>{error?.message || "Failed to load products. Please try again later."}</p> // Display error message
                ) : (
                    productElements
                )}
            </div>
        </Container>
    );
}

export default TopRated;