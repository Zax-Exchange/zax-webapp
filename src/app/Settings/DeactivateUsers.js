import { Autocomplete, Container, Dialog, DialogActions, DialogContent, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useGetAllCompanyUsers } from "../hooks/permissionHooks";
import { buttonTheme, PrimaryButton, SecondaryButton, WarningButton } from "../themedComponents/Buttons";
import FullScreenLoading from "../Utils/Loading";
import { useDeactivateUser } from "../hooks/userHooks";



const DeactivateUsers = ({
  setSnackbar,
  setSnackbarOpen
}) => {
  const { user } = useContext(AuthContext);

  const { 
    getAllCompanyUsersData,
    getAllCompanyUsersLoading,
    getAllCompanyUsersError
  } = useGetAllCompanyUsers(user.companyId);

  const {
    deactivateUser,
    deactivateUserLoading,
    deactivateUserError
  } = useDeactivateUser();

  const [emailsList, setEmailsList] = useState([]);
  const [email, setEmail] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (getAllCompanyUsersData && getAllCompanyUsersData.getAllUsersWithinCompany) {
      const res = [];
      for (let u of getAllCompanyUsersData.getAllUsersWithinCompany) {
        if (u.email !== user.email) res.push(u.email);
      }
      setEmailsList(res);
    }
  }, [getAllCompanyUsersData])
  const emailOnChange = (e) => {
    setEmail(e.target.value);
  }

  const selectHandler = (e) => {
    setEmail(e.target.innerHTML)
  }

  if (getAllCompanyUsersLoading || deactivateUserLoading) return <FullScreenLoading />

  if (getAllCompanyUsersError || deactivateUserError) {
    setSnackbar({
      severity: "error",
      message: "Something went wrong. Please try again later."
    })
    setSnackbarOpen(true);
  }

  const deactivateOnClick = async () => {
    try {
      await deactivateUser({
        variables: {
          email
        }
      });
      setSnackbar({
        severity: "success",
        message: "User deactivated."
      })
    } catch (e) {
      setSnackbar({
        severity: "error",
        message: "Something went wrong. Please try again later."
      })
    } finally {
      setSnackbarOpen(true);
    }
  }
  return <Container>
    
    <Typography variant="h6">Deactive Users</Typography>

    <ThemeProvider theme={buttonTheme}>
      <Stack spacing={4} sx={{marginTop: 2}}>
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
                type: 'search',
              }}
              onChange={emailOnChange} 
              value={email}
            />

          )}
        />
        
        <Container sx={{ display: "flex", justifyContent:"flex-end" }} disableGutters>
            <PrimaryButton 
              variant="contained" 
              onClick={() => setDialogOpen(true)}
            >
              Deactivate user
            </PrimaryButton>
        </Container>
      </Stack>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md">
        <DialogContent>
          <Typography variant="h6" textAlign="center">Are you sure?</Typography>

          <DialogActions>
            <WarningButton onClick={deactivateOnClick} variant="contained">
              Confirm
            </WarningButton>
            <SecondaryButton onClick={() => setDialogOpen(false)} variant="contained">
              Cancel
            </SecondaryButton>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  </Container>
}

export default DeactivateUsers;