import { Box, Typography } from "@mui/material";
import React from "react";

const PercentToHexContent = () => {
  return (
    <Box display="flex" flexDirection={"column"} gap={3} mt={3}>
      <Typography>
        Have you ever wanted to convert from percent to hexadecimal. Or how
        about from hexadecimal to percent. This can be very useful when trying
        to calculate opacity for colors.
      </Typography>
      <Typography>
        I often need to convert from percent to hex and from hex back to percent
        when choosing color opacity. This tool will help make this process of
        converting simple.
      </Typography>
      <Typography>
        Hexadecimal is numbering system with a base of 16. The easiest way to
        convert from hex to percent is by first converting to decimal or base 10
        and then dividing by 255 and mutipltying by 100.
      </Typography>
    </Box>
  );
};

export default PercentToHexContent;
