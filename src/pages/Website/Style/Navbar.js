import styled from "styled-components";
export const Container = styled.div`
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

export const Icons = styled.div`
  display: flex;
  gap: 12px;
  flex:1;
  align-items: center;
  justify-content: flex-end;
  a{
    margin-right:10px;
    color: ${props => props.theme?.colors?.text || '#333333'};
    transition: color 0.3s ease;
    &:hover {
      color: ${props => props.theme?.colors?.primary || '#007bff'};
    }
  }
`;

export const SearchContainer = styled.div`
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