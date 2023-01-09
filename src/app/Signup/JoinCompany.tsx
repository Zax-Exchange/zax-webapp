import { LoadingButton } from "@mui/lab";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { validate } from "email-validator";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useCheckCompanyNameLazyQuery } from "../gql/utils/company/company.generated";
import { useRequestToJoinMutation } from "../gql/utils/user/user.generated";
import useCustomSnackbar from "../Utils/CustomSnackbar";
import { isValidAlphanumeric } from "../Utils/inputValidators";

const JoinCompany = () => {
  const intl = useIntl();
  const [inputData, setInputData] = useState({
    userEmail: "",
    companyName: "",
  });

  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  const [
    checkCompanyName,
    {
      loading: checkCompanyNameLoading,
      data: checkCompanyNameData,
      error: checkCompanyNameError,
    },
  ] = useCheckCompanyNameLazyQuery();

  const [
    requestToJoin,
    {
      loading: requestToJoinLoading,
      error: requestToJoinError,
      data: requestToJoinData,
    },
  ] = useRequestToJoinMutation();

  const renderCompanyNameHelper = () => {
    if (checkCompanyNameData) {
      if (checkCompanyNameData.checkCompanyName) {
        return "Company Found!";
      } else {
        return "Company Does Not Exist";
      }
    }
    return " ";
  };

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const companyNameOnChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    inputOnChange(e);
    try {
      await checkCompanyName({
        variables: {
          data: {
            companyName: e.target.value,
          },
        },
      });
    } catch (error) {}
  };

  const sendRequestToCompany = async () => {
    try {
      await requestToJoin({
        variables: {
          data: {
            companyName: inputData.companyName,
            email: inputData.userEmail,
          },
        },
        fetchPolicy: "no-cache",
      });
      setSnackbar({
        message: intl.formatMessage({ id: "app.signup.requestToJoin.success" }),
        severity: "success",
      });
    } catch (error) {
      if ((error as Error).message === "duplicate email") {
        setSnackbar({
          message: intl.formatMessage({
            id: "app.error.signup.duplicateJoinRequest",
          }),
          severity: "error",
        });
      } else if ((error as Error).message === "existing user") {
        setSnackbar({
          message: intl.formatMessage({
            id: "app.error.signup.existingUser",
          }),
          severity: "error",
        });
      } else {
        setSnackbar({
          message: intl.formatMessage({ id: "app.general.network.error" }),
          severity: "error",
        });
      }
    } finally {
      setSnackbarOpen(true);
    }
  };

  const shouldDisableRequestButton = () => {
    return (
      !validate(inputData.userEmail) ||
      !checkCompanyNameData ||
      !checkCompanyNameData.checkCompanyName
    );
  };
  return (
    <Box>
      <Box display="flex" flexDirection="column">
        <TextField
          label="Company Name"
          type="text"
          name="companyName"
          value={inputData.companyName}
          onChange={companyNameOnChange}
          helperText={renderCompanyNameHelper()}
          InputProps={{
            endAdornment: checkCompanyNameLoading && (
              <CircularProgress size={20} />
            ),
          }}
          sx={{ mb: 3 }}
        />
        <TextField
          label="Your Email"
          type="email"
          name="userEmail"
          value={inputData.userEmail}
          onChange={inputOnChange}
        />
      </Box>

      <LoadingButton
        variant="contained"
        onClick={sendRequestToCompany}
        disabled={shouldDisableRequestButton()}
        loading={requestToJoinLoading}
        sx={{ mt: 2 }}
      >
        {intl.formatMessage({ id: "app.signup.requestToJoin" })}
      </LoadingButton>
    </Box>
  );
};

export default JoinCompany;
