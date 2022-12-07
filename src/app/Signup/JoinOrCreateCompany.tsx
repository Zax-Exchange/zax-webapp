import { Box, Button } from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";
import { CustomerSignupPage } from "./customer/CustomerSignup";

const JoinOrCreateCompany = ({
  setCurrentPage,
}: {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const intl = useIntl();
  return (
    <Box display="flex" justifyContent="space-around">
      <Button
        variant="outlined"
        onClick={() => setCurrentPage(CustomerSignupPage.JOIN)}
      >
        {intl.formatMessage({ id: "app.signup.joinACompany" })}
      </Button>
      <Button
        variant="outlined"
        onClick={() => setCurrentPage(CustomerSignupPage.EMAIL_PAGE)}
      >
        {intl.formatMessage({ id: "app.signup.createNewCompany" })}
      </Button>
    </Box>
  );
};

export default JoinOrCreateCompany;
