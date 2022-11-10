import {
  Autocomplete,
  Box,
  Button,
  Container,
  Dialog,
  Drawer,
  IconButton,
  InputAdornment,
  InputProps,
  List,
  ListItem,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import {
  CreateProjectComponentInput,
  CreateProjectInput,
  ProjectCreationMode,
  ProjectDesign,
  ProjectPermission,
  UpdateProjectComponentInput,
  UpdateProjectInput,
} from "../../../../generated/graphql";
import {
  CUSTOMER_ROUTES,
  GENERAL_ROUTES,
} from "../../../constants/loggedInRoutes";
import {
  useCreateProjectComponentsMutation,
  useCreateProjectMutation,
} from "../../../gql/create/project/project.generated";
import { useDeleteProjectDesignMutation } from "../../../gql/delete/project/project.generated";
import {
  useGetCustomerProjectLazyQuery,
  useGetCustomerProjectQuery,
} from "../../../gql/get/customer/customer.generated";
import {
  useUpdateProjectComponentsMutation,
  useUpdateProjectMutation,
} from "../../../gql/update/project/project.generated";
import useCustomSnackbar from "../../../Utils/CustomSnackbar";
import {
  isValidAlphanumeric,
  isValidFloat,
  isValidInt,
} from "../../../Utils/inputValidators";
import FullScreenLoading from "../../../Utils/Loading";
import ProjectCategoryDropdown from "../../../Utils/ProjectCategoryDropdown";
import GoogleMapAutocomplete from "../../../Utils/GoogleMapAutocomplete";
import { Cancel, Edit, Restore } from "@mui/icons-material";
import ComponentSpecDetail from "../../common/ComponentSpecDetail";
import CreateProjectComponentModal from "../createProject/advanced/modals/CreateProjectComponentModal";
import { useGetProjectDetailQuery } from "../../../gql/get/project/project.generated";
import CreateOrUpdateComponentModal from "./modals/CreateOrUpdateComponentModal";
import PermissionDenied from "../../../Utils/PermissionDenied";

type EditProjectErrors = Record<keyof UpdateProjectInput, boolean>;

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

const EditProject = () => {
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = useParams();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  const [updateProjectMutation, { loading: updateProjectLoading }] =
    useUpdateProjectMutation();

  const [
    updateProjectComponents,
    {
      loading: updateProjectComponentLoading,
      error: updateProjectComponentError,
    },
  ] = useUpdateProjectComponentsMutation();

  const [
    createProjectComponentsMutation,
    {
      loading: createProjectComponentsLoading,
      error: createProjectComponentsError,
    },
  ] = useCreateProjectComponentsMutation();

  // use get customer project here so we can check whether user has permission or not
  const {
    data: getCustomerProjectData,
    loading: getCustomerProjectLoading,
    error: getCustomerProjectError,
  } = useGetCustomerProjectQuery({
    variables: {
      data: {
        projectId: projectId || "",
        userId: user!.id,
      },
    },
    fetchPolicy: "no-cache",
  });

  const [deleteDesign, { error: deleteDesignError }] =
    useDeleteProjectDesignMutation();

  const [projectData, setProjectData] = useState<UpdateProjectInput>({
    projectId: projectId || "",
    name: "",
    deliveryAddress: "",
    category: "",
    totalWeight: "",
    deliveryDate: new Date().toISOString().split("T")[0],
    targetPrice: "",
    orderQuantities: [],
    comments: "",
  });

  const [components, setComponents] = useState<
    (CreateProjectComponentInput | UpdateProjectComponentInput)[]
  >([]);

  // Flags to indicate which project detail field input is in error.
  const [projectEditError, setProjectEditError] = useState(
    {} as EditProjectErrors
  );

  // index of component if use clicks edit button on one of the component detail
  // we will use this to pass into createComponentModal to inject existing data to the fields
  const [componentIndexToEdit, setComponentIndexToEdit] = useState<
    number | null
  >(null);

  // For project component section.
  const [currentTab, setCurrentTab] = useState(0);

  const [orderQuantity, setOrderQuantity] = useState("");
  const [componentModalOpen, setComponentModalOpen] = useState(false);

  // record designs for added components, for both display purpose and so that we know
  // which designs to cleanup when user deletes the component
  const [componentsDesigns, setComponentsDesigns] = useState<ProjectDesign[][]>(
    []
  );

  // temporary designs are the ones uploaded/deleted while the modal is open
  // we record those so that we can clean up/restore files if user closes modal without saving
  // only used for when user EDITS a component.
  const [temporaryDesigns, setTemporaryDesigns] = useState<ProjectDesign[]>([]);

  const [temporaryDesignsToDelete, setTemporaryDesignsToDelete] = useState<
    ProjectDesign[]
  >([]);

  // store all removed components so users can restore them if they choose to
  const [removedComponents, setRemovedComponents] = useState<
    (CreateProjectComponentInput | UpdateProjectComponentInput)[]
  >([]);

  // designs associated with removed components, if component does not have designs, it'll be an empty array
  const [removedComponentsDesigns, setRemovedComponentsDesigns] = useState<
    ProjectDesign[][]
  >([]);

  const [permissionError, setPermissionError] = useState(false);

  useEffect(() => {
    if (getCustomerProjectError) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [getCustomerProjectError]);

  // initialize all project data
  useEffect(() => {
    if (getCustomerProjectData && getCustomerProjectData.getCustomerProject) {
      if (
        getCustomerProjectData.getCustomerProject.permission ===
        ProjectPermission.Viewer
      ) {
        setPermissionError(true);
        return;
      }

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

      const sanitizedComponents: UpdateProjectComponentInput[] = components.map(
        (comp) => {
          const copySpec: any = JSON.parse(JSON.stringify(comp.componentSpec));
          delete copySpec.__typename;
          delete copySpec.dimension.__typename;

          copySpec.componentSpecId = copySpec.id;
          delete copySpec.id;

          if (copySpec.postProcess) {
            for (let process of copySpec.postProcess) {
              delete process.__typename;
              if (process.estimatedArea) {
                delete process.estimatedArea.__typename;
              }
            }
          }

          return {
            componentId: comp.id,
            designIds: comp.designs?.map((d) => d.designId),
            name: comp.name,
            componentSpec: copySpec,
          } as UpdateProjectComponentInput;
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
      }));

      setComponents(sanitizedComponents);

      setComponentsDesigns((prev) => {
        return components.map((comp) => {
          if (comp.designs && comp.designs.length) {
            return comp.designs;
          }
          return [];
        });
      });
    }
  }, [getCustomerProjectData]);

  // Leverage useEffect to set error flags for project detail edit mode.
  useEffect(() => {
    if (projectData) {
      // Since in edit mode, order quantity input is not a direct input field that can be converted to Typography
      // but rather an input for adding to order quantities list we listen for order quantities changes and indicate
      // error when the list is empty.
      if (!projectData.orderQuantities.length) {
        setProjectEditError((prev) => ({ ...prev, orderQuantities: true }));
      } else {
        setProjectEditError((prev) => ({ ...prev, orderQuantities: false }));
      }

      // If user clears deliveryAddress field, display error.
      if (!projectData.deliveryAddress) {
        setProjectEditError((prev) => ({ ...prev, deliveryAddress: true }));
      } else {
        setProjectEditError((prev) => ({ ...prev, deliveryAddress: false }));
      }

      // If user clears category field, display error.
      if (!projectData.category) {
        setProjectEditError((prev) => ({ ...prev, category: true }));
      } else {
        setProjectEditError((prev) => ({ ...prev, category: false }));
      }

      for (let attr of Object.keys(projectData)) {
        const key: keyof UpdateProjectInput = attr as keyof UpdateProjectInput;
        if (key === "comments") continue;

        if (typeof projectData[key] === "string") {
          if (projectData[key] === "") {
            setProjectEditError((prev) => ({ ...prev, [key]: true }));
          } else {
            setProjectEditError((prev) => ({ ...prev, [key]: false }));
          }
        }

        if (key === "targetPrice") {
          if (isNaN(parseFloat(projectData[key]))) {
            setProjectEditError((prev) => ({ ...prev, [key]: true }));
          }
        }
      }
    }
  }, [projectData]);

  useEffect(() => {
    // if user uploads some files without saving, we delete them
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
    // user deletes without saving, we restore by just resetting the array
    // the files in this array were never truly deleted, they were merely recorded
    // they only get deleted when user hits save
    if (temporaryDesignsToDelete.length && !componentModalOpen) {
      setTemporaryDesignsToDelete([]);
    }
  }, [temporaryDesigns, componentModalOpen]);

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
          designId: id,
        },
      },
    });
  };

  const restoreComponent = (i: number) => {
    const allRemovedComponents = [...removedComponents];
    const allRemovedComponentDesigns = [...removedComponentsDesigns];

    const restoredComponent = allRemovedComponents.splice(i, 1)[0];
    const restoredComponentDesigns = allRemovedComponentDesigns.splice(i, 1)[0];

    setRemovedComponents(allRemovedComponents);
    setRemovedComponentsDesigns(allRemovedComponentDesigns);

    setComponents((prev) => [...prev, restoredComponent]);
    setComponentsDesigns((prev) => [...prev, restoredComponentDesigns]);
  };

  // TODO: let backend handle design files cleanup
  const removeComponent = (i: number) => {
    const comps = [...components];
    const removedComponent = comps.splice(i, 1)[0];
    const removedComponentDesigns = componentsDesigns[i];

    // handles the case where currentTab is first/last and removing the component would left the currentTab in limbo
    if (i === currentTab) {
      const newTab = i - 1 >= 0 ? i - 1 : 0;
      setCurrentTab(newTab);
    }

    setComponents(comps);
    setRemovedComponents((prev) => [...prev, removedComponent]);
    setRemovedComponentsDesigns((prev) => [...prev, removedComponentDesigns]);

    setComponentsDesigns((prev) => {
      const prevFiles = [...prev];
      prevFiles.splice(i, 1);
      return prevFiles;
    });
  };

  const openComponentModal = () => {
    // set this index to null right after clicking on create component so user starts clean
    // need this because we want to know the last opened component if there is one for reverting purpose.
    setComponentIndexToEdit(null);
    setComponentModalOpen(true);
  };

  // fires when user closes drawer by clicking outside of it
  const componentModalOnClose = () => {
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
      case "comments":
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
  const shouldDisableUpdateProjectButton = () => {
    for (let val of Object.values(projectEditError)) {
      if (val) return true;
    }

    return components.length === 0;
  };

  const isComponentOfUpdateType = (
    comp: UpdateProjectComponentInput | CreateProjectComponentInput
  ) => {
    // only pre-existing components have componentId
    if ((comp as UpdateProjectComponentInput).componentId) {
      const id = (comp as UpdateProjectComponentInput).componentId;

      return true;
    }
    return false;
  };

  const updateProject = async () => {
    try {
      const compsForUpdate: UpdateProjectComponentInput[] = [];
      const compsForCreate: CreateProjectComponentInput[] = [];

      for (let comp of components) {
        if (isComponentOfUpdateType(comp)) {
          compsForUpdate.push(comp as UpdateProjectComponentInput);
        } else {
          // we need to add projectId field because we're calling the standalone
          // createProjectComponent gql endpoint instead of bundling it along with createProject
          compsForCreate.push({
            projectId: projectData.projectId,
            ...comp,
          });
        }
      }

      await Promise.all([
        updateProjectMutation({
          variables: {
            data: {
              ...projectData,
            },
          },
        }),
        createProjectComponentsMutation({
          variables: {
            data: compsForCreate,
          },
        }),
        updateProjectComponents({
          variables: {
            data: compsForUpdate,
          },
        }),
      ]);

      const dest = GENERAL_ROUTES.PROJECT_DETAIL.split(":");

      dest[1] = projectData.projectId;

      navigate(`${dest.join("")}`);

      setSnackbar({
        severity: "success",
        message: "Project updated.",
      });
    } catch (e) {
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({ id: "app.general.network.error" }),
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

  const renderTextField = (
    projectAttribute: keyof UpdateProjectInput,
    projectFieldData: string | number | number[],
    label: string,
    InputProps?: Partial<InputProps>
  ) => {
    return (
      <TextField
        autoComplete="new-password"
        error={!!projectEditError[projectAttribute]}
        helperText={
          !!projectEditError[projectAttribute] &&
          intl.formatMessage({ id: "app.general.input.emptyError" })
        }
        onChange={projectInputOnChange}
        value={projectFieldData}
        name={projectAttribute}
        label={label}
        FormHelperTextProps={{
          sx: {
            margin: 0,
            fontSize: "0.7em",
          },
        }}
        InputProps={InputProps}
      />
    );
  };

  const isLoading =
    updateProjectLoading ||
    updateProjectComponentLoading ||
    createProjectComponentsLoading;

  if (getCustomerProjectError) {
    return null;
  }

  if (getCustomerProjectLoading) {
    return <FullScreenLoading />;
  }

  if (permissionError) {
    return (
      <Dialog open={true}>
        <PermissionDenied />
      </Dialog>
    );
  }

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
                disabled={shouldDisableUpdateProjectButton()}
                onClick={updateProject}
              >
                {intl.formatMessage({
                  id: "app.general.update",
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
              {renderTextField(
                "name",
                projectData.name,
                intl.formatMessage({ id: "app.project.attribute.name" })
              )}
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
                error={!!projectEditError.category}
                errorHelperText={
                  !!projectEditError.category
                    ? intl.formatMessage({ id: "app.general.input.emptyError" })
                    : ""
                }
              />
            </ListItem>
            <ListItem>
              {renderTextField(
                "totalWeight",
                projectData.totalWeight,
                intl.formatMessage({ id: "app.project.attribute.totalWeight" })
              )}
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
                    if (!v || !v._isValid) {
                      setProjectEditError((prev) => ({
                        ...prev,
                        deliveryDate: true,
                      }));
                      return;
                    }

                    setProjectEditError((prev) => ({
                      ...prev,
                      deliveryDate: false,
                    }));
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
                      error={!!projectEditError.deliveryDate}
                      helperText={
                        !!projectEditError.deliveryDate &&
                        intl.formatMessage({
                          id: "app.general.input.dateError",
                        })
                      }
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
                error={!!projectEditError.deliveryAddress}
                errorHelperText={
                  !!projectEditError.deliveryAddress
                    ? intl.formatMessage({ id: "app.general.input.emptyError" })
                    : ""
                }
              />
            </ListItem>

            <ListItem>
              {renderTextField(
                "targetPrice",
                projectData.targetPrice,
                intl.formatMessage({ id: "app.project.attribute.targetPrice" })
              )}
            </ListItem>

            <ListItem>
              <Box>
                <Autocomplete
                  options={[]}
                  freeSolo
                  multiple
                  value={[...projectData.orderQuantities]}
                  inputValue={orderQuantity}
                  onInputChange={(e, v) => orderQuantityOnChange(v)}
                  onBlur={() => {
                    if (orderQuantity) {
                      setProjectData((prev) => ({
                        ...prev,
                        orderQuantities: [
                          ...prev.orderQuantities,
                          +orderQuantity,
                        ].sort((a, b) => a - b),
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
                        orderQuantities: v.map((v) => +v).sort((a, b) => a - b),
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
                        error={!!projectEditError.orderQuantities}
                        helperText={
                          !!projectEditError.orderQuantities &&
                          intl.formatMessage({
                            id: "app.customer.projectDetail.error.orderQuantity.helperText",
                          })
                        }
                      />
                    );
                  }}
                  renderOption={() => null}
                />
              </Box>
            </ListItem>
            <ListItem>
              {renderTextField(
                "comments",
                projectData.comments || "",
                intl.formatMessage({ id: "app.project.attribute.comments" })
              )}
            </ListItem>
          </Stack>
        </Container>
      </Paper>

      {!!components.length && (
        <Paper sx={{ mt: 1 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={currentTab} onChange={componentTabOnChange}>
              {components.map((comp, i) => {
                return <Tab label={comp.name} key={i} />;
              })}
            </Tabs>
          </Box>
          {components.map((comp, i) => {
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
                      <Cancel />
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
      {!!removedComponents.length && (
        <Box mt={3}>
          <Box>
            <Typography variant="h6" textAlign="left">
              {intl.formatMessage({
                id: "app.customer.editProject.removedComponents",
              })}
            </Typography>
          </Box>
          <List>
            {removedComponents.map((comp, i) => {
              return (
                <ListItem>
                  <Typography variant="subtitle2">{comp.name}</Typography>
                  <Tooltip
                    title={intl.formatMessage({
                      id: "app.customer.editProject.restoreComponent",
                    })}
                    placement="right"
                    arrow
                  >
                    <IconButton onClick={() => restoreComponent(i)}>
                      <Restore />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              );
            })}
          </List>
        </Box>
      )}

      <Drawer
        anchor="right"
        open={componentModalOpen}
        onClose={componentModalOnClose}
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
        <CreateOrUpdateComponentModal
          setComponents={setComponents}
          setComponentsDesigns={setComponentsDesigns}
          setTemporaryDesigns={setTemporaryDesigns}
          setTemporaryDesignsToDelete={setTemporaryDesignsToDelete}
          setComponentModalOpen={setComponentModalOpen}
          setComponentIndexToEdit={setComponentIndexToEdit}
          temporaryDesignsToDelete={temporaryDesignsToDelete}
          componentIndexToEdit={componentIndexToEdit}
          existingDesigns={
            componentIndexToEdit !== null
              ? componentsDesigns[componentIndexToEdit]
              : null
          }
          existingComponent={
            componentIndexToEdit !== null
              ? components[componentIndexToEdit]
              : null
          }
        />
      </Drawer>
    </>
  );
};

export default EditProject;
