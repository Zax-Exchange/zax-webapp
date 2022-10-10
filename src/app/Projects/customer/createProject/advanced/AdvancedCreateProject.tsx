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
  isValidInt,
} from "../../../../Utils/inputValidators";
import GoogleMapAutocomplete from "../../../../Utils/GoogleMapAutocomplete";
import UploadDesign from "../../UploadDesign";
import React from "react";

import useCustomSnackbar from "../../../../Utils/CustomSnackbar";
import { CUSTOMER_ROUTES } from "../../../../constants/loggedInRoutes";
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
import CreateProjectComponentModal from "../../modals/CreateProjectComponentModal";
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

  const [projectData, setProjectData] = useState<CreateProjectInput>({
    userId: user!.id,
    creationMode: ProjectCreationMode.Advanced,
    name: "",
    deliveryAddress: "",
    category: "",
    totalWeight: "",
    deliveryDate: new Date().toISOString().split("T")[0],
    targetPrice: 0,
    orderQuantities: [],
    comments: "",
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

  // record temporary designs in case user closes this modal we need to cleanup the design files in backend
  // this array will store for at most 1 component's designs
  const [temporaryDesigns, setTemporaryDesigns] = useState<
    ProjectDesign[] | null
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
          const copySpec: any = Object.assign({}, comp.componentSpec);
          const copyComp: any = Object.assign({}, comp);

          // get rid of ids and typenames so data between getProjectData and createProjectData is uniform
          delete copyComp.__typename;
          delete copyComp.id;
          delete copyComp.projectId;
          delete copySpec.id;
          delete copySpec.__typename;
          delete copyComp.designs;

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
        totalWeight: totalWeight.split(" ")[0],
        deliveryDate,
        targetPrice,
        orderQuantities,
        components: sanitizedComponents,
      }));

      // initialize empty design arrays for each component
      setComponentsDesigns([...Array(components.length)].map(() => []));
    }
  }, [getCustomerProjectData]);

  // if there are temporary design files uploaded but user closes the modal already, we clean up/delete the files
  useEffect(() => {
    if (temporaryDesigns && temporaryDesigns.length && !componentModalOpen) {
      Promise.all(
        temporaryDesigns.map((design) => {
          return deleteDesign({
            variables: {
              data: {
                designId: design.designId,
              },
            },
          });
        })
      );
      setTemporaryDesigns([]);
    }
  }, [temporaryDesigns, componentModalOpen]);

  // Switch tab for components detail section.
  const componentTabOnChange = (
    event: React.SyntheticEvent,
    newTab: number
  ) => {
    setCurrentTab(newTab);
  };

  const addOrderQuantity = () => {
    setProjectData({
      ...projectData,
      orderQuantities: [
        ...projectData.orderQuantities,
        parseInt(orderQuantity, 10),
      ],
    });
    setOrderQuantity("");
  };

  const removeOrderQuantity = (ind: number) => {
    const orderQuantities = [...projectData.orderQuantities];
    orderQuantities.splice(ind, 1);
    setProjectData({
      ...projectData,
      orderQuantities,
    });
  };

  const orderQuantityOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (isValidInt(val)) {
      setOrderQuantity(val);
    }
  };

  const deleteDesignFiles = async (id: string) => {
    deleteDesign({
      variables: {
        data: {
          designId: id,
        },
      },
    });
  };

  const removeComponent = (i: number) => {
    const comps = [...projectData.components];
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
          return deleteDesignFiles(d.designId);
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

    switch (e.target.name) {
      case "name":
      case "comments":
        isAllowed = isValidAlphanumeric(val);
        break;
      case "targetPrice":
      case "orderQuantities":
        isAllowed = isValidInt(val);
        val = parseInt(val, 10);
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
      if (key === "comments" || key === "designId") continue;
      if (key === "targetPrice") {
        if (projectData.targetPrice === 0) return true;
        continue;
      }
      if (
        Array.isArray(projectData[key as keyof CreateProjectInput]) &&
        (projectData[key as keyof CreateProjectInput] as []).length === 0
      ) {
        return true;
      }
      if (!(projectData[key as keyof CreateProjectInput] as string).length) {
        return true;
      }
    }

    return projectData.components.length === 0;
  };

  const createProject = async () => {
    try {
      await createProjectMutation({
        variables: {
          data: {
            ...projectData,
            totalWeight: projectData.totalWeight + " g",
          },
        },
      });

      navigate(CUSTOMER_ROUTES.PROJECTS);

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

          <Stack direction="row">
            <ListItem>
              <Button onClick={openComponentModal} variant="text">
                {intl.formatMessage({
                  id: "app.customer.createProject.addComponent",
                })}
              </Button>
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                disabled={shouldDisableCreateProjectButton()}
                onClick={createProject}
              >
                {intl.formatMessage({
                  id: "app.customer.createProject.create",
                })}
              </Button>
            </ListItem>
          </Stack>
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
                defaultCategory={projectData.category}
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
              <TextField
                autoComplete="new-password"
                type="tel"
                label={intl.formatMessage({
                  id: "app.project.attribute.orderQuantities",
                })}
                onChange={orderQuantityOnChange}
                value={orderQuantity}
              />
              <IconButton onClick={addOrderQuantity}>
                <AddCircleIcon />
              </IconButton>
            </ListItem>
            {!!projectData.orderQuantities.length &&
              projectData.orderQuantities.map((quantity, i) => {
                return (
                  <ListItem>
                    <Typography variant="caption">{quantity}</Typography>
                    <IconButton onClick={() => removeOrderQuantity(i)}>
                      <CancelIcon />
                    </IconButton>
                  </ListItem>
                );
              })}
            <ListItem>
              <TextField
                autoComplete="new-password"
                multiline
                label={intl.formatMessage({
                  id: "app.project.attribute.comments",
                })}
                onChange={projectInputOnChange}
                name="comments"
                value={projectData.comments}
              />
            </ListItem>
          </Stack>
        </Container>
      </Paper>

      {!!projectData.components.length && (
        <Paper sx={{ mt: 1 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={currentTab} onChange={componentTabOnChange}>
              {projectData.components.map((comp, i) => {
                return <Tab label={comp.name} key={i} />;
              })}
            </Tabs>
          </Box>
          {projectData.components.map((comp, i) => {
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
        onClose={componentModalOnClose}
        PaperProps={{
          sx: {
            borderTopLeftRadius: "4px",
            borderBottomLeftRadius: "4px",
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
          projectData={projectData}
          setProjectData={setProjectData}
          setComponentModalOpen={setComponentModalOpen}
          setTemporaryDesigns={setTemporaryDesigns}
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
