import { ExpandMore, OpenInNew } from "@mui/icons-material";
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
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { AuthContext } from "../../../context/AuthContext";
import { UserPower } from "../../../generated/graphql";
import { useGetStatementsLinkLazyQuery } from "../../gql/get/subscription/subscription.generated";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import { openLink } from "../../Utils/openLink";
import ChangePassword from "../ChangePassword";
import ChangePlan from "../ChangePlan";
import CustomerDeactivateUsers from "../customer/CustomerDeactivateUsers";
import DeactivateUsers from "../customer/CustomerDeactivateUsers";
import ManageInvitations from "../ManageInvitations";
import InviteUsers from "../ManageInvitations";
import UpdateUserPower from "../UpdateUserPower";
import EditVendorProfile from "./EditVendorProfile";
import UploadCertifications from "./UploadCertifications";
import EditFactories from "./EditFactories";
import UploadShowcaseImages from "./UploadShowcaseImages";

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

enum VENDOR_SETTINGS_ROUTE {
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
  EDIT_COMPANY_PROFILE = "EDIT_COMPANY_PROFILE",
  UPLOAD_CERTIFICATIONS = "UPLOAD_CERTIFICATIONS",
  DEACTIVATE_COMPANY = "DEACTIVATE_COMPANY",
  MANAGE_INVITATIONS = "MANAGE_INVITATIONS",
  DEACTIVATE_USERS = "DEACTIVATE_USERS",
  UPDATE_USER_POWER = "UPDATE_USER_POWER",
  VIEW_STATEMENTS = "VIEW_STATEMENTS",
  EDIT_FACTORIES = "EDIT_FACTORIES",
  UPLOAD_SHOWCASE_IMAGES = "UPLOAD_SHOWCASE_IMAGES",
}
const VendorSettings = () => {
  const { user } = useContext(AuthContext);
  const intl = useIntl();
  const power = user!.power;
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const isAdmin = power === UserPower.Admin;
  const [settingView, setSettingView] = useState<null | JSX.Element>(null);

  const [expanded, setExpanded] = useState<string | boolean>("");

  const [
    getStatements,
    {
      loading: getStatementsLoading,
      data: getStatementsData,
      error: getStatementsError,
    },
  ] = useGetStatementsLinkLazyQuery({
    variables: {
      data: {
        companyId: user!.companyId,
      },
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (getStatementsError) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [getStatementsError]);

  const fetchAndOpenStatementLink = async () => {
    try {
      const { data } = await getStatements();
      if (data) {
        openLink(data.getStatementsLink);
      }
    } catch (error) {}
  };

  const handleChange =
    (panel: string) =>
    (event: React.SyntheticEvent<Element, Event>, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const renderSettingsView = (view: VENDOR_SETTINGS_ROUTE) => {
    if (view === VENDOR_SETTINGS_ROUTE.CHANGE_PASSWORD) {
      setSettingView(<ChangePassword />);
    }

    if (view === VENDOR_SETTINGS_ROUTE.EDIT_COMPANY_PROFILE) {
      setSettingView(<EditVendorProfile />);
    }
    if (view === VENDOR_SETTINGS_ROUTE.MANAGE_INVITATIONS) {
      setSettingView(<ManageInvitations />);
    }

    if (view === VENDOR_SETTINGS_ROUTE.DEACTIVATE_USERS) {
      setSettingView(<CustomerDeactivateUsers />);
    }

    if (view === VENDOR_SETTINGS_ROUTE.UPDATE_USER_POWER) {
      setSettingView(<UpdateUserPower />);
    }

    if (view === VENDOR_SETTINGS_ROUTE.UPLOAD_CERTIFICATIONS) {
      setSettingView(<UploadCertifications />);
    }

    if (view === VENDOR_SETTINGS_ROUTE.EDIT_FACTORIES) {
      setSettingView(<EditFactories />);
    }

    if (view === VENDOR_SETTINGS_ROUTE.UPLOAD_SHOWCASE_IMAGES) {
      setSettingView(<UploadShowcaseImages />);
    }
  };

  return (
    <Fade in={true} timeout={500}>
      <Container maxWidth="lg">
        <Grid container spacing={2.5}>
          <Grid item xs={3.5}>
            <Paper>
              <SettingsAccordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                sx={{ borderRadius: 1 }}
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
                          VENDOR_SETTINGS_ROUTE.CHANGE_PASSWORD
                        )
                      }
                      sx={{ borderRadius: 1 }}
                    >
                      <ListItemButton>
                        <NoWrapListItemText
                          text={intl.formatMessage({
                            id: "app.settings.accountSettings.changePassword",
                          })}
                        ></NoWrapListItemText>
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
                            VENDOR_SETTINGS_ROUTE.EDIT_COMPANY_PROFILE
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

                      <ListItem
                        disableGutters
                        onClick={() =>
                          renderSettingsView(
                            VENDOR_SETTINGS_ROUTE.EDIT_FACTORIES
                          )
                        }
                      >
                        <ListItemButton>
                          <NoWrapListItemText
                            text={intl.formatMessage({
                              id: "app.settings.companySettings.editFactories",
                            })}
                          ></NoWrapListItemText>
                        </ListItemButton>
                      </ListItem>

                      <ListItem
                        disableGutters
                        onClick={() =>
                          renderSettingsView(
                            VENDOR_SETTINGS_ROUTE.UPLOAD_CERTIFICATIONS
                          )
                        }
                      >
                        <ListItemButton>
                          <NoWrapListItemText
                            text={intl.formatMessage({
                              id: "app.settings.companySettings.uploadCertifications",
                            })}
                          ></NoWrapListItemText>
                        </ListItemButton>
                      </ListItem>

                      <ListItem
                        disableGutters
                        onClick={() =>
                          renderSettingsView(
                            VENDOR_SETTINGS_ROUTE.UPLOAD_SHOWCASE_IMAGES
                          )
                        }
                      >
                        <ListItemButton>
                          <NoWrapListItemText
                            text={intl.formatMessage({
                              id: "app.settings.companySettings.uploadShowcaseImages",
                            })}
                          ></NoWrapListItemText>
                        </ListItemButton>
                      </ListItem>
                    </Stack>
                  </AccordionDetails>
                </SettingsAccordion>
              )}

              {/* {isAdmin && (
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
                            VENDOR_SETTINGS_ROUTE.MANAGE_INVITATIONS
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
                            VENDOR_SETTINGS_ROUTE.DEACTIVATE_USERS
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
                            VENDOR_SETTINGS_ROUTE.UPDATE_USER_POWER
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
              )} */}

              {/* {isAdmin && (
                <SettingsAccordion
                  expanded={expanded === "panel4"}
                  onChange={handleChange("panel4")}
                  sx={{ borderRadius: 1 }}
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
                      <ListItem
                        disableGutters
                        onClick={fetchAndOpenStatementLink}
                      >
                        <ListItemButton>
                          <NoWrapListItemText
                            text={intl.formatMessage({
                              id: "app.settings.manageBillingInfo.viewStatements",
                            })}
                          ></NoWrapListItemText>
                          <OpenInNew color="action" />
                        </ListItemButton>
                      </ListItem>
                    </Stack>
                  </AccordionDetails>
                </SettingsAccordion>
              )} */}
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

export default VendorSettings;
