import { LoadingButton } from "@mui/lab";
import { Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { validate } from "email-validator";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSendPasswordResetLinkMutation } from "../gql/utils/user/user.generated";
import useCustomSnackbar from "../Utils/CustomSnackbar";

const ForgotPassword = () => {
  const intl = useIntl();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  const [email, setEmail] = useState("");

  const [
    sendResetLink,
    {
      loading: sendResetLinkLoading,
      error: sendResetLinkError,
      data: sendResetLinkData,
    },
  ] = useSendPasswordResetLinkMutation();

  useEffect(() => {
    if (sendResetLinkError) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [sendResetLinkError]);

  const onEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      sendLink();
    }
  };
  const sendLink = async () => {
    try {
      await sendResetLink({
        variables: {
          data: {
            email,
          },
        },
      });
    } catch (error) {}
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={2} sx={{ padding: 3 }}>
        <Container>
          <Typography variant="h6" sx={{ mb: 5 }}>
            {intl.formatMessage({ id: "app.login.forgotPassword" })}
          </Typography>
          <Stack spacing={2} textAlign="right">
            <TextField
              type="email"
              label={intl.formatMessage({ id: "app.general.email" })}
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText={
                !!sendResetLinkData &&
                intl.formatMessage({
                  id: "app.login.forgotPassword.linkSent",
                })
              }
              onKeyDown={onEnter}
            ></TextField>
            <LoadingButton
              disabled={!validate(email)}
              loading={sendResetLinkLoading}
              variant="outlined"
              onClick={sendLink}
            >
              {intl.formatMessage({ id: "app.login.forgotPassword.send" })}
            </LoadingButton>
          </Stack>
        </Container>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
