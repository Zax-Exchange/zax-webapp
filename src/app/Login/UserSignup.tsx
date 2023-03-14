import {
  Box,
  Stack,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import FullScreenLoading from "../Utils/Loading";
import React from "react";
import { CreateUserInput } from "../../generated/graphql";
import { useCreateUserMutation } from "../gql/create/user/user.generated";
import useCustomSnackbar from "../Utils/CustomSnackbar";
import { useIntl } from "react-intl";
import { validate } from "email-validator";
import InvalidToken from "./InvalidToken";
import {
  useCheckSignupJwtTokenLazyQuery,
  useCheckSignupJwtTokenQuery,
} from "../gql/utils/user/user.generated";
import { LoadingButton } from "@mui/lab";

// TODO: refactor url/route
// TODO: intl
const UserSignup = () => {
  const intl = useIntl();
  const { token } = useParams();
  const { login } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  const [emailTakenError, setEmailTakenError] = useState(false);

  const [createUser, { error: createUserError, loading: createUserLoading }] =
    useCreateUserMutation({
      onCompleted: ({ createUser }) => {
        login(createUser);
        // navigate(GENERAL_ROUTES.HOME);
      },
    });

  const {
    loading: onLoadCheckTokenLoading,
    error: onLoadCheckTokenError,
    data: onLoadCheckTokenData,
  } = useCheckSignupJwtTokenQuery({
    variables: {
      data: {
        token: token || "",
      },
    },
    fetchPolicy: "no-cache",
  });

  const [
    checkToken,
    {
      loading: checkTokenLoading,
      data: checkTokenData,
      error: checkTokenError,
    },
  ] = useCheckSignupJwtTokenLazyQuery();

  const [values, setValues] = useState<CreateUserInput>({
    name: "",
    email: "",
    password: "",
    token: token || "",
  });

  useEffect(() => {
    if (createUserError) {
      if (createUserError.message.includes("duplicate email")) {
        setEmailTakenError(true);
      } else {
        setSnackbar({
          message: intl.formatMessage({ id: "app.general.network.error" }),
          severity: "error",
        });
        setSnackbarOpen(true);
      }
    }
    if (checkTokenError) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [createUserError, checkTokenError]);

  const shouldDisableCreateButton = () => {
    return !validate(values.email) || !values.password || !values.name;
  };
  const onEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !shouldDisableCreateButton()) {
      createUserHandler();
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const createUserHandler = async () => {
    try {
      // check token again in case the link has somehow been used by other ppl
      const { data } = await checkToken({
        variables: {
          data: {
            token: token || "",
          },
        },
        fetchPolicy: "no-cache",
      });

      if (data && data.checkSignupJwtToken) {
        await createUser({
          variables: {
            data: {
              ...values,
            },
          },
          fetchPolicy: "no-cache",
        });
      }
    } catch (error) {}
  };

  if (onLoadCheckTokenLoading) {
    return <FullScreenLoading />;
  }

  if (
    onLoadCheckTokenError ||
    (onLoadCheckTokenData && !onLoadCheckTokenData.checkSignupJwtToken) ||
    checkTokenError ||
    (checkTokenData && !checkTokenData.checkSignupJwtToken)
  ) {
    return <InvalidToken />;
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={2} sx={{ padding: 3 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 5 }}>
            {intl.formatMessage({ id: "app.signup.createAccount" })}
          </Typography>
        </Box>
        <Stack spacing={2} textAlign="right">
          <TextField
            type="name"
            placeholder={intl.formatMessage({ id: "app.general.name" })}
            name="name"
            value={values.name}
            onChange={onChange}
            onKeyDown={onEnter}
          ></TextField>
          <TextField
            type="email"
            placeholder={intl.formatMessage({ id: "app.general.email" })}
            name="email"
            value={values.email}
            onChange={onChange}
            error={!!emailTakenError}
            helperText={
              emailTakenError
                ? intl.formatMessage({ id: "app.signup.duplicateEmail" })
                : intl.formatMessage({ id: "app.signup.user.email.helperText" })
            }
            onKeyDown={onEnter}
          ></TextField>
          <TextField
            type="password"
            placeholder={intl.formatMessage({ id: "app.general.password" })}
            name="password"
            value={values.password}
            onChange={onChange}
            onKeyDown={onEnter}
          ></TextField>

          <LoadingButton
            variant="contained"
            onClick={createUserHandler}
            disabled={shouldDisableCreateButton()}
            loading={checkTokenLoading || createUserLoading}
          >
            {intl.formatMessage({ id: "app.general.create" })}
          </LoadingButton>
        </Stack>
      </Paper>
    </Container>
  );
};

export default UserSignup;
