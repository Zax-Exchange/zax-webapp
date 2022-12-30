import {
  Button,
  Container,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React from "react";
import { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { AuthContext } from "../../context/AuthContext";
import { useUpdateUserPasswordMutation } from "../gql/update/user/user.generated";
import useCustomSnackbar from "../Utils/CustomSnackbar";
import FullScreenLoading from "../Utils/Loading";

const ChangePassword = () => {
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [
    updateUserPassword,
    {
      data: updateUserPasswordData,
      error: updateUserPasswordError,
      loading: updateUserPasswordLoading,
    },
  ] = useUpdateUserPasswordMutation();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const currentPasswordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  };

  const newPasswordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const updatePassword = async () => {
    try {
      await updateUserPassword({
        variables: {
          data: {
            userId: user!.id,
            currentPassword,
            newPassword,
          },
        },
      });
      setSnackbar({
        severity: "success",
        message: "Password updated.",
      });
      setCurrentPassword("");
      setNewPassword("");
    } catch (e) {
      setSnackbar({
        severity: "error",
        message: "Incorrect passwords.",
      });
    } finally {
      setSnackbarOpen(true);
    }
  };

  return (
    <Container>
      {updateUserPasswordLoading && <FullScreenLoading />}

      <Typography variant="h6">
        {intl.formatMessage({
          id: "app.settings.accountSettings.changePassword",
        })}
      </Typography>
      <Stack spacing={4} sx={{ marginTop: 2 }}>
        <TextField
          required
          type="password"
          label={intl.formatMessage({
            id: "app.settings.accountSettings.changePassword.currentPassword",
          })}
          value={currentPassword}
          onChange={currentPasswordOnChange}
        />

        <TextField
          required
          type="password"
          label={intl.formatMessage({
            id: "app.settings.accountSettings.changePassword.newPassword",
          })}
          value={newPassword}
          onChange={newPasswordOnChange}
        />

        <Container
          sx={{ display: "flex", justifyContent: "flex-end" }}
          disableGutters
        >
          <Button
            disabled={!newPassword || !currentPassword}
            onClick={updatePassword}
          >
            {intl.formatMessage({ id: "app.general.update" })}
          </Button>
        </Container>
      </Stack>
    </Container>
  );
};

export default ChangePassword;
