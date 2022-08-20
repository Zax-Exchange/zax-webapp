import { Box, Stack, TextField, Typography, Container, Button, Card, CardActionArea, CardMedia, CardContent, Fade } from "@mui/material";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import vendor from "../../static/vendor.svg";
import customer from "../../static/customer.svg";


const CompanySignup = () => {
  const { user } = useContext(AuthContext);


  const navigate = useNavigate();

  const signupHandler = (path) => {
    navigate(`/${path}`);
  }

  if (user) {
    navigate("/")
  } else {
    return <Container maxWidth="md">
        <Typography variant="h6" sx={{ marginBottom: 4 }}>Select Your Company Type</Typography>

        <Box sx={{display: "flex", justifyContent: "space-around"}}>
          <Fade in={true}>
            <Card elevation={4}>
              <CardActionArea onClick={() => signupHandler("vendor-signup")}>
                <CardMedia
                  component="img"
                  height="250"
                  width="150"
                  src={vendor}
                />
                <CardContent>
                  <Typography variant="overline" fontSize="1.3em" fontWeight={500}>Sign up as vendor</Typography>
                </CardContent>
              </CardActionArea>
            </Card>

          </Fade>
          
          <Fade in={true}>
            <Card elevation={4}>
              <CardActionArea onClick={() => signupHandler("customer-signup")}>
                <CardMedia
                  component="img"
                  height="250"
                  src={customer}
                />
                <CardContent>
                  <Typography variant="overline" fontSize="1.3em" fontWeight={500}>Sign up as customer</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Fade>
        </Box>
    </Container>

  }
}


export default CompanySignup;