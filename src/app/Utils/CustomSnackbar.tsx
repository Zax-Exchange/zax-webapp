import { Alert, AlertColor, Slide, SlideProps, Snackbar } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { SnackbarContext } from "../../context/SnackbarContext";

const renderTransition = (props: SlideProps) => {
  return <Slide {...props} direction="right" />;
};

// Make a static Snackbar so react renders properly
const CustomSnackbar = () => {
  const { setSnackbarOpen, snackbar, snackbarOpen } =
    useContext(SnackbarContext);

  return (
    <Snackbar
      open={snackbarOpen}
      onClose={() => setSnackbarOpen(false)}
      TransitionComponent={renderTransition}
      autoHideDuration={4000}
    >
      <Alert
        onClose={() => setSnackbarOpen(false)}
        severity={snackbar.severity}
        sx={{ width: "100%" }}
        elevation={2}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

// expose setState functions and snackbar component to consumers
const useCustomSnackbar = () => {
  const { setSnackbar, setSnackbarOpen } = useContext(SnackbarContext);

  return {
    setSnackbar,
    setSnackbarOpen,
    CustomSnackbar,
  };
};

export default useCustomSnackbar;
