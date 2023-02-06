import {
  Autocomplete,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { AuthContext } from "../../../context/AuthContext";
import { GenericUser, UserStatus } from "../../../generated/graphql";
import { useDeactivateCustomerUserMutation } from "../../gql/delete/user/user.generated";
import { useGetAllUsersWithinCompanyQuery } from "../../gql/get/company/company.generated";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import FullScreenLoading from "../../Utils/Loading";

/** ADMIN VIEW */
const CustomerDeactivateUsers = () => {
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const {
    data: getAllCompanyUsersData,
    loading: getAllCompanyUsersLoading,
    error: getAllCompanyUsersError,
    refetch: getAllCompanyUsersRefetch,
  } = useGetAllUsersWithinCompanyQuery({
    variables: {
      data: {
        companyId: user!.companyId,
        userStatus: [UserStatus.Active],
      },
    },
    fetchPolicy: "no-cache",
  });

  const [
    deactivateUser,
    { loading: deactivateUserLoading, error: deactivateUserError },
  ] = useDeactivateCustomerUserMutation();

  const [usersList, setUsersList] = useState<GenericUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<GenericUser[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (
      getAllCompanyUsersData &&
      getAllCompanyUsersData.getAllUsersWithinCompany
    ) {
      const res = [];
      for (let u of getAllCompanyUsersData.getAllUsersWithinCompany) {
        if (u!.email !== user!.email) {
          res.push(u);
        }
      }
      setUsersList(res);
    }
  }, [getAllCompanyUsersData]);

  useEffect(() => {
    if (getAllCompanyUsersError || deactivateUserError) {
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({ id: "app.general.network.error" }),
      });
      setSnackbarOpen(true);
    }
  }, [getAllCompanyUsersError, deactivateUserError]);

  const deactivateOnClick = async () => {
    setDialogOpen(false);
    try {
      await deactivateUser({
        variables: {
          data: {
            companyId: user!.companyId,
            userIds: selectedUsers.map((item) => item.id),
          },
        },
        onCompleted() {
          getAllCompanyUsersRefetch();
        },
      });
      setSelectedUsers([]);
      setSnackbar({
        severity: "success",
        message: intl.formatMessage({ id: "app.general.network.success" }),
      });
      setSnackbarOpen(true);
    } catch (e) {}
  };

  const isLoading = deactivateUserLoading;

  if (getAllCompanyUsersError) {
    return null;
  }

  return (
    <Container>
      {isLoading && <FullScreenLoading />}
      <Typography variant="h6">
        {intl.formatMessage({
          id: "app.settings.manageCompanyUsers.deactivateUsers",
        })}
      </Typography>

      <Stack spacing={4} sx={{ marginTop: 2 }}>
        <Autocomplete
          loading={getAllCompanyUsersLoading}
          multiple
          value={selectedUsers}
          options={usersList}
          getOptionLabel={(option) => `${option.name} (${option.email})`}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(e, v) => {
            setSelectedUsers(v);
          }}
          disableCloseOnSelect
          renderInput={(params) => (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
              InputLabelProps={{
                sx: {
                  fontSize: 16,
                  top: -7,
                },
              }}
            />
          )}
        />

        <Container
          sx={{ display: "flex", justifyContent: "flex-end" }}
          disableGutters
        >
          <Button
            onClick={() => setDialogOpen(true)}
            variant="outlined"
            color="error"
            disabled={!selectedUsers.length}
          >
            {intl.formatMessage({
              id: "app.settings.manageCompanyUsers.deactivateUsers.deactivate",
            })}
          </Button>
        </Container>
      </Stack>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
      >
        <DialogTitle>
          {intl.formatMessage({
            id: "app.settings.manageCompanyUsers.deactivateUsers.modal.title",
          })}
        </DialogTitle>
        <DialogContent>
          <Typography variant="caption" sx={{ whiteSpace: "break-spaces" }}>
            {intl.formatMessage({
              id: "app.settings.manageCompanyUsers.deactivateUsers.modal.content",
            })}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ mr: 2, mb: 2 }}>
          <Button onClick={deactivateOnClick} variant="contained" color="error">
            {intl.formatMessage({ id: "app.general.confirm" })}
          </Button>
          <Button onClick={() => setDialogOpen(false)}>
            {intl.formatMessage({ id: "app.general.cancel" })}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CustomerDeactivateUsers;
