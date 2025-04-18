import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./custom.css";
import "./css/components/public.css"
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Menucontext from "./context/Menucontext";
import Contextwidth from "./context/Windowsize";
import { ThemeProvider } from "./context/ThemeContext";
import { AlertProvider } from "./context/AlertContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import React Query

// Create a client
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Contextwidth>
      <Menucontext>
        <ThemeProvider>
          <AlertProvider>
            <QueryClientProvider client={queryClient}> {/* Wrap with QueryClientProvider */}
              <Router>
                <App />
              </Router>
            </QueryClientProvider>
          </AlertProvider>
        </ThemeProvider>
      </Menucontext>
    </Contextwidth>
  </React.StrictMode>
);
