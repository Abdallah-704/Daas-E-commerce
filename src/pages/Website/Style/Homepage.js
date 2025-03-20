import styled from "styled-components"

// Helper function to filter out custom props that shouldn't go to the DOM
const shouldForwardProp = (prop) => !['isSmallDevice', 'isMediumDevice', 'isValidService'].includes(prop);

export const StyledHome = styled.div.withConfig({
    shouldForwardProp
})`
overflow: hidden;
margin-bottom: 30px;
img{
    width: 100%;
    background-position: center;
    background-size: cover;
    object-fit: cover;
    height: ${({ isSmallDevice, isMediumDevice }) => (isSmallDevice ? "calc(100vh - 230px)" : isMediumDevice ? "calc(100vh - 106px)" : "calc(100vh - 106px)")};
    
}
`