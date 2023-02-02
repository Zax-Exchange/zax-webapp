import { BugReport } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { validate } from "email-validator";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import { isValidAlphanumeric } from "../../Utils/inputValidators";

/** NOT USED RIGHT NOW */
const BugReportForm = ({
  setBugFormOpen,
}: {
  setBugFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const intl = useIntl();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [response, setResponse] = useState({
    email: "",
    whatAreYouTryingToDo: "",
    whatIsTheProblem: "",
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const val = e.target.value;
    const isAllowed = isValidAlphanumeric(val);

    if (isAllowed) {
      setResponse((prev) => ({
        ...prev,
        [e.target.name]: val,
      }));
    }
  };

  const shouldDisableFormSubmitButton = () => {
    return !(
      validate(response.email) &&
      response.whatAreYouTryingToDo &&
      response.whatIsTheProblem
    );
  };

  const sendBugReport = async () => {
    try {
      setSnackbar({
        message: intl.formatMessage({
          id: "app.feedback.action.bugReport.reported",
        }),
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        message: intl.formatMessage({
          id: "app.general.network.error",
        }),
        severity: "error",
      });
    } finally {
      setSnackbarOpen(true);
      setBugFormOpen(false);
    }
  };
  return (
    <>
      <DialogContent>
        <Box display="flex" sx={{ mb: 2 }}>
          <Typography variant="h6">
            {intl.formatMessage({ id: "app.feedback.action.bugReport" })}
          </Typography>
          <Box display="flex" alignItems="center">
            <BugReport color="info" sx={{ ml: 1 }} />
          </Box>
        </Box>
        <Box>
          <Box sx={{ mb: 4 }}>
            <Box>
              <TextField
                placeholder={intl.formatMessage({ id: "app.general.email" })}
                type="email"
                name="email"
                required
                onChange={onChange}
              />
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Box>
              <TextareaAutosize
                placeholder={intl.formatMessage({
                  id: "app.feedback.action.bugReport.whatAreYouTryingToDo",
                })}
                onChange={onChange}
                name="whatAreYouTryingToDo"
                minRows={3}
              />
            </Box>
          </Box>

          <Box>
            <Box>
              <TextareaAutosize
                placeholder={intl.formatMessage({
                  id: "app.feedback.action.bugReport.whatIsTheProblem",
                })}
                onChange={onChange}
                name="whatIsTheProblem"
                minRows={3}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => setBugFormOpen(false)}>
          {intl.formatMessage({ id: "app.general.cancel" })}
        </Button>
        <LoadingButton
          variant="contained"
          onClick={sendBugReport}
          disabled={shouldDisableFormSubmitButton()}
          loading={false}
        >
          {intl.formatMessage({ id: "app.general.send" })}
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default BugReportForm;
