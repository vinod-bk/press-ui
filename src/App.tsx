import React, { useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

import NAVIGATION from "./components/Navigation";
import Content from "./components/Content";
import Profile from "./components/Profile";
import LoginPage from "./components/LoginPage";

import printingLogo from "./images/printing.png";
import { PageContainer } from "@toolpad/core/PageContainer";
import { AppProvider } from "@toolpad/core/AppProvider";
import {
  DashboardLayout,
  type SidebarFooterProps,
} from "@toolpad/core/DashboardLayout";

import { createTheme, useColorScheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import LightModeIcon from "@mui/icons-material/LightMode";

const demoTheme = createTheme({
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
      setMode(event.target.value as "light" | "dark" | "system");
    },
    [setMode]
  );

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<HTMLElement | null>(
    null
  );

  const toggleMenu = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setMenuAnchorEl(isMenuOpen ? null : event.currentTarget);
      setIsMenuOpen((previousIsMenuOpen) => !previousIsMenuOpen);
    },
    [isMenuOpen]
  );

  return (
    <React.Fragment>
      <Box>
        <Tooltip title="Settings" enterDelay={1000}>
          <div>
            <IconButton
              type="button"
              aria-label="settings"
              onClick={toggleMenu}
            >
              <LightModeIcon />
            </IconButton>
          </div>
        </Tooltip>
        <Popover
          open={isMenuOpen}
          anchorEl={menuAnchorEl}
          onClose={toggleMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          disableAutoFocus
        >
          <Box sx={{ p: 2 }}>
            <FormControl>
              <FormLabel id="custom-theme-switcher-label">Theme</FormLabel>
              <RadioGroup
                aria-labelledby="custom-theme-switcher-label"
                defaultValue="system"
                name="custom-theme-switcher"
                onChange={handleThemeChange}
              >
                <FormControlLabel
                  value="light"
                  control={<Radio />}
                  label="Light"
                />
                <FormControlLabel
                  value="system"
                  control={<Radio />}
                  label="System"
                />
                <FormControlLabel
                  value="dark"
                  control={<Radio />}
                  label="Dark"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Popover>
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

  console.log("App, isAuthenticated = ", isAuthenticated);

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
      theme={demoTheme}
      branding={{
        logo: <img src={printingLogo} alt="logo" />,
        title: "Printing Press Management",
      }}
    >
      <DashboardLayout
        slots={{
          sidebarFooter: SidebarFooter,
          toolbarActions: () => <ToolbarActions onLogout={handleLogout} />,
        }}
        defaultSidebarCollapsed
      >
        <PageContainer>
          <Content />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
};

export default App;
