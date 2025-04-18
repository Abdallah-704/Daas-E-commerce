import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { useMediaQuery } from "@uidotdev/usehooks";
import { Axios } from '../../../API/Axios';
import Loading from '../../../components/loading/Loading';
import { MdArrowForward } from 'react-icons/md';
import logo from '../../../images/daas-logo.svg';

const AllCategories = () => {
    const { theme } = useTheme();
    const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await Axios.get('/categories');
                if (response.data) {
                    setCategories(Array.isArray(response.data) ? response.data : [response.data]);
                } else {
                    setCategories([]);
                }
            } catch (err) {
              
                setError('Failed to load categories. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Function to get a color based on category index
    const getCategoryColor = (index) => {
        const colors = [
            { bg: '#f8e9dd', text: '#e67e22' },
            { bg: '#e3f2fd', text: '#2196f3' },
            { bg: '#e8f5e9', text: '#4caf50' },
            { bg: '#f3e5f5', text: '#9c27b0' },
            { bg: '#fff3e0', text: '#ff9800' },
            { bg: '#e0f7fa', text: '#00bcd4' },
            { bg: '#fce4ec', text: '#e91e63' },
            { bg: '#f1f8e9', text: '#8bc34a' },
        ];
        return colors[index % colors.length];
    };

    // Helper function to get category image if available
    const getCategoryImage = (category) => {
        if (!category) return logo;
        if (category.image) return category.image;
        if (category.images) {
            return `http://127.0.0.1:8000${category.images}`;
        }
        return logo;
    };

    if (loading) {
        return (
            <div style={{
                minHeight: 'calc(100vh - 200px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                padding: '40px',
                textAlign: 'center',
                minHeight: 'calc(100vh - 200px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <h2 style={{ color: theme.colors.error }}>Error</h2>
                <p style={{ color: theme.colors.textSecondary }}>{error}</p>
            </div>
        );
    }

    return (
        <div style={{
            padding: isSmallDevice ? '20px' : '40px',
            backgroundColor: theme.colors.background,
            minHeight: 'calc(100vh - 80px)',
        }}>
            {/* Page Header */}
            <div style={{
                marginBottom: '30px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '30px 20px',
                backgroundColor: theme.colors.card,
                borderRadius: theme.borderRadius.large,
                boxShadow: theme.shadows.medium,
            }}>
                <h1 style={{
                    fontSize: isSmallDevice ? '24px' : '36px',
                    color: theme.colors.text,
                    marginBottom: '10px',
                    position: 'relative',
                }}>
                    Shop by Category
                    <span style={{
                        display: 'block',
                        width: '80px',
                        height: '4px',
                        backgroundColor: theme.colors.primary,
                        margin: '15px auto',
                        borderRadius: '2px',
                    }}></span>
                </h1>
                <p style={{
                    color: theme.colors.textSecondary,
                    maxWidth: '800px',
                    fontSize: '16px',
                    lineHeight: '1.6',
                }}>
                    Browse our wide selection of categories to find exactly what you're looking for
                </p>
            </div>

            {/* Categories Grid */}
            {categories.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    backgroundColor: theme.colors.card,
                    borderRadius: theme.borderRadius.large,
                    boxShadow: theme.shadows.medium,
                }}>
                    <h3 style={{ color: theme.colors.text }}>No Categories Found</h3>
                    <p style={{ color: theme.colors.textSecondary }}>
                        There are no categories available at the moment.
                    </p>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isSmallDevice
                        ? 'repeat(1, 1fr)'
                        : 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '20px',
                }}>
                    {categories.map((category, index) => {
                        const colorScheme = getCategoryColor(index);
                        return (
                            <Link
                                key={category.id}
                                to={`/category/${category.id}`}
                                style={{
                                    textDecoration: 'none',
                                    backgroundColor: theme.colors.card,
                                    borderRadius: theme.borderRadius.large,
                                    boxShadow: theme.shadows.medium,
                                    overflow: 'hidden',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    "&:hover": {
                                        transform: 'translateY(-5px)',
                                        boxShadow: theme.shadows.large,
                                    }
                                }}
                            >
                                <div style={{
                                    backgroundColor: colorScheme.bg,
                                    padding: '30px 20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minHeight: '180px',
                                    flex: 1,
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}>
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        marginBottom: '15px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                        padding: '10px',
                                        zIndex: 1,
                                    }}>
                                        <img
                                            src={getCategoryImage(category)}
                                            alt={category.title || category.name}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain',
                                            }}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = logo;
                                            }}
                                        />
                                    </div>
                                    <div style={{
                                        position: 'absolute',
                                        right: '-20px',
                                        bottom: '-20px',
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                    }}></div>
                                    <div style={{
                                        position: 'absolute',
                                        left: '-10px',
                                        top: '-10px',
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    }}></div>
                                    <h2 style={{
                                        fontSize: '22px',
                                        fontWeight: 'bold',
                                        color: colorScheme.text,
                                        marginBottom: '10px',
                                        textAlign: 'center',
                                        position: 'relative',
                                        zIndex: 1,
                                    }}>
                                        {category.title || category.name}
                                    </h2>
                                    {category.description && (
                                        <p style={{
                                            color: theme.colors.textSecondary,
                                            fontSize: '14px',
                                            textAlign: 'center',
                                            maxWidth: '240px',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            position: 'relative',
                                            zIndex: 1,
                                        }}>
                                            {category.description}
                                        </p>
                                    )}
                                </div>
                                <div style={{
                                    padding: '15px 20px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderTop: `1px solid ${theme.colors.border}`,
                                }}>
                                    <span style={{
                                        color: theme.colors.text,
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                    }}>
                                        View Products
                                    </span>
                                    <MdArrowForward size={20} style={{ color: theme.colors.primary }} />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AllCategories; 