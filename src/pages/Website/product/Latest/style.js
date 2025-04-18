import styled from 'styled-components';

// Helper function to filter out custom props
const shouldForwardProp = (prop) => !['isSmallDevice', 'isMediumDevice', 'isValidService'].includes(prop);

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
    
    @media (max-width: 992px) {
        font-size: 22px;
        margin-bottom: 50px;
        margin-top: 40px;
        &::before {
            width: 120px;
        }
    }
    
    @media (max-width: 768px) {
        font-size: 20px;
        margin-bottom: 40px;
        margin-top: 30px;
        &::before {
            width: 100px;
            bottom: -15px;
        }
        @keyframes scaleAndGlow {
            0% {
                width: 100px;
                box-shadow: 0 0 5px ${props => props.theme?.colors?.primary || '#007bff'}80;
            }
            50% {
                width: 120px;
                box-shadow: 0 0 15px ${props => props.theme?.colors?.primary || '#007bff'}CC;
            }
            100% {
                width: 100px;
                box-shadow: 0 0 5px ${props => props.theme?.colors?.primary || '#007bff'}80;
            }
        }
    }
`;

export const Section = styled.div.withConfig({
    shouldForwardProp
})`
    background-color: ${props => props.theme?.colors?.background || '#f5f5f5'};
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px ${props => props.theme?.colors?.shadow || 'rgba(0,0,0,0.1)'};
    display: flex;
    flex-direction: column;
    width: 48%;
    
    a {
        height: 100%;
    }
    
    @media (min-width: 1200px) {
        width: 48%;
        padding: 25px;
    }
    
    @media (max-width: 992px) {
        width: 48%;
        padding: 15px;
    }
    
    @media (max-width: 768px) {
        width: 100%;
        padding: 15px;
        margin-bottom: 20px;
    }
    
    @media (max-width: 480px) {
        padding: 10px;
    }
`;

export const ProductGrid = styled.div.withConfig({
    shouldForwardProp
})`
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Default for large devices */
    grid-auto-rows: 1fr;
    gap: 20px;
    margin-bottom: 20px;
    flex: 1;
    width: 100%;
    
    a {
        height: 100%;
    }
    
    > div {
        height: 100%;
        min-height: 250px;
    }
    
    @media (min-width: 1200px) {
        gap: 25px;
        > div {
            min-height: 280px;
        }
    }
    
    @media (max-width: 992px) {
        grid-template-columns: repeat(1, 1fr); /* Single column on medium devices */
        gap: 15px;
        > div {
            min-height: 220px;
        }
    }
    
    @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
        gap: 15px;
        > div {
            min-height: 200px;
        }
    }
    
    @media (max-width: 480px) {
        gap: 10px;
        > div {
            min-height: 180px;
        }
    }
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
    
    @media (max-width: 992px) {
        padding: 9px;
        font-size: 15px;
    }
    
    @media (max-width: 768px) {
        padding: 8px;
        font-size: 14px;
    }
    
    @media (max-width: 480px) {
        padding: 7px;
        font-size: 13px;
    }
`;

export const SectionWrapper = styled.div.withConfig({
    shouldForwardProp
})`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
    
    a {
        height: 100%;
    }
    
    @media (min-width: 1200px) {
        gap: 25px;
    }
    
    @media (max-width: 992px) {
        gap: 15px;
    }
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 30px;
    }
    
    @media (max-width: 480px) {
        gap: 20px;
    }
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
    
    @media (max-width: 992px) {
        font-size: 16px;
        margin-bottom: 40px;
        &::before {
            width: 120px;
        }
    }
    
    @media (max-width: 768px) {
        font-size: 16px;
        margin-bottom: 35px;
        &::before {
            width: 100px;
            bottom: -15px;
        }
        @keyframes scaleAndGlow {
            0% {
                width: 100px;
                box-shadow: 0 0 5px ${props => props.theme?.colors?.primary || '#007bff'}80;
            }
            50% {
                width: 120px;
                box-shadow: 0 0 15px ${props => props.theme?.colors?.primary || '#007bff'}CC;
            }
            100% {
                width: 100px;
                box-shadow: 0 0 5px ${props => props.theme?.colors?.primary || '#007bff'}80;
            }
        }
    }
    
    @media (max-width: 480px) {
        font-size: 14px;
        margin-bottom: 30px;
        &::before {
            width: 80px;
            bottom: -10px;
        }
        @keyframes scaleAndGlow {
            0% {
                width: 80px;
                box-shadow: 0 0 5px ${props => props.theme?.colors?.primary || '#007bff'}80;
            }
            50% {
                width: 100px;
                box-shadow: 0 0 15px ${props => props.theme?.colors?.primary || '#007bff'}CC;
            }
            100% {
                width: 80px;
                box-shadow: 0 0 5px ${props => props.theme?.colors?.primary || '#007bff'}80;
            }
        }
    }
`;