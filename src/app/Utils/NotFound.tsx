import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { GENERAL_ROUTES } from "../constants/loggedInRoutes";

const NotFound = ({ description }: { description: string }) => {
  const navigate = useNavigate();
  const intl = useIntl();

  return (
    <>
      <DialogTitle>
        {intl.formatMessage({
          id: "app.error",
        })}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => navigate(GENERAL_ROUTES.HOME)}
            sx={{ mt: 1.5 }}
          >
            {intl.formatMessage({ id: "app.general.ok" })}
          </Button>
        </DialogActions>
      </DialogContent>
    </>
  );
};

export default NotFound;
