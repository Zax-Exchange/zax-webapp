import {
  Box,
  Stack,
  TextField,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import jwt_decode from "jwt-decode";
import FullScreenLoading from "../Utils/Loading";
import React from "react";
import { LoggedInUser, useCreateUserMutation } from "../../generated/graphql";

const UserSignup = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [createUser, { error: createUserError, loading: createUserLoading }] =
    useCreateUserMutation({
      onCompleted: ({ createUser }: { createUser: LoggedInUser }) => {
        login(createUser);
        navigate("/");
      },
    });

  const { companyId } = useParams();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    companyId,
  });

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
    } catch (error) {
      console.error(error);
    }
  };

  if (createUserLoading) {
    return <FullScreenLoading />;
  }

  if (createUserError) {
    return <Container>Something went wrong.</Container>;
  }
  return (
    <Container maxWidth="sm">
      <Typography>Create Account</Typography>
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
        ></TextField>
        <TextField
          type="password"
          placeholder="password"
          name="password"
          value={values.password}
          onChange={onChange}
        ></TextField>

        <Button variant="contained" onClick={createUserHandler}>
          Create
        </Button>
      </Stack>
    </Container>
  );
};

export default UserSignup;
