import { useEffect, useState, useMemo } from "react";
import { api, api_catagories } from "../../API/Api.js";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoPersonCircleOutline, IoSearchSharp } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { Container, Icons, SearchContainer } from "./Style/Navbar";
import { useMediaQuery } from "@uidotdev/usehooks";
import logo from "../../images/daas-logo.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MdFavoriteBorder } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../hooks/useCart";
import styled from "styled-components";

// Styled component for category links
const CategoryLink = styled(Link)`
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme?.colors?.background || "#f5f5f5"};
  color: ${(props) => props.theme?.colors?.text || "#333333"};
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${(props) => props.theme?.colors?.primary || "#007bff"};
    color: #ffffff;
  }
`;

// Styled component for the "Show all" link
const ShowAllLink = styled(Link)`
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme?.colors?.primary || "#007bff"};
  color: #ffffff;
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${(props) => props.theme?.colors?.primaryDark || "#0056b3"};
  }
`;

// Styled component for screen reader only text
const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const Navbar = () => {
  const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width: 769px) and (max-width: 992px)"
  );
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { getItemCount } = useCart();

  // Update cart count when it changes
  useEffect(() => {
    setCartCount(getItemCount());
  }, [getItemCount]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${api}/${api_catagories}`);
        if (response.data && response.data.length > 0) {
          setCategories(response.data.slice(-10, -1));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [user]);

  // Handle logout click
  const handleLogout = () => {
    logout();
  };

  // Handle login click
  const handleLogin = () => {
    navigate("/login");
  };

  const memoizedCategories = useMemo(() => categories, [categories]);

  return (
    <div style={{ overflow: "hidden", width: "100%", position: "relative", zIndex: 1000 }}>
      {/* Top Section of Navbar */}
      <div
        style={{
          backgroundColor: "#f5f5f5",
          paddingBottom: isSmallDevice ? "0" : "10px",
          position: "relative",
          zIndex: 1000,
        }}
      >
        <Container isSmallDevice={isSmallDevice}>
          <div className="container-fluid">
            <div className="row align-items-center pt-3">
              {/* Logo */}
              <div className="col-6 col-md-2 order-1">
                <Link to="/">
                  <img
                    src={logo}
                    alt="Website Logo"
                    loading="lazy"
                    className="img-fluid"
                    style={{
                      marginTop: "-15px",
                      marginBottom: "-15px",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </Link>
              </div>

              {/* Search Bar */}
              <div className="col-12 col-md-7 order-3 order-md-2 search">
                <SearchContainer>
                  <label htmlFor="search" style={{ display: "none" }}>
                    Search
                  </label>
                  <input
                    id="search"
                    type="search"
                    placeholder="Search products..."
                    aria-label="Search products"
                    className="w-100"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (searchTerm.trim()) {
                          navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
                          setSearchTerm("");
                        }
                      }
                    }}
                  />
                  <div
                    className="icon-search"
                    onClick={() => {
                      if (searchTerm.trim()) {
                        navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
                        setSearchTerm("");
                      }
                    }}
                    style={{ cursor: "pointer" }}
                    aria-label="Search now"
                  >
                    <IoSearchSharp />
                    <SrOnly>Search now</SrOnly>
                  </div>
                </SearchContainer>
              </div>

              {/* Icons */}
              <div className="col-6 col-md-3 order-2 order-md-3">
                <Icons>
                  <Link to="/cart" aria-label="Shopping cart">
                    <FiShoppingCart size={26} style={{ color: theme.colors.primary }} />
                    <SrOnly>Shopping cart</SrOnly>
                    {cartCount > 0 && (
                      <span
                        style={{
                          position: "absolute",
                          top: "-8px",
                          right: "-8px",
                          backgroundColor: theme.colors.error || "#ff4d4d",
                          color: "white",
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          fontSize: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {cartCount > 99 ? "99+" : cartCount}
                      </span>
                    )}
                  </Link>

                  {user && (
                    <>
                      <Link to="/profile" aria-label="User profile">
                        <IoPersonCircleOutline size={26} style={{ color: theme.colors.primary }} />
                        <SrOnly>User profile</SrOnly>
                      </Link>
                      <Link to="/favorites" aria-label="Favorites">
                        <MdFavoriteBorder size={26} style={{ color: theme.colors.primary }} />
                        <SrOnly>Favorites</SrOnly>
                      </Link>
                      <div onClick={handleLogout} style={{ cursor: "pointer" }} aria-label="Log out">
                        <FiLogOut size={26} style={{ color: theme.colors.primary }} />
                        <SrOnly>Log out</SrOnly>
                      </div>
                    </>
                  )}
                  {!user && (
                    <div onClick={handleLogin} style={{ cursor: "pointer" }} aria-label="Log in">
                      <FiLogIn size={26} style={{ color: theme.colors.text }} />
                      <SrOnly>Log in</SrOnly>
                    </div>
                  )}
                </Icons>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Categories Section */}
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          paddingLeft: "20px",
        }}
      >
        <Container isSmallDevice={isSmallDevice} isMediumDevice={isMediumDevice}>
          <div className="col-12">
            <div
              style={{
                padding: isSmallDevice ? "2px" : "5px",
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                overflowX: "auto",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
              }}
            >
              <ShowAllLink to="/categories">Show all</ShowAllLink>
              {loading ? (
                isSmallDevice ? (
                  [...Array(5)].map((_, index) => (
                    <Skeleton
                      key={index}
                      width={80}
                      height={20}
                      style={{ display: "inline-block" }}
                    />
                  ))
                ) : (
                  [...Array(10)].map((_, index) => (
                    <Skeleton
                      key={index}
                      width={80}
                      height={20}
                      style={{ display: "inline-block" }}
                    />
                  ))
                )
              ) : isSmallDevice ? (
                memoizedCategories.slice(0, 5).map((category) => (
                  <CategoryLink key={category.id} to={`/category/${category.id}`}>
                    {category.title}
                  </CategoryLink>
                ))
              ) : (
                memoizedCategories.map((category) => (
                  <CategoryLink key={category.id} to={`/category/${category.id}`}>
                    {category.title}
                  </CategoryLink>
                ))
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;