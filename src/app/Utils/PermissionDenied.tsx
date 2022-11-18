import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { GENERAL_ROUTES } from "../constants/loggedInRoutes";

const PermissionDenied = () => {
  const intl = useIntl();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(GENERAL_ROUTES.HOME);
  };

  return (
    <>
      <DialogTitle>
        {intl.formatMessage({
          id: "app.general.permission.denied.title",
        })}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {intl.formatMessage({ id: "app.general.permission.denied.content" })}
        </DialogContentText>
        <DialogActions>
          <Button variant="contained" onClick={goBack}>
            {intl.formatMessage({ id: "app.general.ok" })}
          </Button>
        </DialogActions>
      </DialogContent>
    </>
  );
};

export default PermissionDenied;
