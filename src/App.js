import React from "react";
import { ThemeProvider as CustomThemeProvider, useTheme } from "./context/ThemeContext";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { AuthProvider } from "./context/AuthContext";
import Routes from "./routes/Routes";
import "./styles/global.css";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <CustomThemeProvider>
      <StyledComponentsWrapper>
        <AuthProvider>
          <div className="App">
            <Routes />
            <ThemeToggle />
          </div>
        </AuthProvider>
      </StyledComponentsWrapper>
    </CustomThemeProvider>
  );
}

// Wrapper component to provide styled-components theme
const StyledComponentsWrapper = ({ children }) => {
  const { theme } = useTheme();
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};

export default App;
