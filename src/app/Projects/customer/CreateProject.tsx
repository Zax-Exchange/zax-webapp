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
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLocation, useNavigate } from "react-router-dom";
import FullScreenLoading from "../../Utils/Loading";
import { isValidAlphanumeric, isValidInt } from "../../Utils/inputValidators";
import GoogleMapAutocomplete from "../../Utils/GoogleMapAutocomplete";
import UploadDesign from "./UploadDesign";
import React from "react";

import useCustomSnackbar from "../../Utils/CustomSnackbar";
import { CUSTOMER_ROUTES } from "../../constants/loggedInRoutes";
import { useCreateProjectMutation } from "../../gql/create/project/project.generated";
import { useGetCustomerProjectsLazyQuery } from "../../gql/get/customer/customer.generated";
import {
  CreateProjectComponentSpecInput,
  CreateProjectInput,
} from "../../../generated/graphql";
import CreateProjectComponentModal from "./modals/CreateProjectComponentModal";
import CancelIcon from "@mui/icons-material/Cancel";

const CreateProject = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [createProjectMutation, { loading }] = useCreateProjectMutation();

  const [getCustomerProjects] = useGetCustomerProjectsLazyQuery();

  const [projectData, setProjectData] = useState<CreateProjectInput>({
    userId: user!.id,
    name: "",
    deliveryAddress: "",
    deliveryDate: new Date().toISOString().split("T")[0],
    budget: 0,
    designId: "",
    comments: "",
    components: [],
  });
  console.log(projectData.components);
  const [componentModalOpen, setComponentModalOpen] = useState(false);

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
      case "budget":
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
      if (key === "budget") {
        if (projectData.budget === 0) return true;
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
          data: projectData,
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

  const renderComponentSpecAccordionDetail = (
    spec: CreateProjectComponentSpecInput
  ) => {
    const {
      productName,
      dimension,
      thickness,
      flute,
      color,
      manufacturingProcess,
      material,
      materialSource,
      postProcess,
      finish,
      outsideMaterial,
      outsideMaterialSource,
      outsidePostProcess,
      outsideFinish,
      outsideColor,
      insideMaterial,
      insideMaterialSource,
      insidePostProcess,
      insideFinish,
      insideColor,
    } = spec;

    const res: JSX.Element[] = [];

    // for (let key in spec) {

    if (productName) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Product</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="caption">{productName}</Typography>
          </TableCell>
        </TableRow>
      );
    }
    if (dimension) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Dimension</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="caption">{dimension}</Typography>
          </TableCell>
        </TableRow>
      );
    }
    if (thickness) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Thickness</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{thickness}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (flute) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Flute</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{flute}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (color) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Color</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{color}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (manufacturingProcess) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Manufacturing Process</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{manufacturingProcess}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (material) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Material</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{material}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (materialSource) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Material Source</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{materialSource}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (postProcess && postProcess.length) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Post Process</Typography>
          </TableCell>

          <TableCell>
            <Stack>
              {postProcess.map((process) => {
                return (
                  <ListItem sx={{ padding: 0 }}>
                    <Typography variant="caption">{process}</Typography>
                  </ListItem>
                );
              })}
            </Stack>
          </TableCell>
        </TableRow>
      );
    }

    if (finish) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Finish</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{finish}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (outsideMaterial) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Outside Material</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{outsideMaterial}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (outsideMaterialSource) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Outside Material Source</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{outsideMaterial}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (outsidePostProcess && outsidePostProcess.length) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Outside Post Process</Typography>
          </TableCell>

          <TableCell>
            <Stack>
              {outsidePostProcess.map((process) => {
                return (
                  <ListItem sx={{ padding: 0 }}>
                    <Typography variant="caption">{process}</Typography>
                  </ListItem>
                );
              })}
            </Stack>
          </TableCell>
        </TableRow>
      );
    }

    if (outsideFinish) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Outside Finish</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{outsideFinish}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (outsideColor) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Outside Color</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{outsideColor}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (insideMaterial) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Inside Material</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{insideMaterial}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (insideMaterialSource) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Inside Material Source</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{insideMaterial}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (insidePostProcess && insidePostProcess.length) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Inside Post Process</Typography>
          </TableCell>

          <TableCell>
            <Stack>
              {insidePostProcess.map((process) => {
                return (
                  <ListItem sx={{ padding: 0 }}>
                    <Typography variant="caption">{process}</Typography>
                  </ListItem>
                );
              })}
            </Stack>
          </TableCell>
        </TableRow>
      );
    }

    if (insideFinish) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Inside Finish</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{insideFinish}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (insideColor) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Inside Color</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{insideColor}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    return (
      <TableContainer>
        <Table size="small">
          <TableBody>{res}</TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <>
      {loading && <FullScreenLoading />}
      <Paper sx={{ padding: 5 }}>
        <Box display="flex" mb={4}>
          <Typography variant="h6" textAlign="left" flexGrow={1}>
            Configure Project Detail
          </Typography>

          <Stack direction="row">
            <ListItem>
              <UploadDesign setProjectData={setProjectData} />
            </ListItem>
            <ListItem>
              <Button onClick={openComponentModal} variant="text">
                Add component
              </Button>
            </ListItem>
            <ListItem>
              <Button
                variant="outlined"
                disabled={shouldDisableCreateProjectButton()}
                onClick={createProject}
              >
                CREATE
              </Button>
            </ListItem>
          </Stack>
        </Box>
        <Container maxWidth="sm">
          <Stack spacing={2} textAlign="left">
            <TextField
              autoComplete="new-password"
              label="Project Name"
              onChange={projectInputOnChange}
              name="name"
              value={projectData.name}
            />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                disablePast
                label="Delivery Date"
                inputFormat="YYYY-MM-DD"
                value={projectData.deliveryDate}
                onChange={(v: any) => {
                  if (!v) return;
                  setProjectData({
                    ...projectData,
                    deliveryDate: new Date(v._d).toISOString().split("T")[0],
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} name="deliveryDate" />
                )}
              />
            </LocalizationProvider>
            <GoogleMapAutocomplete
              parentSetDataHandler={handleAddressOnChange}
            />

            <TextField
              autoComplete="new-password"
              type="tel"
              label="Budget"
              onChange={projectInputOnChange}
              name="budget"
              value={projectData.budget || ""}
            />
            <TextField
              autoComplete="new-password"
              multiline
              label="Comments"
              onChange={projectInputOnChange}
              name="comments"
              value={projectData.comments}
            />
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
                    {renderComponentSpecAccordionDetail(comp.componentSpec)}
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

export default CreateProject;
