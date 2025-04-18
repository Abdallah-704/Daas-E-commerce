import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { useMediaQuery } from "@uidotdev/usehooks";
import { Axios } from '../../../API/Axios';
import { api, api_catagories } from '../../../API/Api';
import { FiGrid, FiChevronRight, FiSearch } from 'react-icons/fi';
import Loading from '../../../components/loading/Loading';
import logo from '../../../images/daas-logo.svg';

const CategoryCard = ({ category, theme }) => {
    const getCategoryImage = (category) => {
        if (category.image) return category.image;
        if (category.thumbnail) return category.thumbnail;
        return logo;
    };

    const productCount = category.productCount || category.count || 0;

    return (
        <Link
            to={`/category/${category.id}`}
            className="transition-transform duration-200 hover:scale-105"
            style={{ textDecoration: 'none', display: 'block' }}
        >
            <div style={{
                backgroundColor: theme.colors.card,
                borderRadius: theme.borderRadius.medium,
                overflow: 'hidden',
                boxShadow: theme.shadows.small,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{
                    paddingTop: '60%',
                    position: 'relative',
                    backgroundColor: theme.colors.background
                }}>
                    <img
                        src={getCategoryImage(category)}
                        alt={category.name || category.title}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = logo;
                        }}
                    />
                </div>
                <div style={{
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1
                }}>
                    <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: theme.colors.text
                    }}>
                        {category.name || category.title}
                    </h3>

                    {category.description && (
                        <p style={{
                            fontSize: '14px',
                            color: theme.colors.textSecondary,
                            marginBottom: '10px',
                            flexGrow: 1
                        }}>
                            {category.description.length > 100
                                ? `${category.description.substring(0, 100)}...`
                                : category.description}
                        </p>
                    )}

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 'auto'
                    }}>
                        <span style={{
                            fontSize: '14px',
                            color: theme.colors.textSecondary
                        }}>
                            {productCount} {productCount === 1 ? 'Product' : 'Products'}
                        </span>
                        <FiChevronRight color={theme.colors.primary} />
                    </div>
                </div>
            </div>
        </Link>
    );
};

const CategoriesPage = () => {
    const { theme } = useTheme();
    const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await Axios.get(`${api}/${api_catagories}`);
                if (response.data && Array.isArray(response.data)) {
                    setCategories(response.data);
                    setFilteredCategories(response.data);
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (err) {
               
                setError('Failed to load categories. Please try again later.');

                // Fallback mock data
                const mockCategories = [
                    {
                        id: 1,
                        name: 'Electronics',
                        description: 'Latest electronic devices and gadgets',
                        productCount: 24
                    },
                    {
                        id: 2,
                        name: 'Clothing',
                        description: 'Fashion items for all ages and styles',
                        productCount: 42
                    },
                    {
                        id: 3,
                        name: 'Home & Kitchen',
                        description: 'Everything you need for your home',
                        productCount: 36
                    },
                    {
                        id: 4,
                        name: 'Books',
                        description: 'Wide selection of books across all genres',
                        productCount: 58
                    }
                ];

                setCategories(mockCategories);
                setFilteredCategories(mockCategories);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredCategories(categories);
        } else {
            const filtered = categories.filter(category =>
                (category.name || category.title || '')
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
            setFilteredCategories(filtered);
        }
    }, [searchTerm, categories]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
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

    return (
        <div style={{
            padding: isSmallDevice ? '15px' : '30px',
            backgroundColor: theme.colors.background,
            minHeight: 'calc(100vh - 80px)'
        }}>
            {/* Header */}
            <div style={{
                marginBottom: '30px',
                padding: '20px',
                backgroundColor: theme.colors.card,
                borderRadius: theme.borderRadius.large,
                boxShadow: theme.shadows.medium
            }}>
                <h1 style={{
                    fontSize: isSmallDevice ? '24px' : '32px',
                    color: theme.colors.text,
                    marginBottom: '15px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <FiGrid size={24} />
                    Browse Categories
                </h1>

                <div style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '500px'
                }}>
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        style={{
                            width: '100%',
                            padding: '12px 12px 12px 40px',
                            borderRadius: theme.borderRadius.small,
                            border: `1px solid ${theme.colors.border}`,
                            fontSize: '16px',
                            backgroundColor: theme.colors.background,
                            color: theme.colors.text
                        }}
                    />
                    <FiSearch
                        style={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: theme.colors.textSecondary
                        }}
                        size={20}
                    />
                </div>
            </div>

            {error && (
                <div style={{
                    padding: '15px',
                    marginBottom: '20px',
                    backgroundColor: `${theme.colors.error}20`,
                    color: theme.colors.error,
                    borderRadius: theme.borderRadius.small,
                    fontSize: '14px'
                }}>
                    {error}
                </div>
            )}

            {/* Categories Grid */}
            {filteredCategories.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '30px',
                    backgroundColor: theme.colors.card,
                    borderRadius: theme.borderRadius.medium
                }}>
                    <h3 style={{ color: theme.colors.text }}>No Categories Found</h3>
                    <p style={{ color: theme.colors.textSecondary }}>
                        Try using different search terms or browse all categories.
                    </p>
                    <button
                        onClick={() => setSearchTerm('')}
                        style={{
                            marginTop: '15px',
                            padding: '8px 16px',
                            backgroundColor: theme.colors.primary,
                            color: 'white',
                            border: 'none',
                            borderRadius: theme.borderRadius.small,
                            cursor: 'pointer'
                        }}
                    >
                        Show All Categories
                    </button>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isSmallDevice
                        ? 'repeat(1, 1fr)'
                        : 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '20px'
                }}>
                    {filteredCategories.map(category => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            theme={theme}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoriesPage; 