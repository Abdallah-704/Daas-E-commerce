import styled from "styled-components";

// Helper function to filter out custom props that shouldn't go to the DOM
const shouldForwardProp = (prop) => !['isSmallDevice', 'isMediumDevice', 'isValidService'].includes(prop);

export const Container = styled.div.withConfig({
  shouldForwardProp
})`
  margin:0 auto;
  padding: 0 ${({ isSmallDevice, isMediumDevice }) =>
    isSmallDevice ? "20px" : isMediumDevice ? "40px" : "60px"};
  transition: 0.3s all;
  a{
    text-decoration: none;
    color: ${props => props.theme?.colors?.text || '#333333'};
  }
  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    color: ${props => props.theme?.colors?.text || '#333333'};
  }

  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
  }
   .search {
    margin: ${({ isSmallDevice }) => (isSmallDevice ? "25px auto" : "")};
   }
    img {
      object-fit: contain;
      width: 55px;
    }
`;

export const Icons = styled.div.withConfig({
  shouldForwardProp
})`
  display: flex;
  gap: 15px;
  flex:1;
  align-items: center;
  justify-content: flex-end;
  
  a, div {
    margin-right: 5px;
    color: ${props => props.theme?.colors?.text || '#333333'};
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      color: ${props => props.theme?.colors?.primary || '#007bff'};
      transform: translateY(-2px);
    }
    
    &[data-tooltip]:hover::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: -25px;
      left: 50%;
      transform: translateX(-50%);
      background-color: ${props => props.theme?.colors?.cardBackground || '#ffffff'};
      color: ${props => props.theme?.colors?.text || '#333333'};
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      box-shadow: 0 2px 5px ${props => props.theme?.colors?.shadow || 'rgba(0,0,0,0.2)'};
      z-index: 10;
    }
  }
`;

export const AuthIcon = styled.div.withConfig({
  shouldForwardProp
})`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme?.colors?.text || '#333333'};
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme?.colors?.primary || '#007bff'};
    transform: translateY(-2px);
  }
  
  .tooltip {
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${props => props.theme?.colors?.cardBackground || '#ffffff'};
    color: ${props => props.theme?.colors?.text || '#333333'};
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    box-shadow: 0 2px 5px ${props => props.theme?.colors?.shadow || 'rgba(0,0,0,0.2)'};
    z-index: 10;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;
  }
  
  &:hover .tooltip {
    opacity: 1;
    visibility: visible;
  }
`;

export const SearchContainer = styled.div.withConfig({
  shouldForwardProp
})`
  position: relative;
  flex: 1;
  width: 100%;
  margin-right: 20px;
  display: block;
  input {
    width: 100%;
    padding: 10px 15px;
    border: 1px solid ${props => props.theme?.colors?.border || '#ccc'};
    border-radius: 10px;
    outline: none;
    background-color: ${props => props.theme?.colors?.background || '#ffffff'};
    color: ${props => props.theme?.colors?.text || '#333333'};
    &::placeholder {
      color: ${props => props.theme?.colors?.text || '#333333'}80;
    }
  }

  .icon-search {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: ${props => props.theme?.colors?.primary || '#007bff'};
    padding: 11px 15px;
    border-radius: 0 10px 10px 0;
    cursor: pointer;
    svg {
      color: ${props => props.theme?.isDark ? '#ffffff' : '#ffffff'};
      font-size: 18px;
    }
    &:hover {
      background-color: ${props => props.theme?.colors?.primaryDark || '#0056b3'};
    }
  }
`;