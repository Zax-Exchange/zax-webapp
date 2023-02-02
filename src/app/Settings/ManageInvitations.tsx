import {
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { validate } from "email-validator";

import { AuthContext } from "../../context/AuthContext";
import FullScreenLoading from "../Utils/Loading";
import useCustomSnackbar from "../Utils/CustomSnackbar";
import {
  useDeletePendingJoinRequestsMutation,
  useGetAllPendingJoinRequestsQuery,
} from "../gql/utils/company/company.generated";
import { useInviteUsersMutation } from "../gql/utils/user/user.generated";
import { PlaylistAddCheck, PlaylistRemove } from "@mui/icons-material";
import { useIntl } from "react-intl";

/** ADMIN VIEW */
const ManageInvitations = () => {
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [selectedPendingRequests, setSelectedPendingRequests] = useState<
    Record<string, boolean>
  >({});

  const [
    inviteUsers,
    {
      loading: inviteUsersLoading,
      data: inviteUsersData,
      error: inviteUsersError,
    },
  ] = useInviteUsersMutation();

  const {
    data: getAllPendingJoinRequestsData,
    loading: getAllPendingJoinRequestsLoading,
    error: getAllPendingJoinRequestsError,
    refetch: getAllPendingJoinRequestsRefetch,
  } = useGetAllPendingJoinRequestsQuery({
    variables: {
      data: {
        companyId: user!.companyId,
      },
    },
    fetchPolicy: "no-cache",
  });

  const [
    deletePendingJoinRequests,
    {
      data: deletePendingJoinRequestsData,
      loading: deletePendingJoinRequestsLoading,
      error: deletePendingJoinRequestsError,
    },
  ] = useDeletePendingJoinRequestsMutation();

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (inviteUsersError || deletePendingJoinRequestsError) {
      if (inviteUsersError?.message.includes("duplicate email")) {
        setSnackbar({
          severity: "error",
          message: intl.formatMessage({ id: "app.error.signup.existingUser" }),
        });
      } else {
        setSnackbar({
          severity: "error",
          message: intl.formatMessage({ id: "app.general.network.error" }),
        });
      }
      setSnackbarOpen(true);
    }
    if (inviteUsersData) {
      setSnackbar({
        severity: "success",
        message: intl.formatMessage({
          id: "app.settings.manageCompanyUsers.manageInvitations.invitationSent",
        }),
      });
      setSnackbarOpen(true);
    }
    if (deletePendingJoinRequestsData) {
      setSnackbar({
        severity: "success",
        message: intl.formatMessage({
          id: "app.general.network.success",
        }),
      });
      setSnackbarOpen(true);
    }
  }, [
    deletePendingJoinRequestsData,
    deletePendingJoinRequestsError,
    inviteUsersError,
    inviteUsersData,
  ]);

  const emailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const sendInvitation = async () => {
    try {
      await inviteUsers({
        variables: {
          data: {
            email,
            userId: user!.id,
          },
        },
        onCompleted() {
          getAllPendingJoinRequestsRefetch();
          resetSelectedPendingRequests();
          setEmail("");
        },
      });
    } catch (error) {
      return;
    }
  };

  const sendInvitations = async () => {
    try {
      await inviteUsers({
        variables: {
          data: getAllSelectedEmails().map((email) => ({
            email,
            userId: user!.id,
          })),
        },
        onCompleted() {
          resetSelectedPendingRequests();
          getAllPendingJoinRequestsRefetch();
        },
      });
    } catch (error) {}
  };

  const hasSelectedPendingRequests = () => {
    return Object.values(selectedPendingRequests).some((val) => val);
  };
  const getAllSelectedEmails = () => {
    return Object.entries(selectedPendingRequests)
      .map(([email, selected]) => {
        if (selected) {
          return email;
        }
        return null;
      })
      .filter((email) => !!email) as string[];
  };

  const deletePendingRequests = async () => {
    try {
      await deletePendingJoinRequests({
        variables: {
          data: getAllSelectedEmails().map((userEmail) => ({
            userEmail,
          })),
        },
        onCompleted() {
          getAllPendingJoinRequestsRefetch();
          resetSelectedPendingRequests();
        },
      });
    } catch (error) {}
  };

  const selectPendingRequest = (email: string) => {
    setSelectedPendingRequests((prev) => ({
      ...prev,
      [email]: true,
    }));
  };

  const deselectPendingRequest = (email: string) => {
    setSelectedPendingRequests((prev) => ({
      ...prev,
      [email]: false,
    }));
  };

  const resetSelectedPendingRequests = () => {
    setSelectedPendingRequests({});
  };

  const pendingRequestOnClick = (email: string) => {
    if (selectedPendingRequests[email]) {
      deselectPendingRequest(email);
    } else {
      selectPendingRequest(email);
    }
  };

  const isLoading =
    getAllPendingJoinRequestsLoading ||
    deletePendingJoinRequestsLoading ||
    inviteUsersLoading;

  return (
    <Container>
      {isLoading && <FullScreenLoading />}
      <Typography variant="h6" mb={2}>
        {intl.formatMessage({
          id: "app.settings.manageCompanyUsers.manageInvitations",
        })}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle2" textAlign="center">
              {intl.formatMessage({
                id: "app.settings.manageCompanyUsers.manageInvitations.pendingRequests",
              })}
            </Typography>
            <Box>
              <IconButton
                disabled={!hasSelectedPendingRequests()}
                onClick={deletePendingRequests}
                sx={{ pt: 0 }}
              >
                <Tooltip
                  title={intl.formatMessage({
                    id: "app.settings.manageCompanyUsers.manageInvitations.declineAll",
                  })}
                  placement="top"
                >
                  <PlaylistRemove
                    color={hasSelectedPendingRequests() ? "error" : "disabled"}
                  />
                </Tooltip>
              </IconButton>
              <IconButton
                disabled={!hasSelectedPendingRequests()}
                onClick={sendInvitations}
                sx={{ pt: 0 }}
              >
                <Tooltip
                  title={intl.formatMessage({
                    id: "app.settings.manageCompanyUsers.manageInvitations.acceptAll",
                  })}
                  placement="top"
                >
                  <PlaylistAddCheck
                    color={
                      hasSelectedPendingRequests() ? "success" : "disabled"
                    }
                  />
                </Tooltip>
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: "4px",
              maxHeight: "300px",
              overflowY: "scroll",
            }}
          >
            <List>
              {getAllPendingJoinRequestsData &&
                !getAllPendingJoinRequestsData.getAllPendingJoinRequests
                  .length && (
                  <ListItem sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography variant="caption">
                      {intl.formatMessage({
                        id: "app.settings.manageCompanyUsers.manageInvitations.noPendingRequests",
                      })}
                    </Typography>
                  </ListItem>
                )}
              {getAllPendingJoinRequestsData &&
                getAllPendingJoinRequestsData.getAllPendingJoinRequests.map(
                  (email) => {
                    return (
                      <>
                        <ListItem
                          sx={{
                            ":hover": {
                              backgroundColor: "#f6f6f6",
                              cursor: "pointer",
                            },
                          }}
                          onClick={() => pendingRequestOnClick(email)}
                        >
                          <Checkbox
                            checked={!!selectedPendingRequests[email]}
                          />
                          <Chip variant="outlined" label={email} />
                        </ListItem>
                      </>
                    );
                  }
                )}
            </List>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Box display="flex" mb={1}>
              <Typography variant="subtitle2">
                {intl.formatMessage({
                  id: "app.settings.manageCompanyUsers.manageInvitations.directInvitation",
                })}
              </Typography>
            </Box>

            <TextField
              placeholder={intl.formatMessage({ id: "app.general.email" })}
              value={email}
              onChange={emailOnChange}
              sx={{ width: "100%" }}
            />

            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                variant="outlined"
                disabled={!validate(email)}
                onClick={sendInvitation}
              >
                {intl.formatMessage({
                  id: "app.settings.manageCompanyUsers.manageInvitations.sendInvitation",
                })}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ManageInvitations;
