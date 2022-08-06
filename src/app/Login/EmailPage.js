import { Stack, TextField, Typography } from "@mui/material";
import { useCheckUserEmail } from "../hooks/signupHooks";


const EmailPage = ({
  onChange,
  email
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
    await checkUserEmail({
      variables: {
        email: e.target.value
      },
      fetchPolicy: "no-cache"
    })
  }

  return <>
    <Typography variant="h6" sx={{marginBottom: 4}} textAlign="left">Let's start with your email</Typography>
    <Stack spacing={2} textAlign="right">
      <TextField 
        label="Billing Email" 
        type="email" 
        placeholder="Email" 
        name="userEmail" 
        value={email} 
        onChange={emailOnChange} 
        helperText={renderEmailHelperText()}
        error={checkUserEmailData && checkUserEmailData.checkUserEmail}
      >

      </TextField>

    </Stack>
  </>
}

export default EmailPage;