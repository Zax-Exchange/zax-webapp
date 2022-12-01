import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import JwtDecode, { JwtPayload } from "jwt-decode";
import { Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import jwt from "jwt-decode";
import { useResetPasswordMutation } from "../gql/utils/user/user.generated";
import useCustomSnackbar from "../Utils/CustomSnackbar";

const ResetPassword = () => {
  const intl = useIntl();
  const { userId, token } = useParams();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [tokenExpired, setTokenExpired] = useState(false);
  const [isInvalidToken, setIsInvalidToken] = useState(false);

  const [password, setPassword] = useState("");

  const [
    resetPassword,
    {
      loading: resetPasswordLoading,
      data: resetPasswordData,
      error: resetPasswordError,
    },
  ] = useResetPasswordMutation();

  useEffect(() => {
    if (token) {
      try {
        const decodedJwt = jwt(token) as JwtPayload;
        // console.log(payload);
        if (decodedJwt.exp && decodedJwt.exp * 1000 < Date.now()) {
          setTokenExpired(true);
        }
      } catch (error) {
        setIsInvalidToken(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isInvalidToken || resetPasswordError) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [isInvalidToken, resetPasswordError]);

  useEffect(() => {
    if (resetPasswordData) {
      if (resetPasswordData.resetPassword) {
        setSnackbar({
          message: intl.formatMessage({
            id: "app.login.resetPassword.success",
          }),
          severity: "success",
        });
        setSnackbarOpen(true);
      } else {
        setSnackbar({
          message: intl.formatMessage({ id: "app.general.network.error" }),
          severity: "error",
        });
        setSnackbarOpen(true);
      }
    }
  }, [resetPasswordData]);

  const resetOnClick = async () => {
    try {
      await resetPassword({
        variables: {
          data: {
            token: token || "",
            userId: userId || "",
            password,
          },
        },
      });
    } catch (error) {}
  };

  if (isInvalidToken || !userId || !token) {
    return null;
  }

  if (tokenExpired) {
    return (
      <Container maxWidth="sm">
        <Typography variant="caption">
          {intl.formatMessage({ id: "app.general.tokenExpired" })}
        </Typography>
      </Container>
    );
  }

  if (!tokenExpired) {
    return (
      <Container maxWidth="sm">
        <Paper elevation={2} sx={{ padding: 3 }}>
          <Container>
            <Typography variant="h6" sx={{ mb: 5 }}>
              {intl.formatMessage({ id: "app.login.resetPassword" })}
            </Typography>
            <Stack spacing={2} textAlign="right">
              <TextField
                type="password"
                label={intl.formatMessage({ id: "app.login.newPassword" })}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></TextField>

              <LoadingButton
                disabled={!password}
                loading={resetPasswordLoading}
                variant="outlined"
                onClick={resetOnClick}
              >
                {intl.formatMessage({ id: "app.login.forgotPassword.send" })}
              </LoadingButton>
            </Stack>
          </Container>
        </Paper>
      </Container>
    );
  }
  return null;
};

export default ResetPassword;
