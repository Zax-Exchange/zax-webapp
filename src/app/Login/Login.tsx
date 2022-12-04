import {
  Box,
  Stack,
  TextField,
  Typography,
  Container,
  Button,
  ThemeProvider,
  Fade,
  Paper,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import FullScreenLoading from "../Utils/Loading";
import React from "react";
import { LoggedInUser } from "../../generated/graphql";
import { useLoginLazyQuery } from "../gql/utils/user/user.generated";
import useCustomSnackbar from "../Utils/CustomSnackbar";
import { useIntl } from "react-intl";
import { LOGGED_OUT_ROUTES } from "../constants/loggedOutRoutes";

const Login = () => {
  const intl = useIntl();
  const { user, login, logout } = useContext(AuthContext);
  const [userLogin, { error, loading, data }] = useLoginLazyQuery();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // TODO: differentiate between server error/input error
  useEffect(() => {
    if (data) {
      login(data.login as LoggedInUser);
    }
    if (error) {
      setSnackbar({
        message: "Incorrect email/password.",
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [data, error]);

  const loginHandler = async () => {
    try {
      await userLogin({
        variables: {
          data: values,
        },
        fetchPolicy: "no-cache",
      });
    } catch (e) {
      console.log(e);
      setSnackbar({
        message: "Incorrect email/password.",
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  };

  const forgotPasswordOnClick = () => {
    navigate(LOGGED_OUT_ROUTES.FORGOT_PASSWORD);
  };

  return (
    <Fade in={true} timeout={500}>
      <Container maxWidth="sm">
        <Paper elevation={2} sx={{ padding: 3 }}>
          <Container>
            <Typography variant="h6" sx={{ mb: 5 }}>
              {intl.formatMessage({ id: "app.general.login" })}
            </Typography>
            <Stack spacing={2} textAlign="right">
              <TextField
                type="email"
                label={intl.formatMessage({ id: "app.general.email" })}
                name="email"
                value={values.email}
                onChange={onChange}
              ></TextField>
              <TextField
                type="password"
                label={intl.formatMessage({ id: "app.general.password" })}
                name="password"
                value={values.password}
                onChange={onChange}
              ></TextField>
              <Box>
                <Typography
                  variant="caption"
                  onClick={forgotPasswordOnClick}
                  sx={{
                    ":hover": {
                      cursor: "pointer",
                      textDecorationLine: "underline",
                    },
                  }}
                >
                  {intl.formatMessage({ id: "app.login.forgotPassword" })}
                </Typography>
              </Box>
              <LoadingButton
                loading={loading}
                variant="outlined"
                onClick={loginHandler}
              >
                {intl.formatMessage({ id: "app.general.button.login" })}
              </LoadingButton>
            </Stack>
          </Container>
        </Paper>
      </Container>
    </Fade>
  );
};

export default Login;
