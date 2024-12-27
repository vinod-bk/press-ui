import React, { useState } from "react";
import offsetPrintingImage from "../images/offset-printing.png";
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"; // Import MUI components

interface LoginPageProps {
  onLogin: (userId: string, password: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    onLogin(userId, password);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container>
      <Box
        display="flex"
        flexDirection={isSmallScreen ? "column" : "row"}
        alignItems="center"
        width="100%"
        height={`calc(100vh - ${theme.mixins.toolbar.minHeight}px)`}
      >
        <Box
          mb={isSmallScreen ? 4 : 0}
          mr={isSmallScreen ? 0 : 4}
          width={isSmallScreen ? "100%" : "50%"}
          maxWidth="600px"
        >
          <img
            src={offsetPrintingImage}
            alt="Offset Printing"
            className="img-fluid"
            style={{ maxWidth: "100%" }}
          />
        </Box>
        <Box width={isSmallScreen ? "100%" : "50%"} maxWidth="400px">
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" align="center">
                Login
              </Typography>
              <Box mt={2}>
                <TextField
                  fullWidth
                  label="User ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  margin="normal"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                  size="small"
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleLogin}
                  sx={{ mt: 2 }}
                >
                  Login
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
