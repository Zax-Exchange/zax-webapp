import { Box, Stack, TextField, Typography, Container, Button } from "@mui/material";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const CompanySignup = () => {
  const { user } = useContext(AuthContext);


  const navigate = useNavigate();

  const signupHandler = (e) => {
    navigate(`/${e.target.name}`);
  }

  if (user) {
    navigate("/")
  } else {
    return <Container maxWidth="sm">
        <Typography variant="h6" sx={{ marginBottom: 4 }}>Select your company type</Typography>

        <Box sx={{display: "flex", justifyContent: "space-around"}}>
          <Button variant="outlined" name="vendor-signup" onClick={signupHandler}>I'm a vendor</Button>
          <Button variant="outlined" name="customer-signup" onClick={signupHandler}>I'm a customer</Button>
        </Box>
    </Container>

  }
}


export default CompanySignup;