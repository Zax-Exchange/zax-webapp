import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useResendAccountSetupLinkMutation } from "../gql/utils/user/user.generated";
import { useParams } from "react-router-dom";
import useCustomSnackbar from "../Utils/CustomSnackbar";
import FullScreenLoading from "../Utils/Loading";

const SignupInvalidToken = () => {
  const intl = useIntl();
  const { token } = useParams();
  const [resend, { data, loading, error }] =
    useResendAccountSetupLinkMutation();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  useEffect(() => {
    if (error) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setSnackbar({
        message: intl.formatMessage({
          id: "app.signup.invalidToken.signup.linkSent",
        }),
        severity: "success",
      });
      setSnackbarOpen(true);
    }
  }, [data]);

  const resendLink = async () => {
    await resend({
      variables: {
        data: {
          token: token || "",
        },
      },
    });
  };

  return (
    <Container>
      {loading && <FullScreenLoading />}
      <Typography variant="caption" color="GrayText">
        {intl.formatMessage({ id: "app.signup.invalidToken.signup" })}
      </Typography>
      <Box display="flex" justifyContent="center">
        <Button variant="contained" onClick={resendLink}>
          {intl.formatMessage({ id: "app.general.resend" })}
        </Button>
      </Box>
    </Container>
  );
};

export default SignupInvalidToken;
