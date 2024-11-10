import React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import store from "$store/index";
import Sidebar from "$views/Layout/Sidebar";
import AppLoader from "./AppLoader";
import AppRoutes from "./AppRoutes";
import "./i18n";

const theme = createTheme({});

const App: React.FC = () => (
  <ReduxProvider store={store}>
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
  </ReduxProvider>
);

export default App;
