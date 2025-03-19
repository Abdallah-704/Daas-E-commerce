import styled from 'styled-components';

export const MainTitle = styled.h2`
    font-weight: bold;
    text-shadow: ${props => props.theme.isDark ? 'none' : '1px 1px 0px'};
    position: relative;
    margin-bottom: 70px;
    margin-top: 50px;
    color: ${props => props.theme?.colors?.text || '#333333'};
    text-transform: uppercase;
    font-size: 24px;
    width: 100%;
    &::before {
        content: "";
        position: absolute;
        width: 140px;
        height: 5px;
        border-radius: 10px;
        background-color: ${props => props.theme?.colors?.primary || '#007bff'};
        bottom: -20px;
        z-index: 1;
        animation: scaleAndGlow 2s infinite ease-in-out;
    }
    @keyframes scaleAndGlow {
        0% {
            width: 140px;
            box-shadow: 0 0 5px ${props => props.theme?.colors?.primary || '#007bff'}80;
        }
        50% {
            width: 160px;
            box-shadow: 0 0 15px ${props => props.theme?.colors?.primary || '#007bff'}CC;
        }
        100% {
            width: 140px;
            box-shadow: 0 0 5px ${props => props.theme?.colors?.primary || '#007bff'}80;
        }
    }
`;

export const Section = styled.div`
    width: 48%;
    background-color: ${props => props.theme?.colors?.background || '#f5f5f5'};
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px ${props => props.theme?.colors?.shadow || 'rgba(0,0,0,0.1)'};
    @media (max-width: 768px) {
        width: 100%;
        margin-bottom: 20px;
    }
`;

export const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-bottom: 20px;
`;

export const Button = styled.button`
    width: 100%;
    padding: 10px;
    border: none;
    background-color: ${props => props.theme?.colors?.primary || '#007bff'};
    color: ${props => props.theme?.isDark ? '#ffffff' : '#ffffff'};
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;
    text-transform: uppercase;
    transition: all 0.3s ease;
    &:hover {
        background-color: ${props => props.theme?.colors?.primaryDark || '#0056b3'};
        transform: translateY(-2px);
    }
`;

export const SectionWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
`;

export const Title = styled.h2`
    font-weight: bold;
    text-shadow: ${props => props.theme.isDark ? 'none' : '1px 1px 0px'};
    position: relative;
    margin-bottom: 50px;
    margin-top: 20px;
    color: ${props => props.theme?.colors?.text || '#333333'};
    text-transform: uppercase;
    font-size: 18px;
    &::before {
        content: "";
        position: absolute;
        width: 140px;
        height: 5px;
        border-radius: 10px;
        background-color: ${props => props.theme?.colors?.primary || '#007bff'};
        bottom: -20px;
        z-index: 1;
        animation: scaleAndGlow 2s infinite ease-in-out;
    }
    @keyframes scaleAndGlow {
        0% {
            width: 140px;
            box-shadow: 0 0 5px ${props => props.theme?.colors?.primary || '#007bff'}80;
        }
        50% {
            width: 160px;
            box-shadow: 0 0 15px ${props => props.theme?.colors?.primary || '#007bff'}CC;
        }
        100% {
            width: 140px;
            box-shadow: 0 0 5px ${props => props.theme?.colors?.primary || '#007bff'}80;
        }
    }
`;