import { CheckCircle } from "@mui/icons-material";
import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";

const CheckoutSuccess = () => {
  const intl = useIntl();

  return (
    <Container maxWidth="md">
      <Box>
        <CheckCircle color="success" fontSize="large" />
      </Box>
      <Box>
        <Typography variant="subtitle2">
          {intl.formatMessage({ id: "app.signup.checkoutSuccess" })}
        </Typography>
      </Box>
    </Container>
  );
};

export default CheckoutSuccess;
