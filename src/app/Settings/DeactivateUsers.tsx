import {
  Autocomplete,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { validate } from "graphql";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { User } from "../../generated/graphql";
import { useDeactivateUserMutation } from "../gql/delete/user/user.generated";
import { useGetAllUsersWithinCompanyQuery } from "../gql/get/company/company.generated";
import useCustomSnackbar from "../Utils/CustomSnackbar";
import FullScreenLoading from "../Utils/Loading";

const DeactivateUsers = () => {
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const {
    data: getAllCompanyUsersData,
    loading: getAllCompanyUsersLoading,
    error: getAllCompanyUsersError,
  } = useGetAllUsersWithinCompanyQuery({
    variables: {
      data: {
        companyId: user!.companyId,
      },
    },
  });

  const [
    deactivateUser,
    { loading: deactivateUserLoading, error: deactivateUserError },
  ] = useDeactivateUserMutation();

  const [emailsList, setEmailsList] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (
      getAllCompanyUsersData &&
      getAllCompanyUsersData.getAllUsersWithinCompany
    ) {
      const res = [];
      for (let u of getAllCompanyUsersData.getAllUsersWithinCompany) {
        if (u!.email !== user!.email) res.push(u!.email);
      }
      setEmailsList(res);
    }
  }, [getAllCompanyUsersData]);

  useEffect(() => {
    if (getAllCompanyUsersError) {
      setSnackbar({
        severity: "error",
        message: "Something went wrong. Please try again later.",
      });
      setSnackbarOpen(true);
    }
  }, [getAllCompanyUsersError]);

  const emailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const selectHandler = (v: string) => {
    setEmail(v);
  };

  const deactivateOnClick = async () => {
    setDialogOpen(false);
    try {
      await deactivateUser({
        variables: {
          data: {
            email,
          },
        },
      });

      setSnackbar({
        severity: "success",
        message: "User deactivated.",
      });
    } catch (e) {
      setSnackbar({
        severity: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setSnackbarOpen(true);
    }
  };

  if (getAllCompanyUsersLoading || deactivateUserLoading)
    return <FullScreenLoading />;

  if (getAllCompanyUsersError) {
    return null;
  }

  return (
    <Container>
      <Typography variant="h6">Deactivate Users</Typography>

      <Stack spacing={4} sx={{ marginTop: 2 }}>
        <Autocomplete
          // sx={{width: 300}}
          freeSolo
          disableClearable
          options={emailsList}
          onChange={(e, v) => selectHandler(v)}
          value={email}
          renderInput={(params) => (
            <TextField
              {...params}
              label="User email"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
              onChange={emailOnChange}
              value={email}
            />
          )}
        />

        <Container
          sx={{ display: "flex", justifyContent: "flex-end" }}
          disableGutters
        >
          <Button onClick={() => setDialogOpen(true)}>Deactivate user</Button>
        </Container>
      </Stack>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
      >
        <DialogContent>
          <Typography variant="h6" textAlign="center">
            Are you sure?
          </Typography>

          <DialogActions>
            <Button
              onClick={deactivateOnClick}
              variant="contained"
              color="error"
            >
              Confirm
            </Button>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default DeactivateUsers;
