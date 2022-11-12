import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  List,
  ListItem,
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
import {
  useDeletePendingJoinRequestMutation,
  useGetAllPendingJoinRequestsQuery,
} from "../gql/utils/company/company.generated";

const InviteUsers = () => {
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  const [
    inviteUser,
    {
      loading: inviteUserLoading,
      data: inviteUserData,
      error: inviteUserError,
    },
  ] = useInviteUserMutation();

  const {
    data: getAllPendingJoinRequestsData,
    loading: getAllPendingJoinRequestsLoading,
    error: getAllPendingJoinRequestsError,
    refetch,
  } = useGetAllPendingJoinRequestsQuery({
    variables: {
      data: {
        companyId: user!.companyId,
      },
    },
  });

  const [deletePendingJoinRequest] = useDeletePendingJoinRequestMutation();

  const [email, setEmail] = useState("");

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

  const deletePendingRequest = async (userEmail: string) => {
    try {
      await deletePendingJoinRequest({
        variables: {
          data: {
            userEmail,
          },
        },
        onCompleted: () => {
          refetch();
        },
      });
    } catch (error) {}
  };

  return (
    <Container>
      <Typography variant="h6">Manage Invitations</Typography>

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

      <Grid container>
        <Grid item xs={4}>
          <Box>
            <Typography variant="subtitle2">Pending Requests</Typography>
          </Box>
          <Box sx={{ border: "1px solid #ddd", borderRadius: "4px" }}>
            <List>
              {getAllPendingJoinRequestsLoading && <CircularProgress />}
              {getAllPendingJoinRequestsData &&
                getAllPendingJoinRequestsData.getAllPendingJoinRequests.map(
                  (email) => {
                    return (
                      <ListItem>
                        <Chip
                          variant="outlined"
                          label={email}
                          onClick={() => deletePendingRequest(email)}
                        />
                      </ListItem>
                    );
                  }
                )}
            </List>
          </Box>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Container>
  );
};

export default InviteUsers;
