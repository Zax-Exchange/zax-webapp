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
} from "../../../../../generated/graphql";
import CreateProjectComponentModal from "../../modals/CreateProjectComponentModal";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useIntl } from "react-intl";
import ComponentSpecDetail from "../../../common/ComponentSpecDetail";
import ProjectCategoryDropdown from "../../../../Utils/ProjectCategoryDropdown";

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
    designIds: [],
    comments: "",
    components: [],
  });

  const [orderQuantity, setOrderQuantity] = useState("");
  const [componentModalOpen, setComponentModalOpen] = useState(false);

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

  useEffect(() => {
    if (getCustomerProjectData && getCustomerProjectData.getCustomerProject) {
      const {
        name,
        deliveryAddress,
        category,
        totalWeight,
        targetPrice,
        deliveryDate,
        design,
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

          return {
            ...copyComp,
            componentSpec: copySpec,
          };
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
    }
  }, [getCustomerProjectData]);

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

  const removeComponent = (i: number) => {
    const comps = [...projectData.components];
    comps.splice(i, 1);

    setProjectData({
      ...projectData,
      components: comps,
    });
  };
  const openComponentModal = () => {
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
              <UploadDesign setProjectData={setProjectData} />
            </ListItem>
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
        <Stack sx={{ marginTop: 4 }}>
          {projectData.components.map((comp, i) => {
            return (
              <ListItem sx={{ padding: 0, mb: 2 }}>
                <Accordion sx={{ flexGrow: 2 }}>
                  <AccordionSummary
                    key={i}
                    expandIcon={<ExpandMoreIcon />}
                    id={`component-summary-${i}`}
                  >
                    <Typography variant="subtitle2">{comp.name}</Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <ComponentSpecDetail spec={comp.componentSpec} />
                  </AccordionDetails>
                </Accordion>
                <IconButton onClick={() => removeComponent(i)}>
                  <CancelIcon />
                </IconButton>
              </ListItem>
            );
          })}
        </Stack>
      )}
      <Dialog
        open={componentModalOpen}
        onClose={() => setComponentModalOpen(false)}
        maxWidth="xl"
      >
        <CreateProjectComponentModal
          projectData={projectData}
          setProjectData={setProjectData}
          setComponentModalOpen={setComponentModalOpen}
        />
      </Dialog>
    </>
  );
};

export default AdvancedCreateProject;
