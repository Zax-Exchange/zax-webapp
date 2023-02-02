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
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import Edit from "@mui/icons-material/Edit";
import { useIntl } from "react-intl";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import { useDeleteProjectDesignMutation } from "../../gql/delete/project/project.generated";
import {
  CreateGuestProjectInput,
  CreateProjectInput,
  ProjectCreationMode,
  ProjectDesign,
  ProjectVisibility,
} from "../../../generated/graphql";
import {
  isValidAlphanumeric,
  isValidFloat,
  isValidInt,
} from "../../Utils/inputValidators";
import { useCreateGuestProjectMutation } from "../../gql/create/project/project.generated";
import FullScreenLoading from "../../Utils/Loading";
import ProjectCategoryDropdown from "../../Utils/ProjectCategoryDropdown";
import GoogleMapAutocomplete from "../../Utils/GoogleMapAutocomplete";
import ComponentSpecDetail from "../../Projects/common/ComponentSpecDetail";
import { Cancel } from "@mui/icons-material";
import CreateProjectComponentModal from "../../Projects/customer/createProject/advanced/modals/CreateProjectComponentModal";
import ProjectSpecInput from "../../Projects/customer/createProject/common/ProjectSpecInput";

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

const GuestAdvamcedCreate = ({
  projectId,
  setProjectCreated,
}: {
  projectId: string;
  setProjectCreated: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const intl = useIntl();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  const [deleteDesign, { error: deleteDesignError }] =
    useDeleteProjectDesignMutation();

  const [
    createGuestProject,
    {
      loading: createGuestProjectLoading,
      error: createGuestProjectError,
      data: createGuestProjectData,
    },
  ] = useCreateGuestProjectMutation();

  const [projectData, setProjectData] = useState<CreateProjectInput>({
    name: "",
    deliveryAddress: "",
    country: "",
    category: "",
    totalWeight: "",
    deliveryDate: new Date().toISOString().split("T")[0],
    targetPrice: "",
    orderQuantities: [],
    components: [],
    creationMode: ProjectCreationMode.Advanced,
    userId: "",
    visibility: ProjectVisibility.Private,
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

    switch (e.target.name as keyof CreateGuestProjectInput) {
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
      if (attr === "userId") continue;

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

    return false;
  };

  const convertProjectInputToGuestProjectInput = (
    data: CreateProjectInput
  ): CreateGuestProjectInput => {
    return {
      category: data.category,
      components: data.components,
      country: data.country,
      creationMode: data.creationMode,
      deliveryAddress: data.deliveryAddress,
      deliveryDate: data.deliveryDate,
      name: data.name,
      orderQuantities: data.orderQuantities,
      projectId,
      targetPrice: data.targetPrice,
      totalWeight: data.totalWeight,
    };
  };
  const createProject = async () => {
    try {
      await createGuestProject({
        variables: {
          data: {
            ...convertProjectInputToGuestProjectInput(projectData),
            projectId,
          } as CreateGuestProjectInput,
        },
      });

      setProjectCreated(true);
    } catch (e) {
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({ id: "app.general.network.error" }),
      });
      setSnackbarOpen(true);
    }
  };

  const handleAddressOnChange = (address: string, country: string) => {
    setProjectData({
      ...projectData,
      deliveryAddress: address,
      country,
    });
  };

  const isLoading = createGuestProjectLoading;

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
          <ProjectSpecInput
            projectData={projectData}
            setProjectData={setProjectData}
            isGuest={true}
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

export default GuestAdvamcedCreate;
