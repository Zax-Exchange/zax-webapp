import { Box, Stack, TextField, Typography, Container, Button } from "@mui/material";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import jwt_decode from "jwt-decode";
import FullScreenLoading from "../Utils/Loading";

const CREATE_USER = gql`
  mutation createUser($data: CreateUserInput) {
    createUser(data: $data) {
      id
      companyId
      isVendor
      isAdmin
      name
      email
      token
    }
  }
`
const UserSignup = () => {
  const { user, login, logout } = useContext(AuthContext);
  const location = useLocation();
  const [createUser, {error: createUserError, loading: createUserLoading}] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      login(data.createUser)
    }
  });
  
  const token = location.pathname.split("/")[2];
  const payload = jwt_decode(token);

  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    companyId: payload.id
  });


  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  };

  const createUserHandler = () => {

    createUser({
      variables: {
        data: {
          name: values.name,
          email: values.email,
          password: values.password,
          companyId: values.companyId
        }
      }
    })
  };

  if (user) {
    navigate("/")
    return;
  } 

  if (createUserLoading) {
    return <FullScreenLoading />
  }


  return <Container maxWidth="sm">
      <Typography>Create Account</Typography>
      <Stack spacing={2} textAlign="right">
        <TextField type="name" placeholder="name" name="name" value={values.name} onChange={onChange}></TextField>
        <TextField type="email" placeholder="email" name="email" value={values.email} onChange={onChange}></TextField>
        <TextField type="password" placeholder="password" name="password" value={values.password} onChange={onChange}></TextField>


        <Button variant="contained" onClick={createUserHandler}>Create</Button>
      </Stack>
  </Container>
}


export default UserSignup;