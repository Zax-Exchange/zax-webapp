import {
  Box,
  Button,
  Dialog,
  IconButton,
  Paper,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import {
  useGetProjectChangelogLazyQuery,
  useGetProjectComponentChangelogLazyQuery,
  useGetProjectDetailQuery,
} from "../../gql/get/project/project.generated";
import { useNavigate, useParams } from "react-router-dom";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import FullScreenLoading from "../../Utils/Loading";
import { Project, ProjectComponentChangelog } from "../../../generated/graphql";
import { Edit } from "@mui/icons-material";
import ProjectChangelogModal from "../../Projects/customer/modals/ProjectChangelogModal";
import ProjectSpecDetail from "../../Projects/common/ProjectSpecDetail";
import { LOGGED_OUT_ROUTES } from "../../constants/loggedOutRoutes";
import ProjectComponentChangelogModal from "../../Projects/customer/modals/ProjectComponentChangelogModal";
import ComponentSpecDetail from "../../Projects/common/ComponentSpecDetail";

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

const GuestProjectDetail = ({ projectData }: { projectData: Project }) => {
  const intl = useIntl();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [currentTab, setCurrentTab] = useState(0);

  const [componentChangelogModalOpen, setComponentChangelogModalOpen] =
    useState(false);
  const [projectChangelogModalOpen, setProjectChangelogModalOpen] =
    useState(false);

  const [componentsChangelog, setComponentsChangelog] = useState<
    Record<string, ProjectComponentChangelog[]>
  >({});

  const [
    getProjectChangelog,
    {
      data: getProjectChangelogData,
      loading: getProjectChangelogLoading,
      error: getProjectChangelogError,
    },
  ] = useGetProjectChangelogLazyQuery();

  const [
    getComponentChangelog,
    { data: getComponentChangelogData, error: getComponentChangelogError },
  ] = useGetProjectComponentChangelogLazyQuery();

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

  const openEditProjectPage = () => {
    const dest = LOGGED_OUT_ROUTES.GUEST_PROJECT_EDIT.replace(
      ":projectId",
      projectId ? projectId : ""
    );

    navigate(dest);
  };

  return (
    <Box>
      <Paper elevation={1} sx={{ maxHeight: "37rem", height: "100%" }}>
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
          <Box>
            <IconButton onClick={openEditProjectPage}>
              <Tooltip
                title={intl.formatMessage({
                  id: "app.general.edit",
                })}
                placement="top"
              >
                <Edit color="primary" />
              </Tooltip>
            </IconButton>
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
                    {intl.formatMessage({
                      id: "app.viewVersionHistory",
                    })}
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

            <ProjectSpecDetail projectData={projectData as Project} />
          </Box>
        </Box>
      </Paper>
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
    </Box>
  );
};

export default GuestProjectDetail;
