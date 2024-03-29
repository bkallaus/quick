import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PercentToHex from "./components/percent-to-hex";
import PourOver from "./components/pour-over";
import QrCode from "./components/qr-code";
import MlToCups from "./components/ml-to-cups";

export default function App() {
  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Quick Calculations
        </Typography>
        <PercentToHex />
        <MlToCups />
        <PourOver />
        <QrCode />
      </Box>
    </Container>
  );
}
