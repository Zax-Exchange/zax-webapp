import {
  Button,
  Container,
  Typography,
  Box,
  Paper,
  IconButton,
  Drawer,
  Tabs,
  Tab,
  Tooltip,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import FullScreenLoading from "../../../../Utils/Loading";

import React from "react";

import useCustomSnackbar from "../../../../Utils/CustomSnackbar";
import { GENERAL_ROUTES } from "../../../../constants/loggedInRoutes";
import { useCreateProjectMutation } from "../../../../gql/create/project/project.generated";
import { useGetCustomerProjectLazyQuery } from "../../../../gql/get/customer/customer.generated";
import {
  CreateProjectComponentInput,
  CreateProjectInput,
  ProjectCreationMode,
  ProjectDesign,
  ProjectVisibility,
} from "../../../../../generated/graphql";
import CreateProjectComponentModal from "./modals/CreateProjectComponentModal";
import CancelIcon from "@mui/icons-material/Cancel";
import { useIntl } from "react-intl";
import ComponentSpecDetail from "../../../common/ComponentSpecDetail";
import { useDeleteProjectDesignMutation } from "../../../../gql/delete/project/project.generated";
import Edit from "@mui/icons-material/Edit";
import ReactGA from "react-ga4";
import {
  EVENT_ACTION,
  EVENT_CATEGORY,
  EVENT_LABEL,
} from "../../../../../analytics/constants";
import ProjectSpecInput from "../common/ProjectSpecInput";
import mixpanel from "mixpanel-browser";
import CustomerUpgradeBanner from "../../../../Banner/CustomerUpgradeBanner";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  style: React.CSSProperties;
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

const AdvancedCreateProject = () => {
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [
    createProjectMutation,
    { loading: createProjectLoading, error: createProjectError },
  ] = useCreateProjectMutation();
  const [startingTime, setStartingTime] = useState(performance.now());

  const [
    getCustomerProject,
    {
      data: getCustomerProjectData,
      loading: getCustomerProjectLoading,
      error: getCustomerProjectError,
    },
  ] = useGetCustomerProjectLazyQuery();

  const [deleteDesign, { error: deleteDesignError }] =
    useDeleteProjectDesignMutation();

  const [projectData, setProjectData] = useState<CreateProjectInput>({
    userId: user!.id,
    creationMode: ProjectCreationMode.Advanced,
    name: "",
    deliveryAddress: "",
    country: "",
    category: "",
    totalWeight: "",
    deliveryDate: new Date().toISOString().split("T")[0],
    targetPrice: "",
    orderQuantities: [],
    components: [],
    visibility: ProjectVisibility.Public,
  });

  // index of component if use clicks edit button on one of the component detail
  // we will use this to pass into createComponentModal to inject existing data to the fields
  const [componentIndexToEdit, setComponentIndexToEdit] = useState<
    number | null
  >(null);

  // For project component section.
  const [currentTab, setCurrentTab] = useState(0);

  const [componentModalOpen, setComponentModalOpen] = useState(false);

  // record designs for added components
  const [componentsDesigns, setComponentsDesigns] = useState<ProjectDesign[][]>(
    []
  );

  // Track deleted designs when user is editing a component, so we don't invoke delete api until user clicks save
  const [temporaryDesignIdsToDelete, setTemporaryDesignIdsToDelete] = useState<
    string[]
  >([]);

  useEffect(() => {
    if (getCustomerProjectError || deleteDesignError || createProjectError) {
      if (
        createProjectError &&
        createProjectError.message === "restricted for free plan"
      ) {
        setSnackbar({
          message: intl.formatMessage({
            id: "app.customer.projects.error.reachedFreePlanLimit",
          }),
          severity: "error",
        });
      } else {
        setSnackbar({
          message: intl.formatMessage({ id: "app.general.network.error" }),
          severity: "error",
        });
      }
      setSnackbarOpen(true);
    }
  }, [getCustomerProjectError, deleteDesignError, createProjectError]);

  // get project data if user chooses to import
  useEffect(() => {
    const projectId: string | undefined = (location.state as any)?.projectId;
    if (projectId) {
      getCustomerProject({
        variables: {
          data: {
            projectId,
            userId: user!.id,
          },
        },
        fetchPolicy: "no-cache",
      });
    }
  }, [location.state]);

  // initialize import-able fields if user chooses to import
  useEffect(() => {
    if (getCustomerProjectData && getCustomerProjectData.getCustomerProject) {
      const {
        name,
        deliveryAddress,
        category,
        country,
        totalWeight,
        targetPrice,
        deliveryDate,
        orderQuantities,
        components,
        visibility,
      } = getCustomerProjectData.getCustomerProject;

      const sanitizedComponents: CreateProjectComponentInput[] = components.map(
        (comp) => {
          const copySpec: any = JSON.parse(JSON.stringify(comp.componentSpec));
          const copyComp: any = JSON.parse(JSON.stringify(comp));

          // get rid of ids and typenames so data between getProjectData and createProjectData is uniform
          delete copyComp.id;
          delete copyComp.projectId;
          delete copyComp.designs;
          delete copySpec.id;

          return {
            ...copyComp,
            componentSpec: copySpec,
          } as CreateProjectComponentInput;
        }
      );

      setProjectData((prev) => ({
        ...prev,
        name,
        deliveryAddress,
        category,
        country,
        totalWeight,
        deliveryDate,
        targetPrice,
        orderQuantities,
        components: sanitizedComponents,
        visibility,
      }));

      // initialize empty design arrays for each component
      setComponentsDesigns([...Array(components.length)].map(() => []));
    }
  }, [getCustomerProjectData]);

  useEffect(() => {
    if (temporaryDesignIdsToDelete.length && !componentModalOpen) {
      Promise.all(
        temporaryDesignIdsToDelete.map((id) => deleteDesignFiles(id))
      );
      setTemporaryDesignIdsToDelete([]);
    }
  }, [temporaryDesignIdsToDelete, componentModalOpen]);
  // Switch tab for components detail section.
  const componentTabOnChange = (
    event: React.SyntheticEvent,
    newTab: number
  ) => {
    setCurrentTab(newTab);
  };

  const deleteDesignFiles = async (id: string) => {
    deleteDesign({
      variables: {
        data: {
          fileId: id,
        },
      },
    });
  };

  const removeComponent = (i: number) => {
    const comps = [...projectData.components!];
    comps.splice(i, 1);

    // handles the case where currentTab is first/last and removing the component would left the currentTab in limbo
    if (i === currentTab) {
      const newTab = i - 1 >= 0 ? i - 1 : 0;
      setCurrentTab(newTab);
    }
    setProjectData({
      ...projectData,
      components: comps,
    });

    if (componentsDesigns[i]) {
      Promise.all(
        componentsDesigns[i].map((d) => {
          return deleteDesignFiles(d.fileId);
        })
      );
    }
    setComponentsDesigns((prev) => {
      const prevFiles = [...prev];
      prevFiles.splice(i, 1);
      return prevFiles;
    });
  };

  const openComponentModal = () => {
    setComponentModalOpen(true);
  };

  // fires when user closes drawer by clicking outside of it
  const componentModalOnClose = () => {
    // when user closes modal, we will reset this to null so user can start clean if they click "create component"
    setComponentIndexToEdit(null);

    setComponentModalOpen(false);
  };

  const editComponent = (ind: number) => {
    setComponentIndexToEdit(ind);
    setComponentModalOpen(true);
  };

  // check if create project button should be disabled
  const shouldDisableCreateProjectButton = () => {
    for (let key in projectData) {
      const attr = key as keyof CreateProjectInput;

      if (Array.isArray(projectData[attr])) {
        if ((projectData[attr] as []).length === 0) return true;
      } else if (!(projectData[attr] as string).length) {
        return true;
      }
    }

    if (
      isNaN(parseFloat(projectData.totalWeight!)) ||
      parseFloat(projectData.totalWeight!) === 0
    ) {
      return true;
    }

    if (
      isNaN(parseFloat(projectData.targetPrice!)) ||
      parseFloat(projectData.targetPrice!) === 0
    ) {
      return true;
    }
    return false;
  };

  const createProject = async () => {
    try {
      mixpanel.track(EVENT_ACTION.CLICK, {
        category: EVENT_CATEGORY.PROJECT,
        label: EVENT_LABEL.ADVANCED_PROJECT_CREATION_TIME_ELAPSED,
        value: Math.round((performance.now() - startingTime) / 1000),
      });

      ReactGA.event({
        action: EVENT_ACTION.CLICK,
        category: EVENT_CATEGORY.PROJECT,
        label: EVENT_LABEL.ADVANCED_PROJECT_CREATION_TIME_ELAPSED,
        value: Math.round((performance.now() - startingTime) / 1000),
      });
      await createProjectMutation({
        variables: {
          data: {
            ...(projectData as CreateProjectInput),
            name: projectData.name.replace(/\s+/g, " ").trim(),
            userId: user!.id,
            creationMode: ProjectCreationMode.Advanced,
          },
        },
      });

      navigate(GENERAL_ROUTES.PROJECTS);

      setSnackbar({
        severity: "success",
        message: intl.formatMessage({
          id: "app.customer.createProject.projectCreated",
        }),
      });
      setSnackbarOpen(true);
    } catch (e) {}
  };

  const isLoading = createProjectLoading || getCustomerProjectLoading;

  return (
    <>
      {createProjectError &&
        createProjectError.message === "restricted for free plan" && (
          <CustomerUpgradeBanner />
        )}
      {isLoading && <FullScreenLoading />}
      <Paper sx={{ padding: 5 }}>
        <Box display="flex" mb={4}>
          <Typography variant="h6" textAlign="left" flexGrow={1}>
            {intl.formatMessage({
              id: "app.customer.createProject.configureProjectDetail",
            })}
          </Typography>

          <Box display="flex" flexDirection="row">
            <Box mr={2}>
              <Button onClick={openComponentModal} variant="outlined">
                {intl.formatMessage({
                  id: "app.customer.createProject.addComponent",
                })}
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                disabled={shouldDisableCreateProjectButton()}
                onClick={createProject}
              >
                {intl.formatMessage({
                  id: "app.customer.createProject.create",
                })}
              </Button>
            </Box>
          </Box>
        </Box>
        <Container maxWidth="lg">
          <ProjectSpecInput
            setProjectData={setProjectData}
            projectData={projectData}
          />
        </Container>
      </Paper>

      {!!projectData.components!.length && (
        <Paper sx={{ mt: 1 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={currentTab} onChange={componentTabOnChange}>
              {projectData.components!.map((comp, i) => {
                return <Tab label={comp.name} key={i} />;
              })}
            </Tabs>
          </Box>
          {projectData.components!.map((comp, i) => {
            return (
              <TabPanel
                value={currentTab}
                index={i}
                key={i}
                style={{
                  position: "relative",
                }}
              >
                <Box sx={{ position: "absolute", top: 4, right: 8 }}>
                  <Tooltip
                    title={intl.formatMessage({
                      id: "app.general.edit",
                    })}
                    placement="top"
                  >
                    <IconButton onClick={() => editComponent(i)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title={intl.formatMessage({
                      id: "app.customer.createProject.removeComponent",
                    })}
                    placement="top"
                  >
                    <IconButton onClick={() => removeComponent(i)}>
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <ComponentSpecDetail
                  spec={comp.componentSpec}
                  designs={componentsDesigns[i]}
                />
              </TabPanel>
            );
          })}
        </Paper>
      )}

      <Drawer
        anchor="right"
        open={componentModalOpen}
        PaperProps={{
          sx: {
            borderTopLeftRadius: "4px",
            borderBottomLeftRadius: "4px",
            width: "600px",
          },
        }}
        ModalProps={{
          componentsProps: {
            backdrop: {
              style: {
                backgroundColor: "rgb(135 135 135 / 50%)",
              },
            },
          },
        }}
      >
        <CreateProjectComponentModal
          setComponentsDesigns={setComponentsDesigns}
          setComponentModalOpen={setComponentModalOpen}
          setProjectData={setProjectData}
          setComponentIndexToEdit={setComponentIndexToEdit}
          setTemporaryDesignIdsToDelete={setTemporaryDesignIdsToDelete}
          componentModalOnClose={componentModalOnClose}
          projectData={projectData}
          defaultComponentIndex={
            componentIndexToEdit !== null ? componentIndexToEdit : undefined
          }
          existingDesigns={
            componentIndexToEdit !== null
              ? componentsDesigns[componentIndexToEdit]
              : undefined
          }
        />
      </Drawer>
    </>
  );
};

export default AdvancedCreateProject;
