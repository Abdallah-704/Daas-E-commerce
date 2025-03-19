import { useEffect, useState, useMemo } from "react";
import { api, api_catagories } from "../../API/Api.js";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoPersonCircleOutline, IoSearchSharp } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { Container, Icons, SearchContainer } from "./Style/Navbar";
import { useMediaQuery } from "@uidotdev/usehooks";
import logo from "../../images/logo.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MdFavoriteBorder } from "react-icons/md";

const Navbar = () => {
  const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 992px)"
  );
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${api}/${api_catagories}`);
        setCategories(response.data.slice(-10, -4));
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // استخدام useMemo لمنع إعادة حساب التصنيفات عند كل رندر
  const memoizedCategories = useMemo(() => categories, [categories]);

  return (
    <>
      {/* القسم العلوي من الـ Navbar */}
      <div style={{
        backgroundColor: "white",
        paddingBottom: isSmallDevice ? "0" : "10px",
      }}>
        <Container isSmallDevice={isSmallDevice}>
          <div className="container-fluid">
            <div className="row align-items-center pt-3">
              {/* الشعار (Logo) */}
              <div className="col-6 col-md-2 order-1">
                <Link to="/">
                  <img
                    src={logo}
                    alt="Logo"
                    loading="lazy"
                    className="img-fluid"
                    style={{ marginTop: "-30px", marginBottom: "-30px" }}
                  />
                </Link>
              </div>

              {/* شريط البحث */}
              <div className="col-12 col-md-7 order-3 order-md-2 search">
                <SearchContainer>
                  <label htmlFor="search" style={{ display: "none" }}>Search</label>
                  <input id="search" type="search" placeholder="Search products..." aria-label="Search" className="w-100" />
                  <div className="icon-search">
                    <IoSearchSharp />
                  </div>
                </SearchContainer>
              </div>

              {/* أيقونات الحساب والعربة والمفضلة */}
              <div className="col-6 col-md-3 order-2 order-md-3">
                <Icons>
                  <Link to="/cart">
                    <FiShoppingCart size={26} />
                  </Link>
                  <Link to="/profile">
                    <IoPersonCircleOutline size={26} />
                  </Link>
                  <Link to="/favorite">
                    <MdFavoriteBorder size={26} />
                  </Link>
                </Icons>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* قسم التصنيفات */}
      <Container
        isSmallDevice={isSmallDevice}
        isMediumDevice={isMediumDevice}
        className="row"
        style={{
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}>
        <div className="col-12">
          <div style={{
            padding: isSmallDevice ? "2px" : "5px",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px"
          }}>
            <Link style={{
              color: "black"
            }} to="/categories" className="me-4">Show all</Link>
            {loading
              ? [...Array(10)].map((_, index) => (
                <Skeleton
                  key={index}
                  width={80}
                  height={20}
                  style={{ display: "inline-block" }}
                />
              ))
              : memoizedCategories.map((category) => (
                <Link
                  className="me-3 text-black"
                  style={{ padding: "0px" }}
                  key={category.id}
                  to={`/category/${category.id}`}
                >
                  {category.title}
                </Link>
              ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Navbar;
