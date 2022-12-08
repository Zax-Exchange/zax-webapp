import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  AccordionSummaryProps,
  Box,
  Button,
  Container,
  Divider,
  Fade,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemProps,
  ListItemText,
  ListItemTextProps,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
  TypographyProps,
} from "@mui/material";
import React from "react";
import { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { AuthContext } from "../../../context/AuthContext";
import { UserPower } from "../../../generated/graphql";
import ChangePassword from "../ChangePassword";
import ChangePlan from "../ChangePlan";
import CustomerDeactivateUsers from "./CustomerDeactivateUsers";
import CustomerManageInvitations from "./CustomerManageInvitations";
import InviteUsers from "./CustomerManageInvitations";
import UpdateBillingEmail from "../UpdateBillingEmail";
import EditCustomerProfile from "./EditCustomerProfile";
import UpdateUserPower from "../UpdateUserPower";

enum CUSTOMER_SETTINGS_ROUTE {
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
  EDIT_COMPANY_PROFILE = "EDIT_COMPANY_PROFILE",
  DEACTIVE_COMPANY = "DEACTIVE_COMPANY",
  MANAGE_INVITATIONS = "MANAGE_INVITATIONS",
  DEACTIVATE_USERS = "DEACTIVATE_USERS",
  UPDATE_USER_POWER = "UPDATE_USER_POWER",
  UPDATE_BILLING_EMAIL = "UPDATE_BILLING_EMAIL",
  VIEW_INVOICES = "VIEW_INVOICES",
}

const NoWrapListItemText = styled(
  (props: ListItemTextProps & { text: string }) => {
    return (
      <ListItemText
        {...props}
        primary={
          <Typography variant="subtitle2" color="#545454" fontSize="0.9em">
            {props.text}
          </Typography>
        }
      />
    );
  }
)(({ theme }) => ({
  whiteSpace: "nowrap",
  "& > .MuiTypography-root": {
    textOverflow: "ellipsis",
    overflow: "auto",
  },
}));

const SettingsAccordion = styled((props: AccordionProps) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&:before": {
    display: "none",
  },
}));

const SettingsAccordionSummary = styled((props: AccordionSummaryProps) => {
  return <AccordionSummary {...props} expandIcon={<ExpandMore />} />;
})(({ theme }) => ({
  "&:hover": {
    backgroundColor: "#eee",
  },
}));

const SettingsTitleTypography = styled((props: TypographyProps) => {
  return <Typography variant="h6" {...props} />;
})(() => ({
  fontSize: 16,
}));

const CustomerSettings = () => {
  const { user } = useContext(AuthContext);
  const intl = useIntl();
  const power = user!.power;
  const isAdmin = power === UserPower.Admin;

  const [expanded, setExpanded] = useState<string | boolean>("");
  const [settingView, setSettingView] = useState<null | JSX.Element>(null);

  const handleChange =
    (panel: string) =>
    (event: React.SyntheticEvent<Element, Event>, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const renderSettingsView = (view: CUSTOMER_SETTINGS_ROUTE) => {
    if (view === CUSTOMER_SETTINGS_ROUTE.CHANGE_PASSWORD) {
      setSettingView(<ChangePassword />);
    }

    if (view === CUSTOMER_SETTINGS_ROUTE.EDIT_COMPANY_PROFILE) {
      setSettingView(<EditCustomerProfile />);
    }
    if (view === CUSTOMER_SETTINGS_ROUTE.MANAGE_INVITATIONS) {
      setSettingView(<CustomerManageInvitations />);
    }

    if (view === CUSTOMER_SETTINGS_ROUTE.DEACTIVATE_USERS) {
      setSettingView(<CustomerDeactivateUsers />);
    }
    if (view === CUSTOMER_SETTINGS_ROUTE.UPDATE_BILLING_EMAIL) {
      setSettingView(<UpdateBillingEmail />);
    }

    if (view === CUSTOMER_SETTINGS_ROUTE.UPDATE_USER_POWER) {
      setSettingView(<UpdateUserPower />);
    }
  };

  return (
    <Fade in={true} timeout={500}>
      <Container maxWidth="lg">
        <Grid container spacing={2.5}>
          <Grid item xs={3.5}>
            <Paper sx={{ borderRadius: 1 }}>
              <SettingsAccordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <SettingsAccordionSummary>
                  <SettingsTitleTypography>
                    {intl.formatMessage({ id: "app.settings.accountSettings" })}
                  </SettingsTitleTypography>
                </SettingsAccordionSummary>
                <AccordionDetails>
                  <Stack>
                    {/* <ListItem disableGutters>
                    <ListItemButton>
                      <NoWrapListItemText primary="Edit user profile"></NoWrapListItemText>
                    </ListItemButton>
                  </ListItem> */}

                    <ListItem
                      disableGutters
                      onClick={() =>
                        renderSettingsView(
                          CUSTOMER_SETTINGS_ROUTE.CHANGE_PASSWORD
                        )
                      }
                    >
                      <ListItemButton>
                        <NoWrapListItemText text="Change password"></NoWrapListItemText>
                      </ListItemButton>
                    </ListItem>
                  </Stack>
                </AccordionDetails>
              </SettingsAccordion>

              {isAdmin && (
                <SettingsAccordion
                  expanded={expanded === "panel2"}
                  onChange={handleChange("panel2")}
                >
                  <SettingsAccordionSummary>
                    <SettingsTitleTypography>
                      {intl.formatMessage({
                        id: "app.settings.companySettings",
                      })}
                    </SettingsTitleTypography>
                  </SettingsAccordionSummary>
                  <AccordionDetails>
                    <Stack>
                      <ListItem
                        disableGutters
                        onClick={() =>
                          renderSettingsView(
                            CUSTOMER_SETTINGS_ROUTE.EDIT_COMPANY_PROFILE
                          )
                        }
                      >
                        <ListItemButton>
                          <NoWrapListItemText
                            text={intl.formatMessage({
                              id: "app.settings.companySettings.editCompanyProfile",
                            })}
                          ></NoWrapListItemText>
                        </ListItemButton>
                      </ListItem>

                      <ListItem disableGutters>
                        <ListItemButton>
                          <NoWrapListItemText text="Deactivate company"></NoWrapListItemText>
                        </ListItemButton>
                      </ListItem>
                    </Stack>
                  </AccordionDetails>
                </SettingsAccordion>
              )}

              {isAdmin && (
                <SettingsAccordion
                  expanded={expanded === "panel3"}
                  onChange={handleChange("panel3")}
                >
                  <SettingsAccordionSummary>
                    <SettingsTitleTypography>
                      {intl.formatMessage({
                        id: "app.settings.manageCompanyUsers",
                      })}
                    </SettingsTitleTypography>
                  </SettingsAccordionSummary>
                  <AccordionDetails>
                    <Stack>
                      <ListItem
                        disableGutters
                        onClick={() =>
                          renderSettingsView(
                            CUSTOMER_SETTINGS_ROUTE.MANAGE_INVITATIONS
                          )
                        }
                      >
                        <ListItemButton>
                          <NoWrapListItemText
                            text={intl.formatMessage({
                              id: "app.settings.manageCompanyUsers.manageInvitations",
                            })}
                          ></NoWrapListItemText>
                        </ListItemButton>
                      </ListItem>

                      <ListItem
                        disableGutters
                        onClick={() =>
                          renderSettingsView(
                            CUSTOMER_SETTINGS_ROUTE.DEACTIVATE_USERS
                          )
                        }
                      >
                        <ListItemButton>
                          <NoWrapListItemText
                            text={intl.formatMessage({
                              id: "app.settings.manageCompanyUsers.deactivateUsers",
                            })}
                          ></NoWrapListItemText>
                        </ListItemButton>
                      </ListItem>

                      <ListItem
                        disableGutters
                        onClick={() =>
                          renderSettingsView(
                            CUSTOMER_SETTINGS_ROUTE.UPDATE_USER_POWER
                          )
                        }
                      >
                        <ListItemButton>
                          <NoWrapListItemText
                            text={intl.formatMessage({
                              id: "app.settings.manageCompanyUsers.updateUserPower",
                            })}
                          ></NoWrapListItemText>
                        </ListItemButton>
                      </ListItem>
                    </Stack>
                  </AccordionDetails>
                </SettingsAccordion>
              )}

              {isAdmin && (
                <SettingsAccordion
                  expanded={expanded === "panel4"}
                  onChange={handleChange("panel4")}
                >
                  <SettingsAccordionSummary>
                    <SettingsTitleTypography>
                      {intl.formatMessage({
                        id: "app.settings.manageBillingInfo",
                      })}
                    </SettingsTitleTypography>
                  </SettingsAccordionSummary>
                  <AccordionDetails>
                    <Stack>
                      {/* <ListItem
                      disableGutters
                      onClick={() => renderSettingsView("view-current-plan")}
                    >
                      <ListItemButton>
                        <NoWrapListItemText text="View current plan"></NoWrapListItemText>
                      </ListItemButton>
                    </ListItem> */}

                      <ListItem
                        disableGutters
                        onClick={() =>
                          renderSettingsView(
                            CUSTOMER_SETTINGS_ROUTE.UPDATE_BILLING_EMAIL
                          )
                        }
                      >
                        <ListItemButton>
                          <NoWrapListItemText text="Update billing email"></NoWrapListItemText>
                        </ListItemButton>
                      </ListItem>

                      <ListItem
                        disableGutters
                        onClick={() =>
                          renderSettingsView(
                            CUSTOMER_SETTINGS_ROUTE.VIEW_INVOICES
                          )
                        }
                      >
                        <ListItemButton>
                          <NoWrapListItemText text="View statements"></NoWrapListItemText>
                        </ListItemButton>
                      </ListItem>
                    </Stack>
                  </AccordionDetails>
                </SettingsAccordion>
              )}
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper sx={{ minHeight: 200, padding: 2 }}>
              <Box minHeight={200}>{settingView}</Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fade>
  );
};

export default CustomerSettings;
