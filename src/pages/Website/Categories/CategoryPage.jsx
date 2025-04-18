import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { useMediaQuery } from "@uidotdev/usehooks";
import { Axios } from '../../../API/Axios';
import { FiShoppingCart } from 'react-icons/fi';
import Loading from '../../../components/loading/Loading';
import logo from '../../../images/daas-logo.svg';
import { api, api_products } from '../../../API/Api';

const CategoryPage = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      setLoading(true);
      try {
    
        // Fetch products related to the category ID
        const response = await Axios.get(`${api}/${api_products}`);
        const allProducts = response.data;
        const categoryProducts = allProducts.filter((product) => product.category === parseInt(id));
        setProducts(categoryProducts);
      } catch (err) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryAndProducts();
  }, [id]);

  const getProductImage = (product) => product?.image || (product?.images?.[0]) || logo;

  if (loading) return (
    <div style={{ minHeight: 'calc(100vh - 200px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Loading />
    </div>
  );

  return (
    <div style={{ padding: isSmallDevice ? '15px' : '30px', backgroundColor: theme.colors.background, minHeight: 'calc(100vh - 80px)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: isSmallDevice ? '1fr' : 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', backgroundColor: theme.colors.card, borderRadius: theme.borderRadius.medium }}>
            <h3 style={{ color: theme.colors.text }}>No Products Found</h3>
          </div>
        ) : (
          products.map((product) => (
            <div key={product.id} style={{ backgroundColor: theme.colors.card, borderRadius: theme.borderRadius.medium, boxShadow: theme.shadows.small, overflow: 'hidden' }}>
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ width: '100%', paddingTop: '75%', position: 'relative', backgroundColor: theme.colors.background }}>
                  <img
                    src={getProductImage(product)}
                    alt={product.title}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}
                    onError={(e) => { e.target.src = logo; }}
                  />
                </div>
                <div style={{ padding: '12px' }}>
                  <h3 style={{
                    fontSize: '16px',
                    color: theme.colors.text,
                    height: '40px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {product.title}
                  </h3>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: theme.colors.text }}>
                    ${Number(product.price).toFixed(2)}
                  </span>
                </div>
              </Link>
              <div style={{ display: 'flex', borderTop: `1px solid ${theme.colors.border}` }}>
                <Link
                  to={`/product/${product.id}`}
                  style={{
                    flex: 1,
                    padding: '10px',
                    textAlign: 'center',
                    backgroundColor: theme.colors.primary,
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px'
                  }}
                >
                  <FiShoppingCart size={16} /> View
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPage;