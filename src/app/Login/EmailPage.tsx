import {
  CircularProgress,
  Fade,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useCheckUserEmailLazyQuery } from "../../generated/graphql";
import useCustomSnackbar from "../Utils/CustomSnackbar";

const EmailPage = ({
  onChange,
  userEmail,
  setShouldDisableNext,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userEmail: string;
  setShouldDisableNext: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [checkUserEmailQuery, { data, loading, error }] =
    useCheckUserEmailLazyQuery();

  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  const renderEmailHelperText = () => {
    if ((data && !data.checkUserEmail) || !data) {
      return "This should be an email that we can send billing information to.";
    }
    return "Email taken.";
  };

  useEffect(() => {
    if (data && data.checkUserEmail) {
      // is duplicate
      setShouldDisableNext(true);
    } else {
      setShouldDisableNext(false);
    }
  }, [data]);

  const emailOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    try {
      await checkUserEmailQuery({
        variables: {
          email: e.target.value,
        },
        fetchPolicy: "no-cache",
      });
    } catch (error) {
      setSnackbar({
        severity: "error",
        message: "Something went wrong. Please try again.",
      });
      setSnackbarOpen(true);
    }
  };

  const shouldError = () => {
    if (data) {
      return data.checkUserEmail!;
    }
    return false;
  };
  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: 4 }} textAlign="left">
        Let's start with your email
      </Typography>
      <Stack spacing={2} textAlign="right">
        <Fade in={true}>
          <TextField
            label="Billing Email"
            type="email"
            name="userEmail"
            value={userEmail}
            onChange={emailOnChange}
            helperText={renderEmailHelperText()}
            error={shouldError()}
            InputProps={{
              endAdornment: loading && <CircularProgress size={20} />,
            }}
          ></TextField>
        </Fade>
      </Stack>
    </>
  );
};

export default EmailPage;
