import {
  Box,
  Dialog,
  Menu,
  MenuItem,
  MenuList,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

import { CUSTOMER_ROUTES } from "../../constants/loggedInRoutes";
import ReactGA from "react-ga4";
import {
  EVENT_ACTION,
  EVENT_CATEGORY,
  EVENT_LABEL,
} from "../../../analytics/constants";
import ImportProjectModal from "./modals/ImportProjectModal";
import { InfoSharp } from "@mui/icons-material";
import mixpanel from "mixpanel-browser";

const NewProjectMenu = ({
  newProjectMenuAnchor,
  newProjectMenuOpen,
  newProjectOnClose,
}: {
  newProjectMenuAnchor: HTMLButtonElement | null;
  newProjectMenuOpen: boolean;
  newProjectOnClose: () => void;
}) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const intl = useIntl();
  const [importModalOpen, setImportModalOpen] = useState(false);

  const navigateToProjectCreationPage = (
    route:
      | CUSTOMER_ROUTES.ADVANCED_CREATE_PROJECT
      | CUSTOMER_ROUTES.GUIDED_CREATE_PROJECT
  ) => {
    navigate(route);
    newProjectOnClose();
  };

  const renderMenuItemContent = (menuText: string, menuTooltip: string) => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography variant="caption" fontWeight={600}>
          {menuText}
        </Typography>
        <Tooltip title={menuTooltip} placement="left">
          <InfoSharp sx={{ fontSize: "16px" }} color="info" />
        </Tooltip>
      </Box>
    );
  };
  return (
    <>
      <Menu
        id="new-project-menu"
        anchorEl={newProjectMenuAnchor}
        open={newProjectMenuOpen}
        onClose={newProjectOnClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            width: "160px",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuList dense sx={{ padding: "4px 0 4px" }}>
          <MenuItem
            onClick={() =>
              navigateToProjectCreationPage(
                CUSTOMER_ROUTES.GUIDED_CREATE_PROJECT
              )
            }
          >
            {renderMenuItemContent(
              intl.formatMessage({
                id: "app.customer.createProject.guidedCreate",
              }),
              intl.formatMessage({
                id: "app.customer.createProject.guidedCreate.tooltip",
              })
            )}
          </MenuItem>

          <MenuItem
            onClick={() =>
              navigateToProjectCreationPage(
                CUSTOMER_ROUTES.ADVANCED_CREATE_PROJECT
              )
            }
          >
            {renderMenuItemContent(
              intl.formatMessage({
                id: "app.customer.createProject.advancedCreate",
              }),
              intl.formatMessage({
                id: "app.customer.createProject.advancedCreate.tooltip",
              })
            )}
          </MenuItem>

          <MenuItem
            onClick={() => {
              mixpanel.track(EVENT_ACTION.CLICK, {
                category: EVENT_CATEGORY.PROJECT,
                label: EVENT_LABEL.IMPORT_PROJECT,
              });
              ReactGA.event({
                action: EVENT_ACTION.CLICK,
                category: EVENT_CATEGORY.PROJECT,
                label: EVENT_LABEL.IMPORT_PROJECT,
              });
              setImportModalOpen(true);
            }}
          >
            {renderMenuItemContent(
              intl.formatMessage({
                id: "app.customer.createProject.import",
              }),
              intl.formatMessage({
                id: "app.customer.createProject.import.tooltip",
              })
            )}
          </MenuItem>
        </MenuList>
      </Menu>
      <Dialog
        open={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        maxWidth="md"
      >
        <ImportProjectModal
          closeModal={() => setImportModalOpen(false)}
          newProjectOnClose={newProjectOnClose}
        />
      </Dialog>
    </>
  );
};

export default NewProjectMenu;
