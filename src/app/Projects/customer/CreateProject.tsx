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
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import AddIcon from "@mui/icons-material/Add";

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
import { CreateProjectInput } from "../../../generated/graphql";
import CreateProjectComponentModal from "./modals/CreateProjectComponentModal";

export type ProjectData = {
  userId: string;
  name: string;
  deliveryAddress: string;
  budget: string;
  designId: string;
  comments: string;
};

export type ProjectComponentData = {
  name: string;
};

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

  const [componentModalOpen, setComponentModalOpen] = useState(false);

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
      if (!(projectData[key as keyof CreateProjectInput] as string).length)
        return true;
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
  console.log(projectData.components);
  return (
    <>
      {loading && <FullScreenLoading />}
      <Paper sx={{ padding: 5 }}>
        <Box display="flex" mb={4}>
          <Typography variant="h6" textAlign="left" flexGrow={1}>
            Configure Project Detail
          </Typography>

          <UploadDesign setProjectData={setProjectData} />
          <Button
            style={{ marginLeft: 16 }}
            onClick={openComponentModal}
            variant="outlined"
          >
            Add component
          </Button>
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
                onChange={(v) => {
                  if (!v) return;
                  setProjectData({
                    ...projectData,
                    deliveryDate: v,
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

      <Container>
        <Stack spacing={2} textAlign="left">
          {projectData.components.map((comp, i) => {
            return (
              <ListItem key={i}>
                <Typography>Name: {comp.name}</Typography>
                <Typography>
                  Product: {comp.componentSpec.productName}
                </Typography>
                <Typography>{comp.componentSpec.postProcess}</Typography>
              </ListItem>
            );
          })}
        </Stack>
      </Container>

      <Button
        variant="contained"
        disabled={shouldDisableCreateProjectButton()}
        onClick={createProject}
      >
        CREATE
      </Button>
    </>
  );
};

export default CreateProject;
