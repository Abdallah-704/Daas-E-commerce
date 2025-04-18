import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Axios } from '../../../API/Axios';
import { api } from '../../../API/Api';
import Loading from '../../../components/loading/Loading';
import { Container } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';

// Keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

// Styled components
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px 0;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 15px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 270px;
  object-fit: contain;
  border-radius: 8px;
  &:hover {
    transform: scale(1.05);
  }
`;

const Badge = styled.span`
  background: ${(props) => props.bgColor || '#1f1f74'};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  position: absolute;
  top: ${(props) => props.top || '10px'};
  left: 10px;
  animation: ${pulse} 2s infinite;
  z-index: 100;
`;

const ProductTitle = styled.h3`
  font-size: 1.1rem;
  color: #1f1f74;
  margin: 20px 0;
  height: 40px;
  overflow: hidden;
  line-height: 2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  background: #f9f9f9;
  border-radius: 10px;
  text-align: center;
`;

const ProductPrice = styled.p`
  font-size: 20px;
  color: black;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  // Query function
  const fetchProducts = async ({ queryKey }) => {
    const [, { query }] = queryKey;
    const { data } = await Axios.get(`${api}/products`);

    let products = data;
    let title = query ? `Search Results for "${query}"` : 'All Products';

    if (query) {
      products = data.filter((p) => p.title?.toLowerCase().includes(query.toLowerCase()));
    }

    return { products, title };
  };

  // UseQuery
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['searchResults', { query }],
    queryFn: fetchProducts,
    enabled: true, // Always run query
    staleTime: 5 * 60 * 1000,
  });

  // Memoized products and title
  const products = useMemo(() => data?.products || [], [data]);
  const title = useMemo(() => data?.title || 'All Products', [data]);

  // Image helper
  const getProductImage = (product) =>
    product?.image || (product?.images?.length > 0 ? product.images[0]?.image : null) ;

  if (isLoading) return <Loading />;
  if (isError) return <div style={{ textAlign: 'center', color: '#dc3545' }}>{error?.message || 'Failed to fetch products'}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <Container>
        <h2 style={{ marginBottom: '20px', color: '#1f1f74', fontSize: '1.5rem' }}>{title}</h2>
        {products.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#666', marginTop: '30px' }}>No products found.</div>
        ) : (
          <ProductGrid>
            {products.map((product) => {
              if (!product.id) return null;
              const imageUrl = getProductImage(product);
              return (
                <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                  <ProductCard>
                    {product.discount > 0 && <Badge bgColor="#dc3545">{product.discount}% Off</Badge>}
                    {product.featured && <Badge top="40px">Featured</Badge>}
                    <ProductImage src={imageUrl} alt={product.title || 'Product'} />
                    <ProductTitle>{product.title || 'Untitled Product'}</ProductTitle>
                    <ProductPrice>${(Number(product.price) || 0).toFixed(2)}</ProductPrice>
                  </ProductCard>
                </Link>
              );
            })}
          </ProductGrid>
        )}
      </Container>
    </div>
  );
};

export default SearchResults;