import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useMediaQuery } from '@uidotdev/usehooks';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaTrash, FaPlus, FaMinus, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../../hooks/useCart';
import { useAlert } from '../../../context/AlertContext';
import logo from '../../../assets/daas-logo.svg';

// Styled Components
const CartContainer = styled.div`
  padding: ${({ isSmallDevice }) => (isSmallDevice ? '20px 15px' : '40px 20px')};
  background: ${({ theme }) => theme.colors.background};
  min-height: calc(100vh - 80px);
  max-width: 1400px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const CartTitle = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 30px;
  font-size: ${({ isSmallDevice }) => (isSmallDevice ? '28px' : '37px')};
  font-weight: 700;
  text-align: center;

  &:after {
    content: '';
    width: 100px;
    height: 5px;
    background: ${({ theme }) => theme.colors.primary};
    margin: 12px auto;
    border-radius: 3px;
    display: block;
  }
`;

const CartCard = styled.div`
  background: ${({ theme }) => theme.isDark ? '#2d2d2d' : '#ffffff'};
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  padding: ${({ isSmallDevice }) => (isSmallDevice ? '20px' : '30px')};
  margin-bottom: 30px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CartItemWrapper = styled.div`
  display: grid;
  grid-template-columns: ${({ isSmallDevice }) => (isSmallDevice ? '80px 1fr' : '120px 3fr 1fr 1fr 80px')};
  gap: 20px;
  padding: 15px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 80px 1fr;
    grid-template-rows: auto auto;
    padding-bottom: 30px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: ${({ isSmallDevice }) => (isSmallDevice ? '180' : '160px')};
  border-radius: 8px;
  object-fit: contain;
`;

const ProductInfo = styled.div`
  @media (max-width: 768px) {
    grid-column: 2 / -1;
    grid-row: 1 / 2;
  }
`;

const ProductTitle = styled.h3`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: ${({ isSmallDevice }) => (isSmallDevice ? 'flex-start' : 'center')};

  @media (max-width: 768px) {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }
`;

const QuantityButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.isDark ? '#444' : '#f3f4f6'};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }
`;

const QuantityLabel = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  min-width: 30px;
  text-align: center;
`;

const ItemTotal = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  text-align: ${({ isSmallDevice }) => (isSmallDevice ? 'left' : 'right')};
  margin-left: ${({ isSmallDevice }) => (isSmallDevice ? '40px' : '')};

  @media (max-width: 768px) {
    grid-column: 2 / -1;
    grid-row: 2 / 3;
  }
`;

const DeleteButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.colors.danger || '#ef4444'};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;

const CartSummary = styled.div`
  background: ${({ theme }) => theme.isDark ? '#2d2d2d' : '#ffffff'};
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  padding: 25px;
  position: sticky;
  top: 20px;
`;

const SummaryTitle = styled.h3`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 12px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const TotalRow = styled(SummaryRow)`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 15px;
  margin-top: 15px;
`;

const Button = styled.button`
  padding: 12px;
  background: ${({ theme, danger }) => (danger ? theme.colors.danger || '#ef4444' : theme.colors.primary)};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background: #d1d5db;
    cursor: not-allowed;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 60px 20px;
`;

const EmptyCartText = styled.p`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 25px;
`;

const ContinueShopping = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-size: 16px;

  &:hover {
    opacity: 0.9;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${({ isSmallDevice }) => (isSmallDevice ? 'column' : 'row')};
  gap: 30px;

  @media (min-width: 769px) {
    & > div:first-child { flex: 3; }
    & > div:last-child { flex: 1; }
  }
`;

const Cart = () => {
  const { theme } = useTheme();
  const isSmallDevice = useMediaQuery('only screen and (max-width: 768px)');
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal, loading } = useCart();
  const { showAlert } = useAlert();

  // Default theme
  const defaultTheme = {
    colors: {
      background: '#f9fafb',
      text: '#1f2a44',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      primary: '#3b82f6',
      danger: '#ef4444',
    },
    isDark: theme.isDark || false,
  };
  const mergedTheme = { ...defaultTheme, ...theme, colors: { ...defaultTheme.colors, ...(theme.colors || {}) } };

  // Calculate totals
  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const handleQuantityUpdate = (id, qty) => {
    if (qty < 1) return;
    updateQuantity(id, qty) && showAlert('Cart updated', 'success');
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id) && showAlert('Item removed', 'success');
  };

  const handleClearCart = () => {
    clearCart() && showAlert('Cart cleared', 'success');
  };

  if (loading) {
    return <CartContainer isSmallDevice={isSmallDevice} theme={mergedTheme}>
      <CartTitle isSmallDevice={isSmallDevice} theme={mergedTheme}>Loading...</CartTitle>
    </CartContainer>;
  }

  return (
    <CartContainer isSmallDevice={isSmallDevice} theme={mergedTheme}>
      <CartTitle isSmallDevice={isSmallDevice} theme={mergedTheme}>Your Cart</CartTitle>
      {cartItems.length === 0 ? (
        <CartCard isSmallDevice={isSmallDevice} theme={mergedTheme}>
          <EmptyCart>
            <FaShoppingCart size={48} color={mergedTheme.colors.textSecondary} />
            <EmptyCartText theme={mergedTheme}>Your cart is empty</EmptyCartText>
            <ContinueShopping to="/categories" theme={mergedTheme}>
              <FaArrowLeft size={16} /> Continue Shopping
            </ContinueShopping>
          </EmptyCart>
        </CartCard>
      ) : (
        <FlexContainer isSmallDevice={isSmallDevice}>
          <div>
            <CartCard isSmallDevice={isSmallDevice} theme={mergedTheme}>
              {cartItems.map((item) => (
                <CartItemWrapper key={item.id} isSmallDevice={isSmallDevice} theme={mergedTheme}>
                  <ProductImage
                    src={item.image || logo}
                    alt={item.title || 'Product'}
                    isSmallDevice={isSmallDevice}

                  />
                  <ProductInfo>
                    <ProductTitle theme={mergedTheme}>{item.title}</ProductTitle>
                    <ProductPrice theme={mergedTheme}>${(item.price || 0).toFixed(2)}</ProductPrice>
                  </ProductInfo>
                  <QuantityControl isSmallDevice={isSmallDevice}>
                    <QuantityButton onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)} theme={mergedTheme}>
                      <FaMinus size={14} />
                    </QuantityButton>
                    <QuantityLabel theme={mergedTheme}>{item.quantity}</QuantityLabel>
                    <QuantityButton onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)} theme={mergedTheme}>
                      <FaPlus size={14} />
                    </QuantityButton>
                  </QuantityControl>
                  <ItemTotal isSmallDevice={isSmallDevice} theme={mergedTheme}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </ItemTotal>
                  <DeleteButton onClick={() => handleRemoveItem(item.id)} theme={mergedTheme}>
                    <FaTrash size={16} />
                  </DeleteButton>
                </CartItemWrapper>
              ))}
              <ContinueShopping to="/categories" theme={mergedTheme}>
                <FaArrowLeft size={16} /> Continue Shopping
              </ContinueShopping>
            </CartCard>
          </div>
          <div>
            <CartSummary theme={mergedTheme}>
              <SummaryTitle theme={mergedTheme}>Order Summary</SummaryTitle>
              <SummaryRow>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </SummaryRow>
              <SummaryRow>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </SummaryRow>
              <SummaryRow>
                <span>Tax (5%)</span>
                <span>${tax.toFixed(2)}</span>
              </SummaryRow>
              <TotalRow>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </TotalRow>
              <Button theme={mergedTheme}>Proceed to Checkout</Button>
              <Button danger onClick={handleClearCart} theme={mergedTheme}>Clear Cart</Button>
            </CartSummary>
          </div>
        </FlexContainer>
      )}
    </CartContainer>
  );
};

export default Cart;