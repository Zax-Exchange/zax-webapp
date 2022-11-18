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
import { useGetProjectChangelogQuery } from "../../gql/get/project/project.generated";

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

  const [selectedChangelogVersion, setSelectedChangelogVersion] = useState<
    number | null
  >(null);

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

  // For snackbar display purposes based on update mutation status
  useEffect(() => {
    if (getProjectError) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
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

  // Render project fields
  const renderProjectField = (
    projectAttribute: keyof Project,
    projectFieldData: string | number | number[]
  ) => {
    if (Array.isArray(projectFieldData)) {
      return (
        <Typography variant="caption">{projectFieldData.join(", ")}</Typography>
      );
    }

    let fieldString = projectFieldData;
    if (projectAttribute === "totalWeight") {
      fieldString += " g";
    }
    if (projectAttribute === "targetPrice") {
      fieldString = parseFloat(fieldString as string);
    }
    return <Typography variant="caption">{fieldString}</Typography>;
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

  const renderAttributeTitle = (attr: string) => {
    return <Typography variant="subtitle2">{attr}</Typography>;
  };

  const isLoading = getProjectLoading || getProjectChangelogLoading;

  if (isLoading) return <FullScreenLoading />;

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
          <Grid item xs={8}>
            <Paper elevation={1}>
              <Box
                sx={{
                  padding: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
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
                    <IconButton onClick={openEditProjectPage}>
                      <Tooltip
                        title={intl.formatMessage({ id: "app.general.edit" })}
                        placement="left"
                      >
                        <EditIcon color="primary" />
                      </Tooltip>
                    </IconButton>
                  </Box>
                )}
              </Box>
              <Box display="flex" justifyContent="space-between" p={3}>
                <List>
                  <ProjectDetailListItem>
                    {renderAttributeTitle(
                      intl.formatMessage({ id: "app.project.attribute.name" })
                    )}
                    {renderProjectField("name", projectData.name)}
                  </ProjectDetailListItem>

                  <ProjectDetailListItem>
                    {renderAttributeTitle(
                      intl.formatMessage({
                        id: "app.project.attribute.category",
                      })
                    )}
                    {renderProjectField("category", projectData.category)}
                  </ProjectDetailListItem>

                  <ProjectDetailListItem>
                    {renderAttributeTitle(
                      intl.formatMessage({
                        id: "app.project.attribute.totalWeight",
                      })
                    )}
                    {renderProjectField("totalWeight", projectData.totalWeight)}
                  </ProjectDetailListItem>

                  <ProjectDetailListItem>
                    {renderAttributeTitle(
                      intl.formatMessage({
                        id: "app.project.attribute.deliveryDate",
                      })
                    )}

                    {renderProjectField(
                      "deliveryDate",
                      projectData.deliveryDate
                    )}
                  </ProjectDetailListItem>
                  <ProjectDetailListItem>
                    {renderAttributeTitle(
                      intl.formatMessage({
                        id: "app.project.attribute.deliveryAddress",
                      })
                    )}

                    {renderProjectField(
                      "deliveryAddress",
                      projectData.deliveryAddress
                    )}
                  </ProjectDetailListItem>
                </List>
                <List>
                  <ProjectDetailListItem>
                    {renderAttributeTitle(
                      intl.formatMessage({
                        id: "app.project.attribute.targetPrice",
                      })
                    )}
                    {renderProjectField("targetPrice", projectData.targetPrice)}
                  </ProjectDetailListItem>
                  <ProjectDetailListItem>
                    {renderAttributeTitle(
                      intl.formatMessage({
                        id: "app.project.attribute.orderQuantities",
                      })
                    )}
                    {renderProjectField(
                      "orderQuantities",
                      projectData.orderQuantities
                    )}
                  </ProjectDetailListItem>
                  <ProjectDetailListItem>
                    {renderAttributeTitle(
                      intl.formatMessage({
                        id: "app.general.createdAt",
                      })
                    )}
                    <Typography variant="caption">
                      {projectData.createdAt.slice(0, 10)}
                    </Typography>
                  </ProjectDetailListItem>
                  <ProjectDetailListItem>
                    {renderAttributeTitle(
                      intl.formatMessage({
                        id: "app.general.updatedAt",
                      })
                    )}
                    <Typography variant="caption">
                      {projectData.updatedAt.slice(0, 10)}
                    </Typography>
                  </ProjectDetailListItem>

                  {!!projectData.comments && (
                    <ProjectDetailListItem>
                      {renderAttributeTitle(
                        intl.formatMessage({
                          id: "app.project.attribute.comments",
                        })
                      )}

                      {renderProjectField("comments", projectData.comments)}
                    </ProjectDetailListItem>
                  )}
                </List>
              </Box>
            </Paper>

            {/* COMPONENTS SECTION */}
            <Paper sx={{ mt: 3 }}>
              {/* <Box>
                <Typography variant="h6" textAlign="left">
                  {intl.formatMessage({
                    id: "app.customer.projects.componentsDetail",
                  })}
                </Typography>
              </Box> */}

              {/* <Paper sx={{ mt: 1 }}> */}
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
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
                    <ComponentSpecDetail
                      spec={comp.componentSpec}
                      designs={comp.designs}
                    />
                  </TabPanel>
                );
              })}
            </Paper>
          </Grid>

          {/* BID SECTION */}
          <Grid item xs={4}>
            <Box>
              <Typography variant="h6" textAlign="left">
                {intl.formatMessage({
                  id: "app.customer.projects.vendorBids",
                })}
              </Typography>
            </Box>
            <List sx={{ maxHeight: 500, overflow: "scroll" }}>
              {bids && renderVendorBidOverview(bids, projectData.components)}
            </List>
          </Grid>
        </Grid>

        <Box mt={2}>
          <Box>
            <Typography variant="h6">
              {intl.formatMessage({
                id: "app.customer.projects.versionHistory",
              })}
            </Typography>
          </Box>

          <Box></Box>
        </Box>
      </Container>
    );
  }
  return null;
};

export default CustomerProjectDetail;
