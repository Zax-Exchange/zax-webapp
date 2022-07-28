import { Button, createTheme, styled } from "@mui/material";

export const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.buttons.primary.main,
  "&:hover": {
    backgroundColor: theme.buttons.primary.hover
  } 
}));

export const primaryButtonTheme = createTheme({
  buttons: {
    primary: {
      hover: "#606c97",
      main: "#4c5678"
    }
  },
});