import { Button, createTheme, styled } from "@mui/material";

export const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.buttons.primary.main,
  "&:hover": {
    backgroundColor: theme.buttons.primary.hover
  } 
}));

export const buttonTheme = createTheme({
  buttons: {
    primary: {
      hover: "#606c97",
      main: "#4c5678"
    },
    secondary: {
      main: "#2d567d",
      hover: "#2d567d"
    },
    warning: {
      main: "#eb5e5e",
      hover: "#e47272"
    }
  },
});

export const SecondaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.buttons.secondary.main,
  "&:hover": {
    backgroundColor: theme.buttons.secondary.hover
  }
}));

export const WarningButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.buttons.warning.main,
  "&:hover": {
    backgroundColor: theme.buttons.warning.hover
  }
}))

