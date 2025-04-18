import { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Axios } from '../../../../API/Axios';
import { api, api_latestSale } from '../../../../API/Api';
import Product from '../Product';
import Skeleton from 'react-loading-skeleton';
import { Container } from '../../Style/Navbar';
import { useMediaQuery } from '@uidotdev/usehooks';
import { Title } from './style';
import logo from '../../../../images/daas-logo.svg'; // Added for image fallback

const LatestSale = () => {
    const isSmallDevice = useMediaQuery('only screen and (max-width: 768px)');
    const isMediumDevice = useMediaQuery('only screen and (min-width: 769px) and (max-width: 992px)');

    // Define the query function
    const fetchLatestSaleProducts = async () => {
        const { data } = await Axios.get(`${api}/${api_latestSale}`);
        return data.slice(-5, -1);
    };

    // Use React Query
    const { data: products = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['latestSaleProducts'],
        queryFn: fetchLatestSaleProducts,
        onError: () => {
            console.error('Error fetching latest sale products');
        },
    });

    const renderProduct = useCallback((product) => {
        // Handle API product data structure
        const imageUrl = product.images?.[0]?.image || product.image || logo; // Added fallback
        const productId = product.id;

        // Ensure valid product ID
        if (!productId && productId !== 0) {
            console.warn('Product ID is missing:', product);
            return null;
        }

        // Log warnings for missing data
        if (!product.title) console.warn('Product title missing:', product);
        if (!product.price) console.warn('Product price missing:', product);

        // Convert ID to string for consistent routing
        const idString = String(productId);

        return (
            <Product
                key={productId}
                id={productId}
                image={imageUrl}
                title={product.title || 'Untitled Product'}
                price={Number(product.price) || 0}
                description={product.description || 'No description available'}
                rating={product.rating?.rate || product.rating || 0}
                discount={product.discount || 0}
                latestsale={true}
                lazyLoad={true} // Added to enable lazy loading in Product component
            // Note: Ensure Product component uses aria-label for buttons and e.stopPropagation() for interactive elements to avoid navigation issues
            />
        );
    }, []);

    const productElements = useMemo(() => {
        return products.map(renderProduct);
    }, [products, renderProduct]);

    // Memoized Skeleton elements
    const skeletonElements = useMemo(() => {
        return Array.from({ length: 4 }).map((_, index) => (
            <Skeleton height="400px" key={index} /> // Adjusted height to approximate Product
        ));
    }, []);

    return (
        <Container isSmallDevice={isSmallDevice} isMediumDevice={isMediumDevice}>
            <Title className="last-sales">Latest Sales Product</Title>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
                    gridGap: '20px',
                    marginTop: '20px',
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    backgroundColor: '#F5F5F5',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
                }}
            >
                {isLoading ? (
                    skeletonElements
                ) : isError ? (
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '20px',
                            color: 'red',
                            fontSize: '16px',
                        }}
                        role="alert"
                        aria-live="assertive"
                    >
                        <p>{error?.message || 'Failed to load products. Please try again later.'}</p>
                        <button
                            onClick={() => refetch()}
                            style={{
                                marginTop: '10px',
                                padding: '8px 16px',
                                background: '#007bff',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                            aria-label="Retry loading products"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    productElements
                )}
            </div>
        </Container>
    );
};

export default LatestSale;