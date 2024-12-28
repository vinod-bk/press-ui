import React, { useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

import NAVIGATION from "./components/Navigation";
import Content from "./components/Content";
import Profile from "./components/Profile";
import LoginPage from "./components/LoginPage";

import printingLogo from "./images/printing.png";
import { PageContainer } from "@toolpad/core/PageContainer";
import { AppProvider } from "@toolpad/core/react-router-dom";
import {
  DashboardLayout,
  type SidebarFooterProps,
} from "@toolpad/core/DashboardLayout";

import { createTheme, useColorScheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const ToolbarActions = React.memo(({ onLogout }: { onLogout: () => void }) => {
  const { setMode } = useColorScheme();

  const handleThemeChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newMode =
        theme.palette.mode === "light" ? "dark" : "light";
      setMode(newMode);
      theme.palette.mode = newMode;
    },
    [setMode]
  );

  return (
    <React.Fragment>
      <Box>
        <IconButton
          type="button"
          aria-label="settings"
          onClick={(event) => {
            handleThemeChange(event as any);
          }}
        >
          {theme.palette.mode === "dark" ? (
            <LightModeIcon />
          ) : (
            <DarkModeIcon />
          )}
        </IconButton>
      </Box>
      <Box>
        <Profile onLogout={onLogout} />
      </Box>
    </React.Fragment>
  );
});

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (userId: string, password: string) => {
    if (userId === "admin" && password === "admin") {
      setIsAuthenticated(true);
      navigate("/dashboard"); // Navigate to the default route after login
    } else {
      alert("Invalid user ID or password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/login"); // Navigate to the login page after logout
  };

  function SidebarFooter({ mini }: SidebarFooterProps) {
    return (
      <Typography
        variant="caption"
        sx={{ m: 1, whiteSpace: "nowrap", overflow: "hidden" }}
      >
        {mini ? "© Press UI" : `© ${new Date().getFullYear()} Press UI`}
      </Typography>
    );
  }

  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={theme}
      branding={{
        logo: <img src={printingLogo} alt="logo" />,
        title: "Printing Press Management",
      }}
    >
      <Routes>
        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} />}
        ></Route>
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <DashboardLayout
                slots={{
                  sidebarFooter: SidebarFooter,
                  toolbarActions: () => (
                    <ToolbarActions onLogout={handleLogout} />
                  ),
                }}
                defaultSidebarCollapsed
              >
                <PageContainer breadcrumbs={undefined}>
                  <Content />
                </PageContainer>
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
      </Routes>
    </AppProvider>
  );
};

export default App;
