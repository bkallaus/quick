import { Box } from "@mui/material";
import React from "react";

const CalculationContainer = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  return (
    <Box
      sx={{
        alignItems: "center",
        border: "1px solid black",
        borderRadius: 4,
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        width: "fit-content",
        justifyContent: "center",
        padding: 3,
      }}
    >
      {children}
    </Box>
  );
};

export default CalculationContainer;
