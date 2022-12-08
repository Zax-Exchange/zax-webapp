import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { validate } from "email-validator";
import React from "react";
import { useGetBillingEmailQuery } from "../gql/get/subscription/subscription.generated";
import { useUpdateBillingEmailMutation } from "../gql/update/subscription/subscription.generated";
import { useIntl } from "react-intl";
import useCustomSnackbar from "../Utils/CustomSnackbar";
import { LoadingButton } from "@mui/lab";

/** ADMIN VIEW */
const UpdateBillingEmail = () => {
  const { user } = useContext(AuthContext);
  const intl = useIntl();
  const [email, setEmail] = useState("");
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const {
    data: getBillingEmailData,
    loading: getBillingEmailLoading,
    error: getBillingEmailError,
  } = useGetBillingEmailQuery({
    variables: {
      data: {
        companyId: user!.companyId,
      },
    },
  });

  const [
    updateBillingEmail,
    {
      loading: updateBillingEmailLoading,
      error: updateBillingEmailError,
      data: updateBillingEmailData,
    },
  ] = useUpdateBillingEmailMutation();

  const emailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (getBillingEmailError || updateBillingEmailError) {
      if (updateBillingEmailError?.message.includes("duplicate email")) {
        setSnackbar({
          message: intl.formatMessage({
            id: "app.settings.manageBillingInfo.updateBillingEmail.duplicateEmailError",
          }),
          severity: "error",
        });
      } else {
        setSnackbar({
          message: intl.formatMessage({
            id: "app.general.network.error",
          }),
          severity: "error",
        });
      }
      setSnackbarOpen(true);
    }
  }, [getBillingEmailError, updateBillingEmailError]);

  useEffect(() => {
    if (updateBillingEmailData && updateBillingEmailData.updateBillingEmail) {
      setSnackbar({
        message: intl.formatMessage({
          id: "app.general.network.success",
        }),
        severity: "success",
      });
      setSnackbarOpen(true);
    }
  }, [updateBillingEmailData]);

  const updateBillingOnClick = async () => {
    try {
      await updateBillingEmail({
        variables: {
          data: {
            email,
            companyId: user!.companyId,
          },
        },
      });
    } catch (error) {}
  };

  return (
    <Container>
      <Typography variant="h6">
        {intl.formatMessage({
          id: "app.settings.manageBillingInfo.updateBillingEmail",
        })}
      </Typography>

      <Stack spacing={4} sx={{ marginTop: 2 }}>
        <TextField
          label={intl.formatMessage({
            id: "app.company.attribute.billingEmail",
          })}
          placeholder={
            !!getBillingEmailData ? getBillingEmailData.getBillingEmail : ""
          }
          size="small"
          value={email}
          onChange={emailOnChange}
        />

        <Container
          sx={{ display: "flex", justifyContent: "flex-end" }}
          disableGutters
        >
          <LoadingButton
            variant="outlined"
            disabled={!validate(email)}
            onClick={updateBillingOnClick}
            loading={updateBillingEmailLoading}
          >
            {intl.formatMessage({ id: "app.general.update" })}
          </LoadingButton>
        </Container>
      </Stack>
    </Container>
  );
};

export default UpdateBillingEmail;
