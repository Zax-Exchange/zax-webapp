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
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import FullScreenLoading from "../Utils/Loading";
import React from "react";
import { LoggedInUser, useLoginLazyQuery } from "../../generated/graphql";

const Login = () => {
  const { user, login, logout } = useContext(AuthContext);
  const [userLogin, { error, loading, data }] = useLoginLazyQuery();

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

  const loginHandler = () => {
    userLogin({
      variables: {
        data: values,
      },
      fetchPolicy: "no-cache",
    });
  };

  if (data) {
    login(data.login as LoggedInUser);
    return null;
  }

  if (loading || user) {
    return <FullScreenLoading />;
  }

  return (
    <Fade in={true} timeout={500}>
      <Container maxWidth="sm">
        <Paper elevation={2} sx={{ padding: 3 }}>
          <Container>
            <Typography variant="h6" sx={{ mb: 5 }}>
              Log in
            </Typography>
            <Stack spacing={2} textAlign="right">
              <TextField
                type="email"
                label="email"
                name="email"
                value={values.email}
                onChange={onChange}
              ></TextField>
              <TextField
                type="password"
                label="password"
                name="password"
                value={values.password}
                onChange={onChange}
              ></TextField>
              <Button variant="outlined" onClick={loginHandler}>
                Login
              </Button>
            </Stack>
          </Container>
        </Paper>
      </Container>
    </Fade>
  );
};

export default Login;
