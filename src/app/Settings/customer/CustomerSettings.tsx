import { ExpandMore, OpenInNew } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  AccordionSummaryProps,
  Box,
  Container,
  Fade,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemTextProps,
  Paper,
  Stack,
  styled,
  Typography,
  TypographyProps,
} from "@mui/material";
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { AuthContext } from "../../../context/AuthContext";
import { CompanyPlanType, UserPower } from "../../../generated/graphql";
import ChangePassword from "../ChangePassword";
import CustomerDeactivateUsers from "./CustomerDeactivateUsers";
import CustomerManageInvitations from "../ManageInvitations";
import EditCustomerProfile from "./EditCustomerProfile";
import UpdateUserPower from "../UpdateUserPower";
import { openLink } from "../../Utils/openLink";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import { useGetStatementsLinkLazyQuery } from "../../gql/get/subscription/subscription.generated";
import FullScreenLoading from "../../Utils/Loading";
import { useGetCompanyPlanQuery } from "../../gql/get/company/company.generated";

enum CUSTOMER_SETTINGS_ROUTE {
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
  EDIT_COMPANY_PROFILE = "EDIT_COMPANY_PROFILE",
  DEACTIVATE_COMPANY = "DEACTIVATE_COMPANY",
  MANAGE_INVITATIONS = "MANAGE_INVITATIONS",
  DEACTIVATE_USERS = "DEACTIVATE_USERS",
  UPDATE_USER_POWER = "UPDATE_USER_POWER",
  VIEW_STATEMENTS = "VIEW_STATEMENTS",
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
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [expanded, setExpanded] = useState<string | boolean>("");
  const [settingView, setSettingView] = useState<null | JSX.Element>(null);

  const { data: companyPlanData } = useGetCompanyPlanQuery({
    variables: {
      data: {
        companyId: user!.companyId,
      },
    },
    fetchPolicy: "no-cache",
  });

  const isFreePlan =
    companyPlanData &&
    (!companyPlanData.getCompanyPlan ||
      (companyPlanData.getCompanyPlan &&
        companyPlanData.getCompanyPlan.planType === CompanyPlanType.Free));

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

    if (view === CUSTOMER_SETTINGS_ROUTE.UPDATE_USER_POWER) {
      setSettingView(<UpdateUserPower />);
    }
  };

  const isLoading = getStatementsLoading;

  return (
    <Fade in={true} timeout={500}>
      <Container maxWidth="lg">
        {isLoading && <FullScreenLoading />}
        <Grid container spacing={2.5}>
          <Grid item xs={3.5}>
            <Paper sx={{ borderRadius: 1 }}>
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
                          CUSTOMER_SETTINGS_ROUTE.CHANGE_PASSWORD
                        )
                      }
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

                      {/* <ListItem disableGutters>
                        <ListItemButton>
                          <NoWrapListItemText text="Deactivate company"></NoWrapListItemText>
                        </ListItemButton>
                      </ListItem> */}
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
              )} */}

              {isAdmin && companyPlanData && !isFreePlan && (
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
