import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import { ThemeProvider } from "./context/ThemeContext";
import { AlertProvider } from "./context/AlertContext";
import { AuthProvider } from "./context/AuthContext";
import { MenuProvider } from "./context/Menucontext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <AlertProvider>
            <AuthProvider>
              <MenuProvider>
                <Routes />
              </MenuProvider>
            </AuthProvider>
          </AlertProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;