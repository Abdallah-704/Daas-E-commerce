import styled from "styled-components"

export const StyledHome = styled.div`
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