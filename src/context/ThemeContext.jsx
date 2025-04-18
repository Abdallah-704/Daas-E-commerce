import React, { createContext, useState, useContext, useEffect } from 'react';
import { darkTheme } from '../theme/darkTheme';
import { lightTheme } from '../theme/lightTheme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    const theme = isDark ? darkTheme : lightTheme;
    useEffect(() => {
        // This effect runs whenever the theme changes

        // Get the HTML element of our webpage
        const htmlElement = document.documentElement;

        // Go through each color in our theme
        for (const [colorName, colorValue] of Object.entries(theme.colors)) {

            // Some colors might have sub-colors (like primary-light, primary-dark)
            if (typeof colorValue === 'object') {
                // Handle colors that have sub-colors
                for (const [subColorName, subColorValue] of Object.entries(colorValue)) {
                    // Create CSS variable names like --primary-light
                    const cssVariableName = `--${colorName}-${subColorName}`;
                    // Set the color value in CSS
                    htmlElement.style.setProperty(cssVariableName, subColorValue);
                }
            } else {
                // Handle simple colors (like --background)
                const cssVariableName = `--${colorName}`;
                // Set the color value in CSS
                htmlElement.style.setProperty(cssVariableName, colorValue);
            }
        }

    }, [theme]); // This effect runs again whenever theme changes

    return (
        <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}; 