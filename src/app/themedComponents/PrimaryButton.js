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
      main: "#334bb0",
      hover: "#465da9"
    }
  },
});