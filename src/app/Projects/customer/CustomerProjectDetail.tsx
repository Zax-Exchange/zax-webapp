import {
  Grid,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  IconButton,
  Button,
  Link,
  TableRow,
  TableCell,
  Stack,
  TableContainer,
  Table,
  TableBody,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Tabs,
  Tab,
  Tooltip,
  useTheme,
  TextField,
  ButtonGroup,
  InputAdornment,
  InputProps,
  Autocomplete,
  Dialog,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import VendorBidOverview from "./VendorBidOverview";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import FullScreenLoading from "../../Utils/Loading";
import { ProjectOverviewListItem } from "./CustomerProjectOverviewCard";
import styled from "@emotion/styled";
import {
  CreateProjectComponentSpecInput,
  CreateProjectInput,
  Project,
  ProjectBid,
  ProjectComponent,
  ProjectComponentChangelog,
  ProjectComponentSpec,
  ProjectPermission,
} from "../../../generated/graphql";
import React from "react";
import {
  CUSTOMER_ROUTES,
  GENERAL_ROUTES,
} from "../../constants/loggedInRoutes";
import { useGetCustomerProjectQuery } from "../../gql/get/customer/customer.generated";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useIntl } from "react-intl";
import EditIcon from "@mui/icons-material/Edit";
import { useUpdateProjectMutation } from "../../gql/update/project/project.generated";
import {
  isValidAlphanumeric,
  isValidFloat,
  isValidInt,
} from "../../Utils/inputValidators";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import GoogleMaps from "../../Utils/GoogleMapAutocomplete";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ComponentSpecDetail from "../common/ComponentSpecDetail";
import ProjectCategoryDropdown from "../../Utils/ProjectCategoryDropdown";
import {
  useGetProjectChangelogQuery,
  useGetProjectComponentChangelogLazyQuery,
  useGetProjectComponentChangelogQuery,
} from "../../gql/get/project/project.generated";
import PermissionDenied from "../../Utils/PermissionDenied";
import ProjectSpecDetail from "../common/ProjectSpecDetail";
import { ContentCopy, CopyAll } from "@mui/icons-material";
import {
  EVENT_ACTION,
  EVENT_CATEGORY,
  EVENT_LABEL,
} from "../../../analytics/constants";
import ReactGA from "react-ga4";
import ProjectComponentChangelogModal from "./modals/ProjectComponentChangelogModal";
import ProjectChangelogModal from "./modals/ProjectChangelogModal";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`component-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ProjectDetailListItem = styled(ProjectOverviewListItem)(() => ({
  flexDirection: "column",
  alignItems: "flex-start",
}));

const CustomerProjectDetail = () => {
  const theme = useTheme();
  const intl = useIntl();
  const { projectId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [permissionedDenied, setPermissionDenied] = useState(false);

  const [componentChangelogModalOpen, setComponentChangelogModalOpen] =
    useState(false);
  const [projectChangelogModalOpen, setProjectChangelogModalOpen] =
    useState(false);

  const [componentsChangelog, setComponentsChangelog] = useState<
    Record<string, ProjectComponentChangelog[]>
  >({});

  // For project component section.
  const [currentTab, setCurrentTab] = useState(0);

  // State variable to store order quantity input when user enables edit mode on project detail section.
  const [orderQuantity, setOrderQuantity] = useState("");

  const {
    data: getProjectData,
    loading: getProjectLoading,
    error: getProjectError,
  } = useGetCustomerProjectQuery({
    variables: {
      data: {
        projectId: projectId || "",
        userId: user!.id,
      },
    },
    fetchPolicy: "no-cache",
  });

  const {
    data: getProjectChangelogData,
    loading: getProjectChangelogLoading,
    error: getProjectChangelogError,
  } = useGetProjectChangelogQuery({
    variables: {
      data: {
        projectId: projectId || "",
      },
    },
    fetchPolicy: "no-cache",
  });

  const [
    getComponentChangelog,
    {
      loading: getComponentChangelogLoading,
      data: getComponentChangelogData,
      error: getComponentChangelogError,
    },
  ] = useGetProjectComponentChangelogLazyQuery();

  useEffect(() => {
    if (getProjectData && getProjectData.getCustomerProject) {
      const compIds = getProjectData.getCustomerProject.components.map(
        (comp) => comp.id
      );

      getComponentChangelog({
        variables: {
          data: {
            projectComponentIds: compIds,
          },
        },
        fetchPolicy: "no-cache",
      });
    }
  }, [getProjectData]);

  useEffect(() => {
    if (
      getComponentChangelogData &&
      getComponentChangelogData.getProjectComponentChangelog
    ) {
      const res: Record<string, ProjectComponentChangelog[]> = {};
      for (let changelog of getComponentChangelogData.getProjectComponentChangelog) {
        if (changelog.length) {
          res[changelog[0].projectComponentId] = changelog;
        }
      }
      setComponentsChangelog(res);
    }
  }, [getComponentChangelogData]);

  // For snackbar display purposes based on update mutation status
  useEffect(() => {
    if (getProjectError) {
      if (getProjectError.message.includes("permission denied")) {
        setPermissionDenied(true);
      } else {
        setSnackbar({
          message: intl.formatMessage({ id: "app.general.network.error" }),
          severity: "error",
        });
        setSnackbarOpen(true);
      }
    }
  }, [getProjectError]);

  // set selected projectChangelog version based on number of returned changelogs
  useEffect(() => {}, []);

  // Switch tab for components detail section.
  const componentTabOnChange = (
    event: React.SyntheticEvent,
    newTab: number
  ) => {
    setCurrentTab(newTab);
  };

  const openEditProjectPage = () => {
    const dest = CUSTOMER_ROUTES.EDIT_PROJECT.replace(
      ":projectId",
      projectId ? projectId : ""
    );

    navigate(dest);
  };
  const backButtonHandler = () => {
    navigate(GENERAL_ROUTES.PROJECTS);
  };

  const copyProject = () => {
    ReactGA.event({
      action: EVENT_ACTION.CLICK,
      category: EVENT_CATEGORY.PROJECT,
      label: EVENT_LABEL.COPY_PROJECT,
    });
    navigate(CUSTOMER_ROUTES.ADVANCED_CREATE_PROJECT, {
      state: {
        projectId,
      },
    });
  };

  const renderVendorBidOverview = (
    bids: ProjectBid[],
    projectComponents: ProjectComponent[]
  ) => {
    return bids.map((bid, i) => {
      return (
        <ListItem sx={{ pl: 0 }} key={i}>
          <VendorBidOverview bid={bid} projectComponents={projectComponents} />
        </ListItem>
      );
    });
  };

  const isLoading = getProjectLoading || getProjectChangelogLoading;

  if (isLoading) return <FullScreenLoading />;

  if (permissionedDenied) {
    return (
      <Dialog open={true}>
        <PermissionDenied />
      </Dialog>
    );
  }

  const projectData = getProjectData?.getCustomerProject;
  const bids = projectData?.bids;
  const projectChangelogData = getProjectChangelogData?.getProjectChangelog;

  if (projectData && projectChangelogData) {
    return (
      <Container>
        {isLoading && <FullScreenLoading />}
        <Container disableGutters style={{ textAlign: "left" }}>
          <IconButton onClick={backButtonHandler}>
            <KeyboardBackspaceIcon />
          </IconButton>
        </Container>

        <Grid container spacing={2}>
          {/* PROJECT SECTION */}
          <Grid item xs={9}>
            <Paper elevation={1}>
              <Box
                sx={{
                  padding: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #e1e2e5",
                }}
              >
                <Box pl={2}>
                  <Typography variant="h6" textAlign="left">
                    {intl.formatMessage({
                      id: "app.customer.projects.projectDetail",
                    })}
                  </Typography>
                </Box>
                {projectData.permission !== ProjectPermission.Viewer && (
                  <Box>
                    <IconButton onClick={copyProject}>
                      <Tooltip
                        title={intl.formatMessage({
                          id: "app.customer.projectDetail.copyProject",
                        })}
                        placement="top"
                      >
                        <ContentCopy color="primary" />
                      </Tooltip>
                    </IconButton>
                    <IconButton onClick={openEditProjectPage}>
                      <Tooltip
                        title={intl.formatMessage({ id: "app.general.edit" })}
                        placement="top"
                      >
                        <EditIcon color="primary" />
                      </Tooltip>
                    </IconButton>
                  </Box>
                )}
              </Box>
              <Box sx={{ p: 2 }}>
                <Box sx={{ position: "relative" }}>
                  {!!getProjectChangelogData &&
                    !!getProjectChangelogData.getProjectChangelog.length && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                        }}
                      >
                        <Button
                          variant="outlined"
                          onClick={() => setProjectChangelogModalOpen(true)}
                        >
                          {" "}
                          {intl.formatMessage({ id: "app.viewVersionHistory" })}
                        </Button>
                        <Dialog
                          open={projectChangelogModalOpen}
                          onClose={() => setProjectChangelogModalOpen(false)}
                          maxWidth="lg"
                          fullWidth
                        >
                          <ProjectChangelogModal
                            changelog={
                              getProjectChangelogData.getProjectChangelog
                            }
                          />
                        </Dialog>
                      </Box>
                    )}

                  <ProjectSpecDetail projectData={projectData as Project} />
                </Box>
              </Box>
            </Paper>

            {/* COMPONENTS SECTION */}
            <Paper sx={{ mt: 3 }}>
              {/* <Paper sx={{ mt: 1 }}> */}
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  display: "flex",
                }}
              >
                <Box
                  sx={{
                    padding: "8px",
                    margin: "0 8px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" textAlign="left">
                    {intl.formatMessage({
                      id: "app.customer.projects.componentsDetail",
                    })}
                  </Typography>
                </Box>
                <Tabs
                  value={currentTab}
                  onChange={componentTabOnChange}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {projectData.components.map((comp, i) => {
                    return <Tab label={comp.name} key={i} />;
                  })}
                </Tabs>
              </Box>
              {projectData.components.map((comp, i) => {
                return (
                  <TabPanel value={currentTab} index={i} key={i}>
                    <Box sx={{ position: "relative" }}>
                      {!!componentsChangelog[comp.id] && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                          }}
                        >
                          <Button
                            onClick={() => setComponentChangelogModalOpen(true)}
                            variant="outlined"
                          >
                            {intl.formatMessage({
                              id: "app.viewVersionHistory",
                            })}
                          </Button>
                          <Dialog
                            open={componentChangelogModalOpen}
                            onClose={() =>
                              setComponentChangelogModalOpen(false)
                            }
                            maxWidth="lg"
                            fullWidth
                          >
                            <ProjectComponentChangelogModal
                              changelog={componentsChangelog[comp.id]}
                            />
                          </Dialog>
                        </Box>
                      )}
                      <ComponentSpecDetail
                        spec={comp.componentSpec}
                        designs={comp.designs}
                      />
                    </Box>
                  </TabPanel>
                );
              })}
            </Paper>
          </Grid>

          {/* BID SECTION */}
          <Grid item xs={3}>
            <Box>
              <Typography variant="h6" textAlign="left">
                {intl.formatMessage({
                  id: "app.customer.projects.vendorBids",
                })}
              </Typography>
            </Box>
            {!bids?.length && (
              <Box>
                <Typography variant="caption" color="GrayText">
                  {intl.formatMessage({
                    id: "app.customer.projectDetail.noBids",
                  })}
                </Typography>
              </Box>
            )}
            {!!bids && (
              <List sx={{ maxHeight: "800px", overflow: "scroll" }}>
                {renderVendorBidOverview(bids, projectData.components)}
              </List>
            )}
          </Grid>
        </Grid>

        {/* <Box mt={2}>
          <Box>
            <Typography variant="h6">
              {intl.formatMessage({
                id: "app.customer.projects.versionHistory",
              })}
            </Typography>
          </Box>

          <Box></Box>
        </Box> */}
      </Container>
    );
  }
  return null;
};

export default CustomerProjectDetail;
