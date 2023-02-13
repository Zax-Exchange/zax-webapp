import { KeyboardBackspace } from "@mui/icons-material";
import {
  Container,
  IconButton,
  Paper,
  Box,
  Typography,
  Tabs,
  Tab,
  Dialog,
  Button,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { ProjectComponentChangelog } from "../../../generated/graphql";
import { GENERAL_ROUTES } from "../../constants/loggedInRoutes";
import {
  useGetProjectChangelogLazyQuery,
  useGetProjectComponentChangelogLazyQuery,
} from "../../gql/get/project/project.generated";
import { useGetVendorGuestProjectQuery } from "../../gql/get/vendor/vendor.generated";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import FullScreenLoading from "../../Utils/Loading";
import PermissionDenied from "../../Utils/PermissionDenied";
import ComponentSpecDetail from "../common/ComponentSpecDetail";
import ProjectSpecDetail from "../common/ProjectSpecDetail";
import ProjectChangelogModal from "../customer/modals/ProjectChangelogModal";
import ProjectComponentChangelogModal from "../customer/modals/ProjectComponentChangelogModal";

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

const VendorGuestProjectDetail = () => {
  const intl = useIntl();
  const { projectId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [permissionedDenied, setPermissionDenied] = useState(false);

  const [componentChangelogModalOpen, setComponentChangelogModalOpen] =
    useState(false);
  const [projectChangelogModalOpen, setProjectChangelogModalOpen] =
    useState(false);

  const [componentsChangelog, setComponentsChangelog] = useState<
    Record<string, ProjectComponentChangelog[]>
  >({});

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

  const [
    getProjectChangelog,
    { data: getProjectChangelogData, error: getProjectChangelogError },
  ] = useGetProjectChangelogLazyQuery();

  const [
    getComponentChangelog,
    { data: getComponentChangelogData, error: getComponentChangelogError },
  ] = useGetProjectComponentChangelogLazyQuery();

  // wait until we actually fetched projectData (authorized users) so we don't fetch changelog data before knowing user is authorized or not
  useEffect(() => {
    if (getGuestProjectData && getGuestProjectData.getVendorGuestProject) {
      getProjectChangelog({
        variables: {
          data: {
            projectId: projectId || "",
          },
        },
        fetchPolicy: "no-cache",
      });
    }
  }, [getGuestProjectData]);

  useEffect(() => {
    if (getGuestProjectData && getGuestProjectData.getVendorGuestProject) {
      const compIds = getGuestProjectData.getVendorGuestProject.components.map(
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
  }, [getGuestProjectData]);

  useEffect(() => {
    if (
      getGuestProjectError ||
      getComponentChangelogError ||
      getProjectChangelogError
    ) {
      if (getGuestProjectError?.message.includes("permission denied")) {
        setPermissionDenied(true);
      } else {
        setSnackbar({
          message: intl.formatMessage({ id: "app.general.network.error" }),
          severity: "error",
        });
        setSnackbarOpen(true);
      }
    }
  }, [
    getGuestProjectError,
    getComponentChangelogError,
    getProjectChangelogError,
  ]);

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

  const componentTabOnChange = (
    event: React.SyntheticEvent,
    newTab: number
  ) => {
    setCurrentTab(newTab);
  };

  const backButtonHandler = () => {
    navigate(GENERAL_ROUTES.PROJECTS);
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
                      // fullWidth
                    >
                      <ProjectChangelogModal
                        changelog={getProjectChangelogData.getProjectChangelog}
                      />
                    </Dialog>
                  </Box>
                )}
              <ProjectSpecDetail
                projectData={projectData}
                isGuestProject={true}
              />
            </Box>
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
                        onClose={() => setComponentChangelogModalOpen(false)}
                        maxWidth="lg"
                        // fullWidth
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
      </Container>
    );
  }
  return null;
};

export default VendorGuestProjectDetail;
