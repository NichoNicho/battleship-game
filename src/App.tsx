import React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "$views/Layout/Sidebar";
import AppLoader from "./AppLoader";
import AppRoutes from "./AppRoutes";
import "./i18n";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <AppLoader>
        <div style={{ display: "flex" }}>
          <Sidebar />
          <main style={{ marginLeft: "240px", padding: "1rem" }}>
            <AppRoutes />
          </main>
        </div>
      </AppLoader>
    </Router>
  </ThemeProvider>
);

export default App;
