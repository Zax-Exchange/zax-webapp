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
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useGetAllCompanyUsers } from "../hooks/permissionHooks";
import FullScreenLoading from "../Utils/Loading";
import { useDeactivateUser } from "../hooks/userHooks";

const DeactivateUsers = ({ setSnackbar, setSnackbarOpen }) => {
  const { user } = useContext(AuthContext);

  const {
    getAllCompanyUsersData,
    getAllCompanyUsersLoading,
    getAllCompanyUsersError,
  } = useGetAllCompanyUsers(user.companyId);

  const { deactivateUser, deactivateUserLoading, deactivateUserError } =
    useDeactivateUser();

  const [emailsList, setEmailsList] = useState([]);
  const [email, setEmail] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (
      getAllCompanyUsersData &&
      getAllCompanyUsersData.getAllUsersWithinCompany
    ) {
      const res = [];
      for (let u of getAllCompanyUsersData.getAllUsersWithinCompany) {
        if (u.email !== user.email) res.push(u.email);
      }
      setEmailsList(res);
    }
  }, [getAllCompanyUsersData, user.email]);

  useEffect(() => {
    if (getAllCompanyUsersError) {
      setSnackbar({
        severity: "error",
        message: "Something went wrong. Please try again later.",
      });
      setSnackbarOpen(true);
    }
  }, [getAllCompanyUsersError, setSnackbar, setSnackbarOpen]);

  const emailOnChange = (e) => {
    setEmail(e.target.value);
  };

  const selectHandler = (e) => {
    setEmail(e.target.innerHTML);
  };

  const deactivateOnClick = async () => {
    try {
      await deactivateUser({
        variables: {
          email,
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
          onChange={selectHandler}
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
