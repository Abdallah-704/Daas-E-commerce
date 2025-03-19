import styled from 'styled-components';

export const Title = styled.h2`
    font-weight: bold;
    text-shadow: ${props => props.theme.isDark ? 'none' : '1px 1px 0px'};
    position: relative;
    margin-bottom: 70px;
    margin-top: 50px;
    color: ${props => props.theme?.colors?.text || '#333333'};
    opacity: 0.9;
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