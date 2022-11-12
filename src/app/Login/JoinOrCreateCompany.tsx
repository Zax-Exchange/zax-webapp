import { Box, Button } from "@mui/material";
import React from "react";
import { CustomerSignupPage } from "./customer/CustomerSignup";

const JoinOrCreateCompany = ({
  setCurrentPage,
}: {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Box>
      <Button
        variant="outlined"
        onClick={() => setCurrentPage(CustomerSignupPage.JOIN)}
      >
        Join a company
      </Button>
      <Button
        variant="outlined"
        onClick={() => setCurrentPage(CustomerSignupPage.EMAIL_PAGE)}
      >
        Create a new company
      </Button>
    </Box>
  );
};

export default JoinOrCreateCompany;
