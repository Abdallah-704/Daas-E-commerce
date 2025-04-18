import React, { useState } from 'react';
import { useFavorites } from '../../../hooks/useFavorites';
import { useTheme } from '../../../context/ThemeContext';
import { useMediaQuery } from '@uidotdev/usehooks';
import { Link } from 'react-router-dom';
import { Container } from '../../../../src/pages/Website/Style/Navbar';

const FavoritesPage = () => {
  const { favoriteProducts, loading, removeFromFavoriteProducts } = useFavorites();
  const { theme } = useTheme();
  const isSmallDevice = useMediaQuery('(max-width: 768px)');
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-coral-50">
        <div
          style={{
            fontSize: isSmallDevice ? '1.5rem' : '2rem',
            fontWeight: '700',
            color: theme.colors.text || '#4B5563',
            animation: 'pulse 1.5s infinite',
          }}
        >
          Loading Your Favorites...
        </div>
      </div>
    );
  }

  return (
    <Container
      style={{
        padding: isSmallDevice ? '1rem' : '2rem',
        background: `linear-gradient(135deg, ${theme.colors.background || '#EDF2FF'} 0%, #FFE9E6 100%)`,
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <h1
        style={{
          fontSize: isSmallDevice ? '2rem' : '3.5rem',
          fontWeight: '800',
          marginBottom: '2.5rem',
          textAlign: 'center',
          color: theme.colors.text || '#1F2937',
          background: `linear-gradient(to right, ${theme.colors.primary || '#6366F1'}, ${
            theme.colors.secondary || '#F43F5E'
          })`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'fadeInDown 1s ease-out',
        }}
      >
        Your Favorites
      </h1>

      {!favoriteProducts.length ? (
        <div
          style={{
            background: theme.colors.card || '#FFFFFF',
            borderRadius: '1.5rem',
            padding: isSmallDevice ? '1.5rem' : '2rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            maxWidth: '600px',
            margin: '2rem auto',
            textAlign: 'center',
            color: theme.colors.text || '#6B7280',
            fontSize: isSmallDevice ? '1.25rem' : '1.5rem',
            fontWeight: '500',
            animation: 'fadeInUp 0.8s ease-out',
          }}
        >
          <p>Nothing here yet! Add some favorites to brighten your day! ✨</p>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: isSmallDevice ? 'column' : 'row',
            overflowX: isSmallDevice ? 'hidden' : 'auto',
            gap: isSmallDevice ? '1rem' : '1.5rem',
            padding: '1rem',
            alignItems: isSmallDevice ? 'center' : 'flex-start',
          }}
        >
          {favoriteProducts.map(({ id, image, title, price }, index) => (
            <Link
              to={`/product/${id}`}
              key={id}
              style={{
                textDecoration: 'none',
                cursor: 'pointer',
                width: isSmallDevice ? '100%' : '280px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '380px',
                  flexShrink: 0,
                  perspective: '1000px',
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transition: 'transform 0.6s, box-shadow 0.3s',
                    transformStyle: 'preserve-3d',
                    borderRadius: '1.5rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    transform: flippedCards[id] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                  className="group"
                  onClick={(e) => {
                    if (!e.target.closest('button')) {
                      toggleFlip(id);
                    }
                  }}
                >
                  {/* Front Side */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      background: theme.colors.card || '#FFFFFF',
                      borderRadius: '1.5rem',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s',
                    }}
                    className="group-hover:shadow-xl group-hover:-translate-y-1"
                  >
                    <div
                      style={{
                        position: 'relative',
                        height: '65%',
                        overflow: 'hidden',
                      }}
                    >
                      {image && (
                        <img
                          src={image}
                          alt={`Image of ${title}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            transition: 'transform 0.3s',
                            padding:"15px"
                          }}
                          className="group-hover:scale-110"
                        />
                      )}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '0',
                          width: '100%',
                          height: '30%',
                          background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        padding: '1rem',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.5rem',
                        }}
                      >
                        <div style={{ maxWidth: '60%' }}>
                          <h3
                            style={{
                              fontSize: isSmallDevice ? '1rem' : '1.2rem',
                              fontWeight: '700',
                              color: theme.colors.text || '#1F2937',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {title}
                          </h3>
                          <p
                            style={{
                              fontSize: isSmallDevice ? '1.25rem' : '1.5rem',
                              fontWeight: '600',
                              color: theme.colors.primary || '#6366F1',
                            }}
                          >
                            ${price.toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            removeFromFavoriteProducts(id);
                          }}
                          style={{
                            padding: isSmallDevice ? '0.4rem 0.8rem' : '0.5rem 1rem',
                            background: theme.colors.error || '#F43F5E',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '0.5rem',
                            fontSize: isSmallDevice ? '0.8rem' : '0.9rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'transform 0.2s, background 0.2s',
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.background = theme.colors.errorDark || '#E11D48';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.background = theme.colors.error || '#F43F5E';
                          }}
                          aria-label={`Remove ${title} from favorites`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Back Side */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      background: `linear-gradient(135deg, ${
                        theme.colors.primary || '#6366F1'
                      } 0%, ${theme.colors.secondary || '#F43F5E'} 100%)`,
                      borderRadius: '1.5rem',
                      transform: 'rotateY(180deg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '1rem',
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        removeFromFavoriteProducts(id);
                      }}
                      style={{
                        width: '100%',
                        padding: isSmallDevice ? '0.75rem' : '1rem',
                        background: 'rgba(255,255,255,0.95)',
                        color: theme.colors.error || '#F43F5E',
                        border: 'none',
                        borderRadius: '0.75rem',
                        fontWeight: '600',
                        fontSize: isSmallDevice ? '0.9rem' : '1rem',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, background 0.2s',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      aria-label={`Remove ${title} from favorites`}
                    >
                      Remove from Favorites
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </Container>
  );
};

export default FavoritesPage;