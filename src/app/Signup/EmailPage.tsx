import { Fade, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";

const EmailPage = ({
  onChange,
  userEmail,
  setShouldDisableNext,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userEmail: string;
  setShouldDisableNext: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const intl = useIntl();
  // const [checkUserEmailQuery, { data, loading, error }] =
  //   useCheckUserEmailLazyQuery();

  // const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  // useEffect(() => {
  //   if (data && data.checkUserEmail) {
  //     // is duplicate
  //     setShouldDisableNext(true);
  //   } else {
  //     setShouldDisableNext(false);
  //   }
  // }, [data]);

  // not used right now, as billing email are allowed to be same
  // if we want to use this in the future, should implement throttle function
  // const emailOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   onChange(e);
  //   try {
  //     await checkUserEmailQuery({
  //       variables: {
  //         data: {
  //           email: e.target.value,
  //         },
  //       },
  //       fetchPolicy: "no-cache",
  //     });
  //   } catch (error) {
  //     setSnackbar({
  //       severity: "error",
  //       message: intl.formatMessage({ id: "app.general.network.error" }),
  //     });
  //     setSnackbarOpen(true);
  //   }
  // };

  // const shouldError = () => {
  //   if (data) {
  //     return data.checkUserEmail!;
  //   }
  //   return false;
  // };
  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: 4 }} textAlign="left">
        {intl.formatMessage({ id: "app.signup.billingEmail.pageTitle" })}
      </Typography>
      <Stack spacing={2} textAlign="right">
        <Fade in={true}>
          <TextField
            label={intl.formatMessage({ id: "app.general.email" })}
            type="email"
            name="userEmail"
            value={userEmail}
            onChange={(e) => onChange(e as React.ChangeEvent<HTMLInputElement>)}
            helperText={intl.formatMessage({
              id: "app.signup.billingEmail.helperText",
            })}
            // error={shouldError()}
            // InputProps={{
            //   endAdornment: loading && <CircularProgress size={20} />,
            // }}
          ></TextField>
        </Fade>
      </Stack>
    </>
  );
};

export default EmailPage;
