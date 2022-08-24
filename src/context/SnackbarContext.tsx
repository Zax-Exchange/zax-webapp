import { AlertColor } from "@mui/material";
import React, { useState } from "react";

type SnackbarProps = {
  message: string | "";
  severity: AlertColor | undefined;
};

type SnackbarContext = {
  setSnackbar: React.Dispatch<React.SetStateAction<SnackbarProps>>;
  setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  snackbar: SnackbarProps;
  snackbarOpen: boolean;
};

export const SnackbarContext = React.createContext<SnackbarContext>({
  setSnackbar: () => {},
  setSnackbarOpen: () => {},
  snackbar: {
    message: "",
    severity: undefined,
  },
  snackbarOpen: false,
});

export const SnackbarContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [snackbar, setSnackbar] = useState<SnackbarProps>({
    message: "",
    severity: undefined,
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  return (
    <SnackbarContext.Provider
      value={{
        setSnackbar,
        setSnackbarOpen,
        snackbar,
        snackbarOpen,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};
