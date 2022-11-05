import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

const PermissionDenied = () => {
  const intl = useIntl();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <DialogTitle>
        {intl.formatMessage({
          id: "app.general.permission.denied",
        })}
      </DialogTitle>
      <DialogContent>
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
