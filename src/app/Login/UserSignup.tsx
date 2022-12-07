import {
  Box,
  Stack,
  TextField,
  Typography,
  Container,
  Button,
  Paper,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import jwt_decode from "jwt-decode";
import FullScreenLoading from "../Utils/Loading";
import React from "react";
import { LoggedInUser } from "../../generated/graphql";
import { GENERAL_ROUTES } from "../constants/loggedInRoutes";
import { useCreateUserMutation } from "../gql/create/user/user.generated";
import useCustomSnackbar from "../Utils/CustomSnackbar";
import { useIntl } from "react-intl";
import { validate } from "email-validator";

const UserSignup = () => {
  const intl = useIntl();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  const [emailTakenError, setEmailTakenError] = useState(false);

  const [createUser, { error: createUserError, loading: createUserLoading }] =
    useCreateUserMutation({
      onCompleted: ({ createUser }) => {
        login(createUser);
        // navigate(GENERAL_ROUTES.HOME);
      },
    });

  const { companyId } = useParams();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    companyId,
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
  }, [createUserError]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const createUserHandler = async () => {
    try {
      if (!companyId) {
        throw new Error("Invalid Company Id.");
      }
      const { data } = await createUser({
        variables: {
          data: {
            name: values.name,
            email: values.email,
            password: values.password,
            companyId: values.companyId!,
          },
        },
      });
    } catch (error) {}
  };

  return (
    <Container maxWidth="sm">
      {!!createUserLoading && <FullScreenLoading />}
      <Paper elevation={2} sx={{ padding: 3 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 5 }}>
            {intl.formatMessage({ id: "app.signup.createAccount" })}
          </Typography>
        </Box>
        <Stack spacing={2} textAlign="right">
          <TextField
            type="name"
            placeholder="name"
            name="name"
            value={values.name}
            onChange={onChange}
          ></TextField>
          <TextField
            type="email"
            placeholder="email"
            name="email"
            value={values.email}
            onChange={onChange}
            error={!!emailTakenError}
            helperText={
              emailTakenError
                ? intl.formatMessage({ id: "app.signup.duplicateEmail" })
                : ""
            }
          ></TextField>
          <TextField
            type="password"
            placeholder="password"
            name="password"
            value={values.password}
            onChange={onChange}
          ></TextField>

          <Button
            variant="contained"
            onClick={createUserHandler}
            disabled={!validate(values.email) || !values.password}
          >
            {intl.formatMessage({ id: "app.general.create" })}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default UserSignup;
