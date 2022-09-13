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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useIntl } from "react-intl";

const CreateProject = () => {
  const intl = useIntl();
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
    targetPrice: 0,
    orderQuantities: [],
    designId: "",
    comments: "",
    components: [],
  });

  const [orderQuantity, setOrderQuantity] = useState("");
  const [componentModalOpen, setComponentModalOpen] = useState(false);

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

  const orderQuantityOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (isValidInt(val)) {
      setOrderQuantity(val);
    }
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
            <Typography variant="subtitle2">
              {intl.formatMessage({ id: "app.component.attribute.product" })}
            </Typography>
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
            <Typography variant="subtitle2">
              {intl.formatMessage({ id: "app.component.attribute.dimension" })}
            </Typography>
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
            <Typography variant="subtitle2">
              {intl.formatMessage({ id: "app.component.attribute.thickness" })}
            </Typography>
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
            <Typography variant="subtitle2">
              {intl.formatMessage({ id: "app.component.attribute.flute" })}
            </Typography>
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
            <Typography variant="subtitle2">
              {intl.formatMessage({ id: "app.component.attribute.color" })}
            </Typography>
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
            <Typography variant="subtitle2">
              {intl.formatMessage({
                id: "app.component.attribute.manufacturingProcess",
              })}
            </Typography>
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
            <Typography variant="subtitle2">
              {intl.formatMessage({ id: "app.component.attribute.material" })}
            </Typography>
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
            <Typography variant="subtitle2">
              {intl.formatMessage({
                id: "app.component.attribute.materialSource",
              })}
            </Typography>
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
            <Typography variant="subtitle2">
              {intl.formatMessage({
                id: "app.component.attribute.postProcess",
              })}
            </Typography>
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
            <Typography variant="subtitle2">
              {intl.formatMessage({ id: "app.component.attribute.finish" })}
            </Typography>
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
            <Typography variant="subtitle2">
              {intl.formatMessage({
                id: "app.component.attribute.outsideMaterial",
              })}
            </Typography>
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
            <Typography variant="subtitle2">
              {intl.formatMessage({
                id: "app.component.attribute.outsideMaterialSource",
              })}
            </Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{outsideMaterialSource}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (outsidePostProcess && outsidePostProcess.length) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">
              {intl.formatMessage({
                id: "app.component.attribute.outsidePostProcess",
              })}
            </Typography>
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
            <Typography variant="subtitle2">
              {intl.formatMessage({
                id: "app.component.attribute.outsideFinish",
              })}
            </Typography>
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
            <Typography variant="subtitle2">
              {intl.formatMessage({
                id: "app.component.attribute.outsideColor",
              })}
            </Typography>
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
            <Typography variant="subtitle2">
              {intl.formatMessage({
                id: "app.component.attribute.insideMaterial",
              })}
            </Typography>
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
            <Typography variant="subtitle2">
              {intl.formatMessage({
                id: "app.component.attribute.insideMaterialSource",
              })}
            </Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{insideMaterialSource}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (insidePostProcess && insidePostProcess.length) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">
              {intl.formatMessage({
                id: "app.component.attribute.insidePostProcess",
              })}
            </Typography>
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
            <Typography variant="subtitle2">
              {intl.formatMessage({
                id: "app.component.attribute.insideFinish",
              })}
            </Typography>
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
            <Typography variant="subtitle2">
              {intl.formatMessage({
                id: "app.component.attribute.insideColor",
              })}
            </Typography>
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
                variant="outlined"
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
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  disablePast
                  label={intl.formatMessage({
                    id: "app.project.attribute.deliveryDate",
                  })}
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
            </ListItem>

            <ListItem>
              <GoogleMapAutocomplete
                parentSetDataHandler={handleAddressOnChange}
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
