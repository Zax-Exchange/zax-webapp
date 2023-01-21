import { Container, Typography } from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";

const InvalidToken = () => {
  const intl = useIntl();

  return (
    <Container>
      <Typography variant="caption" color="GrayText">
        {intl.formatMessage({ id: "app.signup.invalidToken" })}
      </Typography>
    </Container>
  );
};

export default InvalidToken;
