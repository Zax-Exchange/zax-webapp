import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import FullScreenLoading from "../Utils/Loading";
import { validate } from "email-validator";
import React from "react";

const UpdateBillingEmail = () => {
  const { user } = useContext(AuthContext);

  const [email, setEmail] = useState("");

  const emailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // TODO: implement gql endpoint
  const updateBillingEmail = () => {};
  // TODO: also need to check duplication

  return (
    <Container>
      <Typography variant="h6">Update Billing Email</Typography>

      <Stack spacing={4} sx={{ marginTop: 2 }}>
        <TextField
          label="Billing email"
          placeholder="Email"
          size="small"
          value={email}
          onChange={emailOnChange}
        />

        <Container
          sx={{ display: "flex", justifyContent: "flex-end" }}
          disableGutters
        >
          <Button
            variant="outlined"
            disabled={!validate(email)}
            onClick={updateBillingEmail}
          >
            Update
          </Button>
        </Container>
      </Stack>
    </Container>
  );
};

export default UpdateBillingEmail;
