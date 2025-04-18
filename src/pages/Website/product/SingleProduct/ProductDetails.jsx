// ProductDetails.js
import React, { useState, useMemo } from 'react';
import { useTheme } from '../../../../context/ThemeContext';
import { MdStar, MdOutlineStarBorder, MdShoppingCart, MdFavorite, MdFavoriteBorder, MdZoomIn } from 'react-icons/md';
import { useMediaQuery } from '@uidotdev/usehooks';
import { useFavorites } from '../../../../hooks/useFavorites';
import LazyImage from '../../../../components/common/LazyImage';
import logo from '../../../../assets/daas-logo.svg';
import getStyles from './styles/DetailsStyle'; // Import styles

const ProductDetails = React.memo(
  ({
    title = 'Untitled Product',
    description = 'No description available',
    price = 0,
    rating = 0,
    stock = 0,
    category = 'Uncategorized',
    brand = 'Unknown Brand',
    discount = 0,
    onAddToCart = () => { },
    id,
    image,
  }) => {
    const { theme } = useTheme();
    const [quantity, setQuantity] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const isSmallDevice = useMediaQuery('(max-width: 768px)');
    const { addToFavoriteProducts, removeFromFavoriteProducts, isFavorite } = useFavorites();
    const isProductFavorite = id ? isFavorite(id) : false;

    // Get styles with theme and isSmallDevice
    const styles = getStyles(theme, isSmallDevice);

    const variants = useMemo(() => ({ sizes: ['S', 'M', 'L', 'XL'], colors: ['Red', 'Blue', 'Black', 'White'] }), []);
    const numeric = useMemo(
      () => ({
        price: Number(price) || 0,
        discount: Number(discount) || 0,
        rating: Number(rating) || 0,
        stock: Number(stock) || 0,
      }),
      [price, discount, rating, stock]
    );

    const discountPercentage = numeric.discount ? Math.round((numeric.discount / numeric.price) * 100) : 0;
    const discountedPrice = numeric.price - numeric.discount;
    const filledStars = Math.floor(numeric.rating);
    const stockStatus = numeric.stock === 0 ? 'Out of Stock' : numeric.stock <= 5 ? `Only ${numeric.stock} left!` : 'In Stock';

    const updateQuantity = (change) => setQuantity((prev) => Math.max(1, Math.min(numeric.stock, prev + change)));
    const toggleFavorite = () => (isProductFavorite ? removeFromFavoriteProducts(id) : addToFavoriteProducts({ id, title, price: numeric.price, image, description, category }));
    const handleAddToCart = () => onAddToCart(quantity);

    if (!id) return <div style={{ color: theme.colors.error }}>Error: Product ID missing</div>;

    return (
      <div style={styles.cardStyle}>
        <div style={styles.topBarStyle} />

        {/* Product Image */}
        <div onClick={() => setShowModal(true)} style={styles.imageContainerStyle}>
          <LazyImage src={!image ? logo : image} alt={title} style={styles.imageStyle} onErrorImg={logo} />
        </div>

        {/* Header */}
        <div style={styles.headerStyle}>
          <h1 style={styles.titleStyle}>{title}</h1>
          <button onClick={toggleFavorite} style={styles.favoriteButtonStyle}>
            {isProductFavorite ? <MdFavorite size={24} color={theme.colors.error} /> : <MdFavoriteBorder size={24} color={theme.colors.text} />}
          </button>
        </div>

        {/* Rating */}
        <div style={styles.ratingStyle}>
          {Array(filledStars).fill().map((_, i) => <MdStar key={`star-filled-${i}`} size={18} color="#FFD700" />)}
          {Array(5 - filledStars).fill().map((_, i) => <MdOutlineStarBorder key={`star-empty-${i}`} size={18} color="#FFD700" />)}
          <span style={styles.ratingTextStyle}>({numeric.rating.toFixed(1)})</span>
        </div>

        {/* Price */}
        <div style={styles.priceContainerStyle}>
          {numeric.discount > 0 ? (
            <div style={styles.flexStyle}>
              <span style={styles.discountedPriceStyle}>${discountedPrice.toFixed(2)}</span>
              <span style={styles.originalPriceStyle}>${numeric.price.toFixed(2)}</span>
              <span style={styles.discountBadgeStyle}>{discountPercentage}% OFF</span>
            </div>
          ) : (
            <span style={styles.priceStyle}>${numeric.price.toFixed(2)}</span>
          )}
        </div>

        {/* Description */}
        <p style={styles.descriptionStyle}>{description}</p>

        {/* Variants */}
        <div style={styles.variantsContainerStyle}>
          {['Size', 'Color'].map((type, idx) => (
            <div key={type} style={styles.variantStyle}>
              <label style={styles.labelStyle}>{type}</label>
              <select
                value={idx === 0 ? selectedSize : selectedColor}
                onChange={(e) => (idx === 0 ? setSelectedSize : setSelectedColor)(e.target.value)}
                style={styles.selectStyle}
              >
                <option value="">Select {type}</option>
                {(idx === 0 ? variants.sizes : variants.colors).map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
          ))}
        </div>

        {/* Details */}
        <div style={styles.detailsContainerStyle}>
          {[{ label: 'Category', value: category }, { label: 'Brand', value: brand }, { label: 'Stock', value: stockStatus }].map(({ label, value }) => (
            <div key={label} style={styles.detailStyle}>
              <span style={styles.detailLabelStyle}>{label}</span>
              <span style={styles.detailValueStyle}>{value}</span>
            </div>
          ))}
        </div>

        {/* Quantity Selector */}
        {numeric.stock > 0 && (
          <div style={styles.quantityContainerStyle}>
            <span style={styles.quantityLabelStyle}>Quantity:</span>
            <div style={styles.quantityControlsStyle}>
              <button onClick={() => updateQuantity(-1)} disabled={quantity <= 1} style={styles.quantityButtonStyle(quantity <= 1)}>-</button>
              <span style={styles.quantityValueStyle}>{quantity}</span>
              <button onClick={() => updateQuantity(1)} disabled={quantity >= numeric.stock} style={styles.quantityButtonStyle(quantity >= numeric.stock)}>+</button>
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <button onClick={handleAddToCart} disabled={numeric.stock === 0 || !selectedSize || !selectedColor} style={numeric.stock === 0 || !selectedSize || !selectedColor ? styles.disabledButtonStyle : styles.buttonStyle}>
          <MdShoppingCart size={18} />
          {numeric.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>

        {/* Quick View Modal */}
        {showModal && (
          <>
            <div style={styles.overlayStyle} onClick={() => setShowModal(false)} />
            <div style={styles.modalStyle}>
              <button onClick={() => setShowModal(false)} style={styles.modalCloseButtonStyle}>
                <MdZoomIn size={24} color={theme.colors.text} style={styles.modalCloseIconStyle} />
              </button>
              <LazyImage src={!image ? logo : image} alt={title} style={styles.modalImageStyle} onErrorImg={logo} />
              <h2 style={styles.modalTitleStyle}>{title}</h2>
              <div style={styles.ratingStyle}>
                {Array(filledStars).fill().map((_, i) => <MdStar key={`modal-star-filled-${i}`} size={18} color="#FFD700" />)}
                {Array(5 - filledStars).fill().map((_, i) => <MdOutlineStarBorder key={`modal-star-empty-${i}`} size={18} color="#FFD700" />)}
                <span style={styles.ratingTextStyle}>({numeric.rating.toFixed(1)})</span>
              </div>
              <span style={numeric.discount ? styles.discountedPriceStyle : styles.priceStyle}>${numeric.discount ? discountedPrice.toFixed(2) : numeric.price.toFixed(2)}</span>
              {numeric.discount > 0 && <span style={styles.originalPriceStyle}>${numeric.price.toFixed(2)}</span>}
            </div>
          </>
        )}
      </div>
    );
  }
);

export default ProductDetails;