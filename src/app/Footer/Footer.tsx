import { Language } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Link,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import {
  Locale,
  LocaleContext,
  SUPPORTED_LOCALES,
} from "../../context/LocaleContext";
import { openLink } from "../Utils/openLink";

const Footer = () => {
  const intl = useIntl();
  const [localeMenuAnchor, setLocaleMenuAnchor] =
    useState<HTMLButtonElement | null>(null);

  const localeMenuOpen = !!localeMenuAnchor;

  const { setLocale } = useContext(LocaleContext);

  const setLocaleOnClick = (locale: Locale) => {
    localStorage.setItem("user-locale", locale);

    setLocale(locale);
    setLocaleMenuAnchor(null);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        bottom: 0,
        background: "white",
        borderTop: "1px solid #ebe8e8",
        height: "40px",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <IconButton
          onClick={(e) => setLocaleMenuAnchor(e.currentTarget)}
          sx={{ ml: 2 }}
        >
          <Language color="primary" />
        </IconButton>
        <Menu
          id="locale-menu"
          anchorEl={localeMenuAnchor}
          open={localeMenuOpen}
          onClose={() => setLocaleMenuAnchor(null)}
        >
          <MenuList dense sx={{ padding: "4px 0 4px" }}>
            {SUPPORTED_LOCALES.map((locale) => {
              return (
                <MenuItem onClick={() => setLocaleOnClick(locale)}>
                  {intl.formatMessage({ id: `app.locale.${locale}` })}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            ml: 1,
            ":hover": {
              cursor: "pointer",
            },
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontSize: "0.8rem" }}
            onClick={() =>
              openLink(
                "https://app.termly.io/document/terms-and-conditions/9168f760-6b6c-4c5f-916d-867462a8c2db"
              )
            }
          >
            Terms of Service
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            ml: 1,
            ":hover": {
              cursor: "pointer",
            },
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontSize: "0.8rem" }}
            onClick={() =>
              openLink(
                "https://app.termly.io/document/privacy-policy/261339a9-d1a3-4426-baf1-ce0c45836c8d"
              )
            }
          >
            Privacy Policy
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: "auto",
            mr: 1,
            fontSize: "13px",
          }}
        >
          <Typography variant="caption" fontSize="13px">
            © 2023, Zax Exchange LLC
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
