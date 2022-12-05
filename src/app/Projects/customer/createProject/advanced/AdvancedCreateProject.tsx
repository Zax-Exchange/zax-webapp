import { gql, useMutation } from "@apollo/client";
import {
  Button,
  Container,
  ListItem,
  TextField,
  Typography,
  Box,
  Stack,
  Dialog,
  Paper,
  List,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  InputAdornment,
  Drawer,
  ClickAwayListener,
  Tabs,
  Tab,
  CSSObject,
  Tooltip,
  Autocomplete,
  Chip,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../context/AuthContext";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLocation, useNavigate } from "react-router-dom";
import FullScreenLoading from "../../../../Utils/Loading";
import {
  isValidAlphanumeric,
  isValidFloat,
  isValidInt,
} from "../../../../Utils/inputValidators";
import GoogleMapAutocomplete from "../../../../Utils/GoogleMapAutocomplete";
import UploadDesign from "../../UploadDesign";
import React from "react";

import useCustomSnackbar from "../../../../Utils/CustomSnackbar";
import {
  CUSTOMER_ROUTES,
  GENERAL_ROUTES,
} from "../../../../constants/loggedInRoutes";
import { useCreateProjectMutation } from "../../../../gql/create/project/project.generated";
import {
  useGetCustomerProjectLazyQuery,
  useGetCustomerProjectsLazyQuery,
} from "../../../../gql/get/customer/customer.generated";
import {
  CreateProjectComponentInput,
  CreateProjectComponentSpecInput,
  CreateProjectInput,
  ProjectCreationMode,
  ProjectDesign,
} from "../../../../../generated/graphql";
import CreateProjectComponentModal from "./modals/CreateProjectComponentModal";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useIntl } from "react-intl";
import ComponentSpecDetail from "../../../common/ComponentSpecDetail";
import ProjectCategoryDropdown from "../../../../Utils/ProjectCategoryDropdown";
import { useDeleteProjectDesignMutation } from "../../../../gql/delete/project/project.generated";
import { v4 as uuidv4 } from "uuid";
import Edit from "@mui/icons-material/Edit";

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
  const [createProjectMutation, { loading: createProjectLoading }] =
    useCreateProjectMutation();

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

  const [projectData, setProjectData] = useState<Partial<CreateProjectInput>>({
    name: "",
    deliveryAddress: "",
    category: "",
    totalWeight: "",
    deliveryDate: new Date().toISOString().split("T")[0],
    targetPrice: "",
    orderQuantities: [],
    components: [],
  });

  // index of component if use clicks edit button on one of the component detail
  // we will use this to pass into createComponentModal to inject existing data to the fields
  const [componentIndexToEdit, setComponentIndexToEdit] = useState<
    number | null
  >(null);

  // For project component section.
  const [currentTab, setCurrentTab] = useState(0);

  const [orderQuantity, setOrderQuantity] = useState("");
  const [componentModalOpen, setComponentModalOpen] = useState(false);

  // record designs for added components
  const [componentsDesigns, setComponentsDesigns] = useState<ProjectDesign[][]>(
    []
  );

  // Track deleted designs when user is editing a component, so we don't invoke delete api until user clicks save
  const [temporaryDesignIdsToDelete, setTemporaryDesignIdsToDelete] = useState<
    string[]
  >([]);

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
        totalWeight,
        targetPrice,
        deliveryDate,
        orderQuantities,
        components,
      } = getCustomerProjectData.getCustomerProject;

      const sanitizedComponents: CreateProjectComponentInput[] = components.map(
        (comp) => {
          const copySpec: any = JSON.parse(JSON.stringify(comp.componentSpec));
          const copyComp: any = JSON.parse(JSON.stringify(comp));

          // get rid of ids and typenames so data between getProjectData and createProjectData is uniform
          delete copyComp.__typename;
          delete copyComp.id;
          delete copyComp.projectId;
          delete copyComp.designs;
          delete copySpec.id;
          delete copySpec.__typename;
          delete copySpec.dimension.__typename;

          if (copySpec.postProcess) {
            for (let process of copySpec.postProcess) {
              delete process.__typename;
              if (process.estimatedArea) {
                delete process.estimatedArea.__typename;
              }
              if (process.numberOfColors) {
                delete process.numberOfColors.__typename;
              }
            }
          }

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
        totalWeight,
        deliveryDate,
        targetPrice,
        orderQuantities,
        components: sanitizedComponents,
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

  const orderQuantityOnChange = (val: string) => {
    if (isValidInt(val)) {
      setOrderQuantity(val);
    }
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
  const projectInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val: string | number = e.target.value;
    let isAllowed = true;

    switch (e.target.name as keyof CreateProjectInput) {
      case "name":
        isAllowed = isValidAlphanumeric(val);
        break;
      case "orderQuantities":
        isAllowed = isValidInt(val);
        val = parseInt(val, 10);
        break;
      case "targetPrice":
      case "totalWeight":
        isAllowed = isValidFloat(val);
        break;
      default:
        break;
    }
    if (isAllowed) {
      setProjectData({
        ...projectData,
        [e.target.name]: val,
      });
    }
  };

  // check if create project button should be disabled
  const shouldDisableCreateProjectButton = () => {
    for (let key in projectData) {
      const attr = key as keyof CreateProjectInput;
      if (attr === "targetPrice") {
        if (!projectData.targetPrice) return true;
        continue;
      }
      if (Array.isArray(projectData[attr])) {
        if ((projectData[attr] as []).length === 0) return true;
        return false;
      } else if (!(projectData[attr] as string).length) {
        return true;
      }
    }

    return projectData.components!.length === 0;
  };

  const createProject = async () => {
    try {
      await createProjectMutation({
        variables: {
          data: {
            ...(projectData as CreateProjectInput),
            userId: user!.id,
            creationMode: ProjectCreationMode.Advanced,
          },
        },
      });

      navigate(GENERAL_ROUTES.PROJECTS);

      setSnackbar({
        severity: "success",
        message: "Project created.",
      });
    } catch (e) {
      setSnackbar({
        severity: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleAddressOnChange = (address: string) => {
    setProjectData({
      ...projectData,
      deliveryAddress: address,
    });
  };

  const isLoading = createProjectLoading || getCustomerProjectLoading;

  return (
    <>
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
        <Container maxWidth="sm">
          <Stack
            spacing={2}
            textAlign="left"
            sx={{ "& .MuiListItem-root div": { flexGrow: 2 } }}
          >
            <ListItem>
              <TextField
                autoComplete="new-password"
                label={intl.formatMessage({
                  id: "app.project.attribute.name",
                })}
                onChange={projectInputOnChange}
                name="name"
                value={projectData.name}
              />
            </ListItem>
            <ListItem>
              <ProjectCategoryDropdown
                defaultCategory={projectData.category!}
                parentSetDataCallback={(category: string) => {
                  setProjectData((prev) => ({ ...prev, category }));
                }}
                label={intl.formatMessage({
                  id: "app.project.attribute.category",
                })}
              />
            </ListItem>
            <ListItem>
              <TextField
                autoComplete="new-password"
                label={intl.formatMessage({
                  id: "app.project.attribute.totalWeight",
                })}
                onChange={projectInputOnChange}
                name="totalWeight"
                value={projectData.totalWeight}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">g</InputAdornment>
                  ),
                }}
              />
            </ListItem>
            <ListItem>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  disablePast
                  label={intl.formatMessage({
                    id: "app.project.attribute.deliveryDate",
                  })}
                  inputFormat="YYYY-MM-DD"
                  value={projectData.deliveryDate}
                  onChange={(v: any) => {
                    if (!v || !v._isValid) return;

                    setProjectData({
                      ...projectData,
                      deliveryDate: new Date(v._d).toISOString().split("T")[0],
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="deliveryDate"
                      value={projectData.deliveryDate}
                    />
                  )}
                />
              </LocalizationProvider>
            </ListItem>

            <ListItem>
              <GoogleMapAutocomplete
                parentSetDataHandler={handleAddressOnChange}
                label={intl.formatMessage({
                  id: "app.project.attribute.deliveryAddress",
                })}
                defaultAddress={projectData.deliveryAddress}
              />
            </ListItem>

            <ListItem>
              <TextField
                autoComplete="new-password"
                type="tel"
                label={intl.formatMessage({
                  id: "app.project.attribute.targetPrice",
                })}
                onChange={projectInputOnChange}
                name="targetPrice"
                value={projectData.targetPrice || ""}
              />
            </ListItem>

            <ListItem>
              <Box>
                <Autocomplete
                  options={[]}
                  freeSolo
                  multiple
                  value={[...projectData.orderQuantities!]}
                  inputValue={orderQuantity}
                  onInputChange={(e, v) => orderQuantityOnChange(v)}
                  onBlur={() => {
                    if (orderQuantity) {
                      setProjectData((prev) => ({
                        ...prev,
                        orderQuantities: [
                          ...prev.orderQuantities!,
                          +orderQuantity,
                        ],
                      }));
                    }
                    setOrderQuantity("");
                  }}
                  onChange={(e, v) => {
                    if (!v) {
                      setProjectData((prev) => ({
                        ...prev,
                        orderQuantities: [],
                      }));
                    } else {
                      setProjectData((prev) => ({
                        ...prev,
                        orderQuantities: v.map((v) => +v),
                      }));
                    }
                  }}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        autoComplete="new-password"
                        type="tel"
                        label={intl.formatMessage({
                          id: "app.project.attribute.orderQuantities",
                        })}
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password", // disable autocomplete and autofill
                        }}
                        InputLabelProps={{
                          sx: {
                            fontSize: 16,
                            top: -7,
                          },
                        }}
                        value={orderQuantity}
                        onChange={(e) => orderQuantityOnChange(e.target.value)}
                      />
                    );
                  }}
                  renderOption={() => null}
                />
              </Box>
            </ListItem>
          </Stack>
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
                    arrow
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
                    arrow
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
