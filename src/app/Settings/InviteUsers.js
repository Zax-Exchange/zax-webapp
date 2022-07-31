import { Container, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react"
import { buttonTheme, PrimaryButton } from "../themedComponents/PrimaryButton";
import { validate } from "react-email-validator";
import { useInviteUser } from "./hooks/companyHooks";
import CustomSnackbar from "../Utils/CustomSnackbar";
import { AuthContext } from "../../context/AuthContext";


const InviteUsers = ({
  setSnackbar,
  setSnackbarOpen
}) => {
  const { user } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const { inviteUser, inviteUserLoading, inviteUserData, inviteUserError } = useInviteUser();
  

  useEffect(() => {
    if (inviteUserError) {
      setSnackbar({
        severity: "error",
        message: "Something went wrong. Please try again later."
      })
      setSnackbarOpen(true);
    }
    if (inviteUserData) {
      setSnackbar({
        severity: "success",
        message: "Invitation sent!"
      })
      setSnackbarOpen(true);
    }

  }, [inviteUserError, inviteUserData]);

  const emailOnChange = (e) => {
    setEmail(e.target.value);
  }

  const sendInvitation = () => {
    inviteUser({
      variables: {
        email,
        userId: user.id
      }
    })
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
            disabled={!validate(email)}
            onClick={sendInvitation}
          >
            Send invitation
          </PrimaryButton>
      </ThemeProvider>
      </Container>
    </Stack>
  </Container>
}

export default InviteUsers