import styled from "styled-components";
import { Link } from "react-router-dom";

// Main product card container
export const ProductCard = styled.div`
  overflow: hidden;
  padding: 0 0 10px 10px;
  border-radius: 10px;
  height: ${({ toprated, latestsale }) =>
    toprated || latestsale ? (toprated ? "450px" : "500px") : "auto"};
  display: flex;
  flex-direction: column;
  background-color: white;
  cursor: pointer;
  border: ${({ isSmallDevice }) => (isSmallDevice ? "1px solid #cccccc6c" : " ")};
`;

// Sale badge
export const SaleBadge = styled.span`
  /* Add styles for the sale badge if needed */
  background-color: red;
  color: white;
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 12px;
  margin-bottom: 5px;
`;

// Container for the product image
export const ImageContainer = styled.div`
  width: ${({ latest, isSmallDevice }) =>
    latest ? (isSmallDevice ? "120px" : "160px") : "160px"};
  height: 160px;
  background-color: white;
  text-align: center;
  margin: ${({ toprated }) => (toprated ? "0 auto" : "auto")};
  padding: 5px;
  border-radius: 5px;
`;

// Product image
export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

// Product title
export const Title = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-top: 7px;
`;

// Product description
export const Description = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
`;

// Product price
export const Price = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
`;

// Container for star rating
export const StarsContainer = styled.div`
  display: flex;
  font-size: 20px;
  margin-bottom: 10px;
`;

// Add to Cart button styled as a Link
export const AddToCartButton = styled(Link)`
  font-size: 15px;
  background-color: #FFD814;
  border-radius: 20px;
  padding: 5px 10px;
  color: black;
  text-decoration: none;
  cursor: pointer;
  width: fit-content;
`;

// Container for stars and Add to Cart button
export const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
`;