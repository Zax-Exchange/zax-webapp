import {
  Box,
  Stack,
  TextField,
  Typography,
  Container,
  Fade,
  Paper,
  useTheme,
  Link,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import React from "react";
import { LoggedInUser } from "../../generated/graphql";
import { useLoginLazyQuery } from "../gql/utils/user/user.generated";
import useCustomSnackbar from "../Utils/CustomSnackbar";
import { useIntl } from "react-intl";
import { LOGGED_OUT_ROUTES } from "../constants/loggedOutRoutes";
import ReactGA from "react-ga4";
import { EVENT_ACTION, EVENT_CATEGORY } from "../../analytics/constants";
import { openLink } from "../Utils/openLink";

const Login = () => {
  const intl = useIntl();
  const { login } = useContext(AuthContext);
  const [userLogin, { error, loading, data }] = useLoginLazyQuery();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [credentialsError, setCredentialsError] = useState(false);
  const [inactiveAccountError, setInactiveAccountError] = useState(false);
  const [inactiveCompanyError, setInactiveCompanyError] = useState(false);

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
      if (error.message === "incorrect credentials") {
        setCredentialsError(true);
      } else if (error.message === "inactive account") {
        setInactiveAccountError(true);
      } else if (error.message === "inactive company") {
        setInactiveCompanyError(true);
      } else {
        setSnackbar({
          message: intl.formatMessage({ id: "app.general.network.error" }),
          severity: "error",
        });
        setSnackbarOpen(true);
      }
    }
  }, [data, error]);

  const resetErrors = () => {
    setCredentialsError(false);
    setInactiveAccountError(false);
    setInactiveCompanyError(false);
  };

  const onEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      loginHandler();
    }
  };

  const loginHandler = async () => {
    try {
      resetErrors();
      await userLogin({
        variables: {
          data: values,
        },
        fetchPolicy: "no-cache",
      });
      ReactGA.event({
        action: EVENT_ACTION.LOGIN,
        category: EVENT_CATEGORY.USER_SESSION,
      });
    } catch (e) {}
  };

  const forgotPasswordOnClick = () => {
    navigate(LOGGED_OUT_ROUTES.FORGOT_PASSWORD);
  };

  const getErrorHelperText = () => {
    if (credentialsError) {
      return intl.formatMessage({ id: "app.login.credentialsError" });
    } else if (inactiveAccountError) {
      return intl.formatMessage({ id: "app.login.inactiveAccountError" });
    } else if (inactiveCompanyError) {
      return intl.formatMessage({ id: "app.login.inactiveCompanyError" });
    }
    return "";
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
                onKeyDown={onEnter}
                error={credentialsError}
              ></TextField>
              <TextField
                type="password"
                label={intl.formatMessage({ id: "app.general.password" })}
                name="password"
                value={values.password}
                onChange={onChange}
                onKeyDown={onEnter}
                error={credentialsError}
                helperText={getErrorHelperText()}
                FormHelperTextProps={{
                  sx: {
                    margin: 0,
                    fontSize: "0.7em",
                  },
                }}
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
          <Box mt={2}>
            <Typography
              color="text.secondary"
              fontSize="0.8rem"
              sx={{ whiteSpace: "pre-line" }}
            >
              By clicking the Login button, you acknowledge that you have
              reviewed and agreed to the Zax{" "}
              <Link
                onClick={() =>
                  openLink(
                    "https://app.termly.io/document/terms-and-conditions/9168f760-6b6c-4c5f-916d-867462a8c2db"
                  )
                }
                sx={{
                  cursor: "pointer",
                }}
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                onClick={() =>
                  openLink(
                    "https://app.termly.io/document/privacy-policy/261339a9-d1a3-4426-baf1-ce0c45836c8d"
                  )
                }
                sx={{
                  cursor: "pointer",
                }}
              >
                Privacy Policy
              </Link>
              .
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Fade>
  );
};

export default Login;
