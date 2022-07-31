import { Container, Dialog, DialogContent, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useGetAllCompanyUsers } from "../Projects/permissionHooks";
import { buttonTheme, PrimaryButton } from "../themedComponents/PrimaryButton";


const DeactivateUsers = ({
  setSnackbar,
  setSnackbarOpen
}) => {
  const { user } = useContext(AuthContext);
  const { getAllCompanyUsersData } = useGetAllCompanyUsers(user.companyId);
  const [email, setEmail] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const emailOnChange = (e) => {
    setEmail(e.target.value);
  }


  return <Container>
    
    <Typography variant="h6">Invite Users</Typography>

    <Stack spacing={4} sx={{marginTop: 2}}>
      <TextField 
        label="User email"
        placeholder="Send invitation with user email"
        value={email}
        onChange={emailOnChange}
      />
      
      <Container sx={{ display: "flex", justifyContent:"flex-end" }} disableGutters>
        <ThemeProvider theme={buttonTheme}>
          <PrimaryButton 
            variant="contained" 
            onClick={() => setDialogOpen(true)}
          >
            Deactivate user
          </PrimaryButton>
      </ThemeProvider>
      </Container>
    </Stack>

    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <DialogContent>
        Are you sure?
      </DialogContent>
    </Dialog>
  </Container>
}

export default DeactivateUsers;