import styled from "styled-components";

// Helper function to filter out custom props
const shouldForwardProp = (prop) =>
  !["isSmallDevice", "isMediumDevice", "isValidService"].includes(prop);

export const Container = styled.div.withConfig({
  shouldForwardProp,
})`
  max-width: 100%;
  box-sizing: border-box;
  padding: 0 ${(props) => (props.isSmallDevice ? "10px" : "60px")};
  transition: 0.3s all;

  .container-fluid {
    padding-left: 0;
    padding-right: 0;
  }

  .row {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme?.colors?.text || "#333333"};
  }

  .search {
    margin: ${({ isSmallDevice }) => (isSmallDevice ? "25px auto" : "")};
  }

  img {
    object-fit: contain;
    width: 85px;
    height: auto;
  }
`;

export const Icons = styled.div.withConfig({
  shouldForwardProp,
})`
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: flex-end;

  a, div {
    margin-right: 5px;
    color: ${(props) => props.theme?.colors?.text || "#333333"};
    transition: all 0.3s ease;
    display: flex;
    alignItems: center;
    justify-content: center;

    &:hover {
      color: ${(props) => props.theme?.colors?.primary || "#007bff"};
      transform: scale(1.1);
    }

    &[data-tooltip]:hover::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: -30px;
      left: 50%;
      transform: translateX(-50%);
      background-color: ${(props) => props.theme?.colors?.cardBackground || "#ffffff"};
      color: ${(props) => props.theme?.colors?.text || "#333333"};
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      box-shadow: 0 2px 5px ${(props) => props.theme?.colors?.shadow || "rgba(0,0,0,0.2)"};
      z-index: 10;
    }
  }
`;

export const SearchContainer = styled.div.withConfig({
  shouldForwardProp,
})`
  position: relative;
  flex: 1;
  width: 100%;
  margin-right: 20px;
  display: block;

  input {
    width: 100%;
    padding: 10px 15px;
    border: 1px solid ${(props) => props.theme?.colors?.border || "#ccc"};
    border-radius: 10px;
    outline: none;
    background-color: ${(props) => props.theme?.colors?.background || "#ffffff"};
    color: ${(props) => props.theme?.colors?.text || "#333333"};
    transition: all 0.3s ease;

    &::placeholder {
      color: ${(props) => props.theme?.colors?.text || "#333333"}80;
    }

    &:focus {
      border-color: ${(props) => props.theme?.colors?.primary || "#007bff"};
      box-shadow: 0 0 5px ${(props) => props.theme?.colors?.primary || "#007bff"};
    }
  }

  .icon-search {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: ${(props) => props.theme?.colors?.primary || "#007bff"};
    padding: 11px 15px;
    border-radius: 0 10px 10px 0;
    cursor: pointer;
    transition: background-color 0.3s ease;

    svg {
      color: #ffffff;
      font-size: 18px;
    }

    &:hover {
      background-color: ${(props) => props.theme?.colors?.primaryDark || "#0056b3"};
    }
  }
`;