import { Alert, AlertColor, Slide, SlideProps, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";

const useCustomSnackbar = () => {
  const [snackbar, setSnackbar] = useState({
    message: "",
    severity: undefined,
  } as {
    message: string | "";
    severity: AlertColor | undefined;
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // const renderTransition = (props: SlideProps) => {
  //   return <Slide direction="right" />;
  // };

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  const CustomSnackbar = (
    <Snackbar
      open={snackbarOpen}
      onClose={handleClose}
      // TransitionComponent={renderTransition}
      autoHideDuration={4000}
    >
      <Alert
        onClose={handleClose}
        severity={snackbar.severity}
        sx={{ width: "100%" }}
        elevation={2}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );

  return {
    setSnackbar,
    setSnackbarOpen,
    CustomSnackbar,
  };
};

export default useCustomSnackbar;
