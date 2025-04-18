import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import Product from './Product';
import styled from 'styled-components';
import { FaFilter } from 'react-icons/fa';
import { Axios } from '../../../API/Axios';
import { api_products } from '../../../API/Api';
import logo from '../../../assets/daas-logo.svg'; // Adjust path to your logo
import Loading from '../../../components/loading/Loading';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Controls = styled.div`
  display: flex;
  gap: 10px;
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const FilterButton = styled.button`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: 'center';
  gap: 6px;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const AllProducts = () => {
    const { theme } = useTheme();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('newest');
    const [filterBy, setFilterBy] = useState('all');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const yourApiResponse = await Axios.get(`/${api_products}`);
                const yourApiProducts = Array.isArray(yourApiResponse.data) ? yourApiResponse.data : [];

                const fakeStoreResponse = await Axios.get('https://fakestoreapi.com/products');
                const fakeStoreProducts = Array.isArray(fakeStoreResponse.data) ? fakeStoreResponse.data : [];


                // Normalize your API products
                const normalizedYourApiProducts = yourApiProducts.map(product => ({
                    id: product.id,
                    image: Array.isArray(product.images) && product.images.length > 0 ? product.images[0].image : null,
                    title: product.title || 'No Title',
                    description: product.description || 'No description',
                    price: Number(product.price) || 0,
                    rating: Number(product.rating) || 0,
                    category: product.category?.name || 'Uncategorized',
                    stock: product.stock,
                    source: 'your-api'
                }));

                // Normalize Fake Store API products, transform IDs to strings with prefix
                const normalizedFakeStoreProducts = fakeStoreProducts.map(product => ({
                    id: `fake-${product.id}`,
                    image: product.image || null,
                    title: product.title || 'No Title',
                    description: product.description || 'No description',
                    price: Number(product.price) || 0,
                    rating: Number(product.rating?.rate) || 0,
                    category: product.category || 'Uncategorized',
                    stock: 10, // Fake Store API doesn't provide stock, will be undefined
                    source: 'fake-store'
                }));


                // Combine both product lists
                const combinedProducts = [...normalizedYourApiProducts, ...normalizedFakeStoreProducts];

                setProducts(combinedProducts);
            } catch (err) {

                setError('Failed to load products. Please try again later.');
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const sortProducts = (products) =>
        [...products].sort((a, b) => {
            if (sortBy === 'price-low') return (Number(a.price) || 0) - (Number(b.price) || 0);
            if (sortBy === 'price-high') return (Number(b.price) || 0) - (Number(a.price) || 0);
            if (sortBy === 'rating') return (Number(b.rating) || 0) - (Number(a.rating) || 0);

            // For "newest" sorting, we want to prioritize your API products (lower IDs are newer)
            // For fake store products, we add 1000 to ensure they come after your API products
            const aIdForSort = typeof a.id === 'string' ? parseInt(a.id.replace('fake-', '')) + 1000 : a.id;
            const bIdForSort = typeof b.id === 'string' ? parseInt(b.id.replace('fake-', '')) + 1000 : b.id;
            return (bIdForSort || 0) - (aIdForSort || 0); // Use transformed IDs for sorting by "newest"
        });

    const filterProducts = (products) =>
        filterBy === 'all'
            ? products
            : products.filter((p) => p.category?.toLowerCase() === filterBy.toLowerCase());

    const getCategories = () =>
        ['all', ...new Set(products.map((p) => p.category).filter(Boolean))];

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <Container style={{ textAlign: 'center', padding: '50px', color: theme.colors.error }}>
                {error}
            </Container>
        );
    }

    const sortedAndFilteredProducts = sortProducts(filterProducts(products));

    return (
        <Container>
            <Header>
                <Title>All Products</Title>
                <Controls>
                    <FilterButton onClick={() => setFilterBy('all')}>
                        <FaFilter /> Filter
                    </FilterButton>
                    <Select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
                        {getCategories().map((cat) => (
                            <option key={cat} value={cat}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                        ))}
                    </Select>
                    <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="newest">Newest</option>
                        <option value="price-low">Price: Low</option>
                        <option value="price-high">Price: High</option>
                        <option value="rating">Highest Rated</option>
                    </Select>
                </Controls>
            </Header>
            <ProductGrid>
                {sortedAndFilteredProducts.map((product) => (
                    <Product
                        key={product.id}
                        id={product.id}
                        image={product.image ? product.image : logo}
                        title={product.title}
                        description={product.description}
                        price={product.price}
                        rating={product.rating}
                        category={product.category}
                        stock={product.stock || 10}
                    />
                ))}
            </ProductGrid>
        </Container>
    );
};

export default AllProducts;