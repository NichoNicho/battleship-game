import { CircularProgress, Box } from "@mui/material";
import React, { ReactElement, useState, useEffect } from "react";

type AppLoaderProps = {
  children: ReactElement;
};

const AppLoader: React.FC<AppLoaderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return children;
};

export default AppLoader;
