import styled from "styled-components";

// Helper function to filter out custom props that shouldn't go to the DOM
const shouldForwardProp = (prop) => !['isSmallDevice', 'isMediumDevice', 'isValidService'].includes(prop);

export const Background = styled.div.withConfig({
  shouldForwardProp
})`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #1f1f74;
  overflow: hidden;

  .ani span {
    width: 17vmin;
    height: 17vmin;
    border-radius: 17vmin;
    backface-visibility: hidden;
    position: absolute;
    animation: move infinite linear;
  }

  @keyframes move {
    100% {
      transform: translate3d(0, 0, 1px) rotate(360deg);
    }
  }

  .ani span:nth-child(0) {
    color: #33cccc;
    top: 83%;
    left: 16%;
    animation-duration: 87s;
    animation-delay: -187s;
    transform-origin: -5vw -22vh;
    box-shadow: -34vmin 0 4.5vmin currentColor;
  }

  .ani span:nth-child(1) {
    color: #33cccc;
    top: 7%;
    left: 88%;
    animation-duration: 24s;
    animation-delay: -29s;
    transform-origin: -22vw -3vh;
    box-shadow: -34vmin 0 4.8vmin currentColor;
  }

  .ani span:nth-child(2) {
    color: #33cccc;
    top: 76%;
    left: 9%;
    animation-duration: 314s;
    animation-delay: -297s;
    transform-origin: 25vw -21vh;
    box-shadow: 34vmin 0 4.6vmin currentColor;
  }

  .ani span:nth-child(3) {
    color: #33cccc;
    top: 13%;
    left: 67%;
    animation-duration: 295s;
    animation-delay: -265s;
    transform-origin: 3vw 4vh;
    box-shadow: 34vmin 0 4.8vmin currentColor;
  }

  .ani span:nth-child(4) {
    color: #33cccc;
    top: 24%;
    left: 21%;
    animation-duration: 133s;
    animation-delay: -127s;
    transform-origin: 19vw 1vh;
    box-shadow: -34vmin 0 5.2vmin currentColor;
  }

  .ani span:nth-child(5) {
    color: #33cccc;
    top: 49%;
    left: 82%;
    animation-duration: 74s;
    animation-delay: -32s;
    transform-origin: 23vw 7vh;
    box-shadow: 34vmin 0 4.3vmin currentColor;
  }

  .ani span:nth-child(6) {
    color: #33cccc;
    top: 91%;
    left: 40%;
    animation-duration: 100s;
    animation-delay: -37s;
    transform-origin: 4vw -22vh;
    box-shadow: -34vmin 0 4.5vmin currentColor;
  }

  .ani span:nth-child(7) {
    color: #33cccc;
    top: 75%;
    left: 3%;
    animation-duration: 120s;
    animation-delay: -213s;
    transform-origin: 2vw -14vh;
    box-shadow: 34vmin 0 5.2vmin currentColor;
  }
`;

export const StyledCotnaienr = styled.div.withConfig({
  shouldForwardProp
})`
    padding: 0px 20px 0px 20px;
    margin: 0 auto 0 auto;
`;

export const StyledRegister = styled.div.withConfig({
  shouldForwardProp
})`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    margin: auto;

    h1 {
        color: black;
        text-shadow: 1px 3px 5px rgba(0, 0, 0, 0.341);
        font-weight: bold;
        font-size: 25px;
        margin-bottom: 35px;
    }

    input::placeholder {
        color: gray;
        opacity: 0.5;
    }

    input:focus {
        outline: none;
        border: none;
    }

    /* input:invalid {
        border-bottom: 3px solid rgba(255, 0, 0, 0.491); /* Red for invalid */
    /* } */


input:focus + label,
input:not(:placeholder-shown) + label {
    top: -33px;
    opacity: 1;
    margin-top: 8px;
    transition: all 0.3s ease;
}

input:placeholder-shown + label {
    top: 18px;
    opacity: 0;
    transition: all 0.3s ease;
}

label {
    position: absolute;
    left: 0px;
    top: 18px; /* Default position when input is empty */
    font-weight: bold;
    color: rgba(128, 128, 128, 0.555);
    transition: all 0.3s ease; /* Smooth transition */
}

    
    .btn_1 {
        color: white;
        border-radius: 4px;
        margin: auto; /* Centers button horizontally */
        background-color:#1f1f74; /* Button color */
        border: none;
        cursor: pointer;
        font-size: 18px;
        padding: 5px;
        width: 100%;
    }
    
    .google-btn {
        padding: 5px;
        width: 100%;
        cursor: pointer;
        background-color: #1f1f74; /* Google blue */
        text-decoration: none;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 8px;
        border-radius: 4px;
    }
    
    .google-btn p {
        margin: 0;
        padding: 0;
    }
    
    .google-btn a {
        margin: 0;
        color: white;
        padding: 0;
        width: 100%;
        text-decoration: none;
      
    }
    
    .error {
      display: block;
      text-align: start;
        font-size: 12px;
        color: red;
        padding: 0;
        margin-top: 5px;
        margin-bottom: -5px;
    }
`;

export const StyledForm = styled.div.withConfig({
  shouldForwardProp
})`
    background-color: white;
    text-align: center;
    width: 100%;
    min-height: 420px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgb(0, 0, 0, 0.3);
    padding: 25px;
    z-index: 10;
    width: ${({ isSmallDevice, isMediumDevice }) =>
    isSmallDevice ? "400px" : isMediumDevice ? "500px" : "500px"};
`;

export const StyledcontainerInputs = styled.div.withConfig({
  shouldForwardProp
})`
    width: ${({ isSmallDevice, isMediumDevice }) =>
    isSmallDevice ? "100%" : isMediumDevice ? "100%" : "100%"};
`;

export const StyledInput = styled.div.withConfig({
  shouldForwardProp
})`
position: relative;
margin-bottom: 33px;
width: 100%;
input {
    width: ${({ isSmallDevice, isMediumDevice }) =>
    isSmallDevice || isMediumDevice ? "100%" : "100%"};
    padding: 10px;
    font-size: 16px;    
    border-bottom: 3px solid transparent; /* Default transparent border */
    transition: border-bottom-color 0.3s ease; /* Smooth transition */
    border-radius: 4px; 
    outline: none; 
    border:1px solid rgba(0, 149, 119, 0.57);
}
`;

/* input:not(:placeholder-shown):valid {
    border-bottom-color: #007bff; /* Green for valid input */
// }

/* input:not(:placeholder-shown):invalid {
    border-bottom-color: red; /* Red for invalid input */
// }
