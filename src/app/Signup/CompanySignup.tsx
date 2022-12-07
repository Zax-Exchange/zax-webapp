import {
  Box,
  Stack,
  TextField,
  Typography,
  Container,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Fade,
} from "@mui/material";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import vendor from "../../static/vendor.svg";
import customer from "../../static/customer.svg";
import React from "react";
import { LOGGED_OUT_ROUTES } from "../constants/loggedOutRoutes";

const CompanySignup = () => {
  const navigate = useNavigate();

  const companyTypeOnClick = (
    path: LOGGED_OUT_ROUTES.VENDOR_SIGNUP | LOGGED_OUT_ROUTES.CUSTOMER_SIGNUP
  ) => {
    navigate(path);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h6" sx={{ marginBottom: 4 }}>
        Select Your Company Type
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <Fade in={true}>
          <Card elevation={4}>
            <CardActionArea
              onClick={() =>
                companyTypeOnClick(LOGGED_OUT_ROUTES.VENDOR_SIGNUP)
              }
            >
              <CardMedia
                component="img"
                height="250"
                width="150"
                src={vendor}
              />
              <CardContent>
                <Typography
                  variant="overline"
                  fontSize="1.3em"
                  fontWeight={500}
                >
                  Sign up as vendor
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Fade>

        <Fade in={true}>
          <Card elevation={4}>
            <CardActionArea
              onClick={() =>
                companyTypeOnClick(LOGGED_OUT_ROUTES.CUSTOMER_SIGNUP)
              }
            >
              <CardMedia component="img" height="250" src={customer} />
              <CardContent>
                <Typography
                  variant="overline"
                  fontSize="1.3em"
                  fontWeight={500}
                >
                  Sign up as customer
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Fade>
      </Box>
    </Container>
  );
};

export default CompanySignup;
