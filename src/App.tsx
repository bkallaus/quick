import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PercentToHex from "./components/percent-to-hex";
import PercentToHexContent from "./components/percent-to-hex-content";

export default function App() {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Quick Calculations
        </Typography>
        <PercentToHex />
        <PercentToHexContent />
      </Box>
    </Container>
  );
}
