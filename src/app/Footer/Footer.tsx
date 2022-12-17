import { Copyright, Language } from "@mui/icons-material";
import {
  Box,
  IconButton,
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
          // PaperProps={{
          //   style: {
          //     maxHeight: "120px",
          //   },
          // }}
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
            marginLeft: "auto",
            mr: 1,
            fontSize: "13px",
          }}
        >
          <Copyright fontSize="small" sx={{ fontSize: "13px", mr: 1 }} />
          <Typography variant="caption" fontSize="13px">
            2023, Zax Exchange LLC
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
