import {
  Box,
  Typography,
  Container,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Fade,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import vendor from "../../static/vendor.svg";
import customer from "../../static/customer.svg";
import React from "react";
import { LOGGED_OUT_ROUTES } from "../constants/loggedOutRoutes";
import { useIntl } from "react-intl";

const CompanySignup = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const companyTypeOnClick = (
    path: LOGGED_OUT_ROUTES.VENDOR_SIGNUP | LOGGED_OUT_ROUTES.CUSTOMER_SIGNUP
  ) => {
    navigate(path);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h6" sx={{ marginBottom: 4 }}>
        {intl.formatMessage({ id: "app.signup.companySignup.pageTitle" })}
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
                  variant="subtitle2"
                  fontSize="1.3em"
                  fontWeight={500}
                >
                  {intl.formatMessage({
                    id: "app.signup.companySignup.asVendor",
                  })}
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
                  variant="subtitle2"
                  fontSize="1.3em"
                  fontWeight={500}
                >
                  {intl.formatMessage({
                    id: "app.signup.companySignup.asCustomer",
                  })}
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
