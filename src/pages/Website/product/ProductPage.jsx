import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { useMediaQuery } from '@uidotdev/usehooks';
import { useCart } from '../../../hooks/useCart';
import { useAlert } from '../../../context/AlertContext';
import ProductGallery from './SingleProduct/ProductGallery';
import ProductDetails from './SingleProduct/ProductDetails';
import ProductReviews from './SingleProduct/ProductReviews';
import ProductSpecifications from './SingleProduct/ProductSpecifications';
import { Axios } from '../../../API/Axios';
import Loading from '../../../components/loading/Loading';

const ProductPage = () => {
    const { theme } = useTheme();
    const { id } = useParams();
    const { addToCart } = useCart();
    const { showAlert } = useAlert();
    const isSmallDevice = useMediaQuery('(max-width: 768px)');
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [productRating, setProductRating] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);

                // Check if ID has 'fake-' prefix (from Fake Store API)
                if (id.startsWith('fake-')) {
                    // Extract the numeric part from the fake ID
                    const fakeStoreId = id.replace('fake-', '');

                    // Fetch from Fake Store API
                    const { data } = await Axios.get(`https://fakestoreapi.com/products/${fakeStoreId}`);
                    if (!data) throw new Error('Product not found');

                    const productRating = parseFloat(data.rating?.rate) || 0;
                    setProductRating(productRating);

                    setProduct({
                        id: `fake-${data.id}`, // Keep the fake- prefix
                        title: data.title || 'Unnamed Product',
                        description: data.description || 'No description',
                        price: parseFloat(data.price) || 0,
                        rating: productRating,
                        stock: data.rating?.count, // Fake Store API uses rating.count for stock
                        discount: 0, // Fake Store API doesn't have discount
                        category: data.category || 'Uncategorized',
                        brand: 'Unknown', // Fake Store API doesn't have brand
                        images: data.image ? [{ image: data.image }] : [],
                        specifications: {}, // Fake Store API doesn't have specifications
                    });

                    // Initialize with some sample reviews for fake products
                    setReviews([
                        {
                            userName: 'John Doe',
                            rating: 4,
                            comment: 'Great product, exactly as described!',
                            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                            likes: 5
                        },
                        {
                            userName: 'Jane Smith',
                            rating: 5,
                            comment: 'Excellent quality and fast shipping.',
                            date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
                            likes: 3
                        }
                    ]);
                } else {
                    // Handle regular numeric IDs from your API
                    const productId = parseInt(id, 10);
                    if (isNaN(productId)) throw new Error('Invalid product ID');

                    const { data } = await Axios.get(`/product/${productId}`);
                    if (!data) throw new Error('Product not found');

                    const productRating = parseFloat(data[0].rating) || 0;
                    setProductRating(productRating);

                    setProduct({
                        id: data[0].id || productId,
                        title: data[0].title || 'Unnamed Product',
                        description: data[0].description || 'No description',
                        price: parseFloat(data[0].price) || 0,
                        rating: productRating,
                        stock: parseInt(data[0].stock, 10) || 10,
                        discount: parseFloat(data[0].discount) || 0,
                        category: data[0].category || 'Uncategorized',
                        brand: data[0].brand || 'Unknown',
                        images: Array.isArray(data[0].images) && data[0].images.length ? data[0].images : data[0].image ? [{ image: data[0].image }] : [],
                        specifications: data[0].specifications || {},
                    });
                    console.log(data[0]);

                    // Initialize with empty reviews array for your API products
                    // In a real app, you would fetch reviews from your API
                    setReviews([]);
                }
            } catch (error) {
                setError(error.message || 'Failed to load product');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    const handleAddToCart = (quantity) => {
        if (!product) return showAlert('No product available', 'error');
        try {
            if (addToCart(product, quantity)) {
                showAlert('Added to cart!', 'success');
            } else {
                showAlert('Failed to add to cart', 'error');
            }
        } catch (err) {
            showAlert('Failed to add to cart', 'error');
        }
    };

    const handleAddReview = (newReview) => {
        try {
            // Create a new review object with additional properties
            const reviewToAdd = {
                ...newReview,
                userName: 'You', // In a real app, get this from user profile
                date: new Date().toISOString(),
                likes: 0
            };

            // Add the new review to the reviews array
            const updatedReviews = [reviewToAdd, ...reviews];
            setReviews(updatedReviews);

            // Recalculate the average rating
            const totalRating = updatedReviews.reduce((sum, review) => sum + review.rating, 0);
            const newAverageRating = totalRating / updatedReviews.length;
            setProductRating(newAverageRating);

            showAlert('Review added successfully!', 'success');
        } catch (err) {
            showAlert('Failed to add review', 'error');
        }
    };

    const getProductImage = (product) => (product?.images?.[0]?.image || product?.image || '');

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
                <Loading />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>{error || 'Product not found'}</h2>
            </div>
        );
    }

    return (
        <div
            style={{
                padding: isSmallDevice ? '20px' : '40px',
                background: theme.colors.background || '#fff',
                minHeight: '100vh',
            }}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: isSmallDevice ? '1fr' : '1fr 1fr',
                    gap: '30px',
                    marginBottom: '30px',
                }}
            >
                <ProductGallery image={getProductImage(product)} title={product.title} />
                <ProductDetails
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    rating={product.rating}
                    stock={product.stock || 10}
                    discount={product.discount}
                    category={product.category}
                    brand={product.brand}
                    image={getProductImage(product)}
                    onAddToCart={handleAddToCart}
                />
            </div>
            <div style={{ display: 'grid', gap: '30px' }}>
                <ProductSpecifications specifications={product.specifications} />
                <ProductReviews
                    productId={product.id}
                    reviews={reviews}
                    rating={productRating}
                    onAddReview={handleAddReview}
                />
            </div>
        </div>
    );
};

export default ProductPage;