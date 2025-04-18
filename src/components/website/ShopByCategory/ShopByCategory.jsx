import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { useMediaQuery } from '@uidotdev/usehooks';
import { Axios } from '../../../API/Axios';
import Loading from '../../../components/loading/Loading';
import { FiArrowRight } from 'react-icons/fi';
import logo from '../../../images/daas-logo.svg';
import { Container } from '../../../pages/Website/Style/Navbar';
import styled from 'styled-components';

// Animated title component matching other sections
const AnimatedTitle = styled.h2`
  font-weight: 500;
  text-shadow: ${(props) => (props.theme.isDark ? 'none' : '1px 1px 0px')};
  position: relative;
  margin-bottom: 70px;
  text-transform: capitalize;
  color: ${(props) => props.theme?.colors?.text || '#333333'};
  &::before {
    content: '';
    position: absolute;
    width: 140px;
    height: 5px;
    border-radius: 10px;
    background-color: ${(props) => props.theme?.colors?.primary || '#007bff'};
    bottom: -20px;
    left: 0;
    z-index: 1;
    animation: scaleAndGlow 2s infinite ease-in-out;
  }
  @keyframes scaleAndGlow {
    0% {
      width: 140px;
      box-shadow: 0 0 5px ${(props) => props.theme?.colors?.primary || '#007bff'}80;
    }
    50% {
      width: 160px;
      box-shadow: 0 0 15px ${(props) => props.theme?.colors?.primary || '#007bff'}CC;
    }
    100% {
      width: 140px;
      box-shadow: 0 0 5px ${(props) => props.theme?.colors?.primary || '#007bff'}80;
    }
  }
`;

const ShopByCategory = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isSmallDevice = useMediaQuery('only screen and (max-width: 768px)');
  const isMediumDevice = useMediaQuery(
    'only screen and (min-width: 769px) and (max-width: 992px)'
  );

  // Define the query function
  const fetchCategories = async () => {
    const { data } = await Axios.get('/categories');
    return Array.isArray(data) ? data.slice(-5, -1) : [];
  };

  // Use React Query
  const {
    data: categories = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['shopCategories'],
    queryFn: fetchCategories,
    initialData: () => [],
    onError: () => {
      console.error('Error fetching categories via React Query');
    },
  });

  // Fallback categories for error state
  const fallbackCategories = [
    {
      id: 1,
      title: 'Electronics',
      image: null,
      description: 'Error ullam maiores ipsum quis molestias ipsa suscipit quos.',
    },
    {
      id: 2,
      title: 'Clothing',
      image: null,
      description: 'Quas quasi facere quae sit ea.',
    },
    {
      id: 3,
      title: 'Home & Kitchen',
      image: null,
      description: 'Iure sit sed odio dolorum.',
    },
    {
      id: 4,
      title: 'Gaming',
      image: null,
      description: 'Explicabo rem culpa nostrum ut mollitia excepturi.',
    },
  ];

  // Helper function to get category image if available
  const getCategoryImage = (category) => {
    if (!category) return logo;
    if (category.image) return category.image;
    if (category.images) {
      // Use environment variable for API base URL
      return `${process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000'}${category.images}`;
    }
    return logo;
  };

  // Function to get a color based on category index
  const getCategoryColor = (index) => {
    const colors = [
      { bg: '#fef2ea', text: '#e67e22' }, // Peach
      { bg: '#e8f4fd', text: '#2196f3' }, // Light blue
      { bg: '#e8f5e9', text: '#4caf50' }, // Light green
      { bg: '#f6ecf8', text: '#9c27b0' }, // Light purple
    ];
    return colors[index % colors.length];
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.id}`);
  };

  // Commented out until needed
  /*
  const handleAddToCart = (e, category) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(`Added category ${category.title || category.name} to cart`);
    navigate(`/category/${category.id}`);
  };
  */

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <Container isSmallDevice={isSmallDevice} isMediumDevice={isMediumDevice}>
        <AnimatedTitle>shop by categories</AnimatedTitle>
        <p style={{ color: 'red', marginBottom: '20px' }}>
          Failed to load categories: {error?.message || 'Unknown error'}
        </p>
        {/* Render fallback categories */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isSmallDevice ? 'repeat(1, 1fr)' : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {fallbackCategories.map((category, index) => {
            const colorScheme = getCategoryColor(index);
            return (
              <div
                key={category.id}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onClick={() => handleCategoryClick(category)}
                onKeyDown={(e) => e.key === 'Enter' && handleCategoryClick(category)}
                role="button"
                tabIndex={0}
                aria-label={`View ${category.title || category.name} category`}
              >
                <div
                  style={{
                    backgroundColor: colorScheme.bg,
                    padding: '30px 20px 60px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    flex: 1,
                    marginBottom: '30px',
                  }}
                >
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      marginBottom: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
                      padding: '10px',
                    }}
                  >
                    <img
                      src={getCategoryImage(category)}
                      alt={`Image of ${category.title || category.name} category`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = logo;
                      }}
                    />
                  </div>

                  <h3
                    style={{
                      fontSize: '22px',
                      fontWeight: '600',
                      color: colorScheme.text,
                      margin: '0 0 16px 0',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {category.title || category.name}
                  </h3>

                  {category.description && (
                    <p
                      style={{
                        color: theme.colors.textSecondary,
                        fontSize: '14px',
                        lineHeight: '1.5',
                        position: 'relative',
                        zIndex: 1,
                        margin: '0',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '220px',
                      }}
                    >
                      {category.description}
                    </p>
                  )}
                </div>

                <div
                  style={{
                    padding: '15px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderTop: '1px solid #eee',
                  }}
                >
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: theme.colors.text,
                    }}
                  >
                    View Products
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FiArrowRight color={theme.colors.primary} size={16} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    );
  }

  return (
    <Container
      isSmallDevice={isSmallDevice}
      isMediumDevice={isMediumDevice}
      style={{
        marginTop: '30px',
      }}
    >
      <AnimatedTitle>shop by categories</AnimatedTitle>

      <p
        style={{
          color: theme.colors.textSecondary,
          fontSize: '16px',
          maxWidth: '800px',
          textAlign: 'left',
          marginBottom: '30px',
          marginTop: '-30px',
        }}
      >
        Browse our wide selection of categories to find exactly what you're looking for
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isSmallDevice ? 'repeat(1, 1fr)' : 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}
      >
        {categories.map((category, index) => {
          const colorScheme = getCategoryColor(index);
          return (
            <div
              key={category.id}
              style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
              onClick={() => handleCategoryClick(category)}
              onKeyDown={(e) => e.key === 'Enter' && handleCategoryClick(category)}
              role="button"
              tabIndex={0}
              aria-label={`View ${category.title || category.name} category`}
            >
              <div
                style={{
                  backgroundColor: colorScheme.bg,
                  padding: '30px 20px 60px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  flex: 1,
                  marginBottom: '30px',
                }}
              >
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
                    padding: '10px',
                  }}
                >
                  <img
                    src={getCategoryImage(category)}
                    alt={`Image of ${category.title || category.name} category`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = logo;
                    }}
                  />
                </div>

                <h3
                  style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    color: colorScheme.text,
                    margin: '0 0 16px 0',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {category.title || category.name}
                </h3>

                {category.description && (
                  <p
                    style={{
                      color: theme.colors.textSecondary,
                      fontSize: '14px',
                      lineHeight: '1.5',
                      position: 'relative',
                      zIndex: 1,
                      margin: '0',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '220px',
                    }}
                  >
                    {category.description}
                  </p>
                )}
              </div>

              <div
                style={{
                  padding: '15px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  borderTop: '1px solid #eee',
                }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: theme.colors.text,
                  }}
                >
                  View Products
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FiArrowRight color={theme.colors.primary} size={16} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default ShopByCategory;