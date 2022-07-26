import { Box, Stack, TextField, Typography, Container, Button, ThemeProvider } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { PrimaryButton, primaryButtonTheme } from "../themedComponents/PrimaryButton";

const USER_LOGIN = gql`
  query login($data: UserLoginInput) {
    login(data: $data) {
      id
      companyId
      isVendor
      isAdmin
      name
      email
      token
    }
  }
`;
const Login = () => {
  const { user, login, logout } = useContext(AuthContext);
  const [userLogin, {error, loading, data}] = useLazyQuery(USER_LOGIN);

  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  };

  const loginHandler = () => {
    userLogin({
      variables: {
        data: values
      }
    });
  }

  if (data) {
    login(data.login);
  }

  if (user) {
    navigate("/")
  } else {
    return <Container maxWidth="sm">
        <Typography>Log in</Typography>
        <Stack spacing={2} textAlign="right">
          <TextField type="email" placeholder="email" name="email" value={values.email} onChange={onChange}></TextField>
          <TextField type="password" placeholder="password" name="password" value={values.password} onChange={onChange}></TextField>
          <ThemeProvider theme={primaryButtonTheme}>
            <PrimaryButton variant="contained" onClick={loginHandler}>Login</PrimaryButton>
          </ThemeProvider>
        </Stack>
    </Container>

  }
}


export default Login;