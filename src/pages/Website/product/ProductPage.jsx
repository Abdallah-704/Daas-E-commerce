import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { useMediaQuery } from "@uidotdev/usehooks";
import ProductGallery from './SingleProduct/ProductGallery';
import ProductDetails from './SingleProduct/ProductDetails';
import ProductReviews from './SingleProduct/ProductReviews';
import ProductSpecifications from './SingleProduct/ProductSpecifications';
import axios from 'axios';
import Loading from '../../../components/loading/Loading';

// Temporary mock data for testing
const mockProduct = {
    id: "1",
    title: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.",
    price: 199.99,
    rating: 4.5,
    stock: 15,
    category: "Electronics",
    brand: "SoundMaster",
    discount: 20,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    ],
    specifications: {
        "General": {
            "Brand": "SoundMaster",
            "Model": "WH-1000XM4",
            "Color": "Black",
            "Weight": "250g",
            "Dimensions": "20 x 20 x 5 cm"
        },
        "Technical": {
            "Battery Life": "30 hours",
            "Charging Time": "3 hours",
            "Bluetooth Version": "5.0",
            "Noise Cancellation": "Active",
            "Water Resistance": "IPX4"
        }
    },
    reviews: [
        {
            userName: "John Doe",
            rating: 5,
            comment: "Excellent sound quality and comfortable to wear for long periods.",
            date: "2024-03-15",
            likes: 12
        },
        {
            userName: "Jane Smith",
            rating: 4,
            comment: "Great headphones but a bit expensive.",
            date: "2024-03-10",
            likes: 8
        }
    ]
};

const ProductPage = () => {
    const { theme } = useTheme();
    const { id } = useParams();
    const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // For testing, use mock data instead of API call
                console.log('Using mock data for testing');
                setProduct(mockProduct);

                // Comment out the actual API call for now
                /*
                console.log('Fetching product with ID:', id);
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                console.log('Product data received:', response.data);
                setProduct(response.data);
                */
            } catch (err) {
                console.error('Error details:', {
                    message: err.message,
                    response: err.response?.data,
                    status: err.response?.status
                });
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = async (quantity) => {
        try {
            // Implement add to cart functionality
            await axios.post('/api/cart', {
                productId: id,
                quantity
            });
            // Show success message or update cart UI
        } catch (err) {
            console.error('Error adding to cart:', err);
            // Show error message
        }
    };

    const handleAddReview = async (review) => {
        try {
            await axios.post(`/api/products/${id}/reviews`, review);
            // Refresh product data to show new review
            const response = await axios.get(`/api/products/${id}`);
            setProduct(response.data);
        } catch (err) {
            console.error('Error adding review:', err);
            // Show error message
        }
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: theme.colors.background
            }}>
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                padding: "20px",
                backgroundColor: theme.colors.background,
                color: theme.colors.error,
                textAlign: "center",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px"
            }}>
                <h2>Error loading product</h2>
                <p>{error}</p>
                <p>Product ID: {id}</p>
                <button
                    onClick={() => window.location.reload()}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: theme.colors.primary,
                        color: theme.colors.text,
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (!product) {
        return (
            <div style={{
                padding: "20px",
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
                textAlign: "center",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px"
            }}>
                <h2>Product not found</h2>
                <p>Product ID: {id}</p>
                <button
                    onClick={() => window.history.back()}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: theme.colors.primary,
                        color: theme.colors.text,
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div style={{
            padding: isSmallDevice ? "15px" : "30px",
            backgroundColor: theme.colors.background,
            minHeight: "100vh",
        }}>
            <div style={{
                maxWidth: "1200px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: "30px",
            }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: isSmallDevice ? "1fr" : "1fr 1fr",
                    gap: "30px",
                }}>
                    <ProductGallery
                        images={product.images || [product.image]}
                        title={product.title}
                    />
                    <ProductDetails
                        title={product.title}
                        description={product.description}
                        price={product.price}
                        rating={product.rating}
                        stock={product.stock}
                        category={product.category}
                        brand={product.brand}
                        discount={product.discount}
                        onAddToCart={handleAddToCart}
                    />
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: isSmallDevice ? "1fr" : "2fr 1fr",
                    gap: "30px",
                }}>
                    <ProductReviews
                        reviews={product.reviews || []}
                        rating={product.rating}
                        onAddReview={handleAddReview}
                    />
                    <ProductSpecifications
                        specifications={product.specifications || {
                            "General": {
                                "Brand": product.brand,
                                "Category": product.category,
                                "Stock": product.stock
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductPage; 