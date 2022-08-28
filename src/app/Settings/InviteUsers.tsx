import {
  Button,
  Container,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { validate } from "email-validator";

import { AuthContext } from "../../context/AuthContext";
import FullScreenLoading from "../Utils/Loading";
import { LoggedInUser } from "../../generated/graphql";
import useCustomSnackbar from "../Utils/CustomSnackbar";
import { useInviteUserMutation } from "../gql/utils/user/user.generated";
import { LoadingButton } from "@mui/lab";

const InviteUsers = () => {
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [email, setEmail] = useState("");
  const [
    inviteUser,
    {
      loading: inviteUserLoading,
      data: inviteUserData,
      error: inviteUserError,
    },
  ] = useInviteUserMutation();

  useEffect(() => {
    if (inviteUserError) {
      setSnackbar({
        severity: "error",
        message: "Something went wrong. Please try again later.",
      });
      setSnackbarOpen(true);
    }
    if (inviteUserData) {
      setSnackbar({
        severity: "success",
        message: "Invitation sent!",
      });
      setSnackbarOpen(true);
    }
  }, [inviteUserError, inviteUserData]);

  const emailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const sendInvitation = async () => {
    try {
      await inviteUser({
        variables: {
          data: {
            email,
            userId: user!.id,
          },
        },
      });
    } catch (error) {
      return;
    }
  };

  return (
    <Container>
      <Typography variant="h6">Invite Users</Typography>

      <Stack spacing={4} sx={{ marginTop: 2 }}>
        <TextField
          label="User email"
          placeholder="Send invitation with user email"
          value={email}
          onChange={emailOnChange}
        />

        <Container
          sx={{ display: "flex", justifyContent: "flex-end" }}
          disableGutters
        >
          <LoadingButton
            loading={inviteUserLoading}
            variant="contained"
            disabled={!validate(email)}
            onClick={sendInvitation}
          >
            Send invitation
          </LoadingButton>
        </Container>
      </Stack>
    </Container>
  );
};

export default InviteUsers;
