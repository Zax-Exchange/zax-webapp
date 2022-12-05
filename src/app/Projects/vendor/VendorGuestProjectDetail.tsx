import styled from "@emotion/styled";
import { KeyboardBackspace } from "@mui/icons-material";
import {
  Container,
  IconButton,
  Grid,
  Paper,
  Box,
  Typography,
  List,
  Tabs,
  Tab,
  Dialog,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import { Tooltip } from "stream-chat-react";
import { AuthContext } from "../../../context/AuthContext";
import {
  ProjectPermission,
  VendorGuestProject,
} from "../../../generated/graphql";
import { GENERAL_ROUTES } from "../../constants/loggedInRoutes";
import { useGetVendorGuestProjectQuery } from "../../gql/get/vendor/vendor.generated";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import FullScreenLoading from "../../Utils/Loading";
import PermissionDenied from "../../Utils/PermissionDenied";
import ComponentSpecDetail from "../common/ComponentSpecDetail";
import { ProjectOverviewListItem } from "../customer/CustomerProjectOverviewCard";

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

const VendorGuestProjectDetail = () => {
  const intl = useIntl();
  const { projectId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [permissionedDenied, setPermissionDenied] = useState(false);

  const {
    loading: getGuestProjectLoading,
    data: getGuestProjectData,
    error: getGuestProjectError,
  } = useGetVendorGuestProjectQuery({
    variables: {
      data: {
        projectId: projectId || "",
        userId: user!.id,
      },
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (getGuestProjectError) {
      if (getGuestProjectError.message.includes("permission denied")) {
        setPermissionDenied(true);
      } else {
        setSnackbar({
          message: intl.formatMessage({ id: "app.general.network.error" }),
          severity: "error",
        });
        setSnackbarOpen(true);
      }
    }
  }, [getGuestProjectError]);

  const componentTabOnChange = (
    event: React.SyntheticEvent,
    newTab: number
  ) => {
    setCurrentTab(newTab);
  };

  const backButtonHandler = () => {
    navigate(GENERAL_ROUTES.PROJECTS);
  };

  const renderAttributeTitle = (attr: string) => {
    return <Typography variant="subtitle2">{attr}</Typography>;
  };

  const renderProjectField = (
    projectAttribute: keyof VendorGuestProject,
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

  if (getGuestProjectLoading) {
    return <FullScreenLoading />;
  }

  if (permissionedDenied) {
    return (
      <Dialog open={true}>
        <PermissionDenied />
      </Dialog>
    );
  }
  if (getGuestProjectData && getGuestProjectData.getVendorGuestProject) {
    const projectData = getGuestProjectData.getVendorGuestProject;

    return (
      <Container>
        <Container disableGutters style={{ textAlign: "left" }}>
          <IconButton onClick={backButtonHandler}>
            <KeyboardBackspace />
          </IconButton>
        </Container>

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
                    id: "app.project.attribute.guestEmail",
                  })
                )}
                {renderProjectField("guestEmail", projectData.guestEmail)}
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

                {renderProjectField("deliveryDate", projectData.deliveryDate)}
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
      </Container>
    );
  }
  return null;
};

export default VendorGuestProjectDetail;
