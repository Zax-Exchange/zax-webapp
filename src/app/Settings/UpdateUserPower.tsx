import {
  Autocomplete,
  Box,
  Button,
  Container,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { AuthContext } from "../../context/AuthContext";
import { GenericUser, UserPower, UserStatus } from "../../generated/graphql";
import { useGetAllUsersWithinCompanyQuery } from "../gql/get/company/company.generated";
import { useUpdateUserPowerMutation } from "../gql/update/user/user.generated";
import useCustomSnackbar from "../Utils/CustomSnackbar";
import FullScreenLoading from "../Utils/Loading";

/** ADMIN VIEW */
const UpdateUserPower = () => {
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  const [usersList, setUsersList] = useState<GenericUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<GenericUser[]>([]);
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
    updateUserPower,
    {
      loading: updateUserPowerLoading,
      data: updateUserPowerData,
      error: updateUserPowerError,
    },
  ] = useUpdateUserPowerMutation();

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

    if (updateUserPowerData && updateUserPowerData.updateUserPower) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.success" }),
        severity: "success",
      });
      setSnackbarOpen(true);
    }
  }, [getAllCompanyUsersData, updateUserPowerData]);

  useEffect(() => {
    if (getAllCompanyUsersError || updateUserPowerError) {
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({ id: "app.general.network.error" }),
      });
      setSnackbarOpen(true);
    }
  }, [getAllCompanyUsersError, updateUserPowerError]);

  const updateUserPowerOnClick = async (power: UserPower) => {
    try {
      await updateUserPower({
        variables: {
          data: selectedUsers.map((user) => ({
            userId: user.id,
            power,
          })),
        },
        onCompleted() {
          getAllCompanyUsersRefetch();
        },
      });
      setSelectedUsers([]);
    } catch (error) {}
  };

  const getUserPowerString = (power: UserPower) => {
    switch (power) {
      case UserPower.Admin:
        return intl.formatMessage({ id: "app.general.userPower.admin" });
      case UserPower.User:
        return intl.formatMessage({ id: "app.general.userPower.user" });
    }
  };
  const isLoading = updateUserPowerLoading;

  return (
    <Container>
      {isLoading && <FullScreenLoading />}
      <Typography variant="h6">
        {intl.formatMessage({
          id: "app.settings.manageCompanyUsers.updateUserPower",
        })}
      </Typography>

      <Stack spacing={4} sx={{ marginTop: 2 }}>
        <Autocomplete
          loading={getAllCompanyUsersLoading}
          multiple
          options={usersList}
          getOptionLabel={(option) =>
            `${option.name} (${option.email}) - ${getUserPowerString(
              option.power
            )}`
          }
          renderOption={(props, option) => {
            return (
              <ListItem {...props}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="subtitle2" sx={{ mr: 1 }}>
                    {option.name}
                  </Typography>
                  <Typography variant="caption">({option.email})</Typography>
                  <Typography variant="caption" sx={{ ml: 1 }}>
                    {` - ${getUserPowerString(option.power)}`}
                  </Typography>
                </Box>
              </ListItem>
            );
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          value={selectedUsers}
          disableCloseOnSelect
          onChange={(e, v) => {
            setSelectedUsers(v);
          }}
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
            variant="outlined"
            disabled={!selectedUsers.length}
            onClick={() => updateUserPowerOnClick(UserPower.Admin)}
            sx={{ mr: 2 }}
          >
            {intl.formatMessage({
              id: "app.settings.manageCompanyUsers.updateUserPower.makeAdmin",
            })}
          </Button>
          <Button
            variant="outlined"
            disabled={!selectedUsers.length}
            onClick={() => updateUserPowerOnClick(UserPower.User)}
          >
            {intl.formatMessage({
              id: "app.settings.manageCompanyUsers.updateUserPower.makeNormal",
            })}
          </Button>
        </Container>
      </Stack>
    </Container>
  );
};

export default UpdateUserPower;
