import { CircularProgress, Fade, Stack, TextField, Typography } from "@mui/material";
import { useCheckUserEmail } from "../hooks/signupHooks";


const EmailPage = ({
  onChange,
  userEmail,
  setSnackbar,
  setSnackbarOpen
}) => {

  const {
    checkUserEmail,
    checkUserEmailData,
    checkUserEmailError,
    checkUserEmailLoading
  } = useCheckUserEmail();

  const renderEmailHelperText = () => {
    if ((checkUserEmailData && !checkUserEmailData.checkUserEmail) || !checkUserEmailData) {
      return "This should be an email that we can send billing information to."
    }
    return "Email taken."
  }

  const emailOnChange = async (e) => {
    onChange(e);
    try {
      await checkUserEmail({
        variables: {
          email: e.target.value
        },
        fetchPolicy: "no-cache"
      })
    } catch (error) {
      setSnackbar({
        severity: "error",
        message: "Something went wrong. Please try again."
      })
      setSnackbarOpen(true)
    }
  }

  return <>
    <Typography variant="h6" sx={{marginBottom: 4}} textAlign="left">Let's start with your email</Typography>
      <Stack spacing={2} textAlign="right">
        <Fade in={true}>
          <TextField 
            label="Billing Email" 
            type="email" 
            placeholder="Email" 
            name="userEmail" 
            value={userEmail} 
            onChange={emailOnChange} 
            helperText={renderEmailHelperText()}
            error={checkUserEmailData && checkUserEmailData.checkUserEmail}
            InputProps={{
              endAdornment: checkUserEmailLoading && <CircularProgress />
            }}
          >

          </TextField>

        </Fade>
      </Stack>
  </>
}

export default EmailPage;