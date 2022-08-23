import { gql, useMutation } from "@apollo/client";
import {
  Button,
  DialogActions,
  Container,
  ListItem,
  TextField,
  Typography,
  Box,
  Autocomplete,
  Stack,
  CircularProgress,
  Dialog,
  DialogContent,
  AlertColor,
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
import CustomSnackbar from "../../Utils/CustomSnackbar";
import React from "react";
import {
  useCreateProjectMutation,
  useGetCustomerProjectsLazyQuery,
} from "../../../generated/graphql";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
/**
 * name
 * deliveryDate
 * deliveryAddress
 * budget
 * design
 * userId
 * comments
 * components {
 *   name
 *   materials
 *   dimension
 *   postProcess
 * }
 */

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
  materials: string[];
  dimension: string;
  postProcess: string;
};
const CreateProject = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { CustomSnackbar, setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [createProjectMutation, { data, loading, error }] =
    useCreateProjectMutation();

  const [getCustomerProjects] = useGetCustomerProjectsLazyQuery();

  const [projectData, setProjectData] = useState({
    userId: user!.id,
    name: "",
    deliveryAddress: "",
    budget: "",
    designId: "",
    comments: "",
  } as ProjectData);

  const [deliveryDate, setDeliveryDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [material, setMaterial] = useState("");

  const [componentModalOpen, setComponentModalOpen] = useState(false);

  const [components, setComponents] = useState([] as ProjectComponentData[]);

  const [componentData, setComponentData] = useState({
    name: "",
    materials: [],
    dimension: "",
    postProcess: "",
  } as ProjectComponentData);

  const openComponentModal = () => {
    setComponentModalOpen(true);
  };
  const materialOnChange = (val: string) => {
    // const val = e.target.value || "";

    if (isValidAlphanumeric(val)) {
      setMaterial(val);
    }
  };

  const addMaterial = (value: string[]) => {
    const materials = [...value].map((v) => v.trim());
    setComponentData({
      ...componentData,
      materials,
    });
    setMaterial("");
  };

  const projectInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let isAllowed = true;

    switch (e.target.name) {
      case "name":
      case "comments":
        isAllowed = isValidAlphanumeric(val);
        break;
      case "budget":
        isAllowed = isValidInt(val);
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

  const componentInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let isAllowed = true;

    switch (e.target.name) {
      case "name":
      case "dimension":
      case "postProcess":
        isAllowed = isValidAlphanumeric(val);
        break;
      default:
        break;
    }
    if (isAllowed || val === "") {
      setComponentData({
        ...componentData,
        [e.target.name]: val,
      });
    }
  };

  const addComponent = () => {
    const comp = {
      ...componentData,
      materials: componentData.materials,
    };
    setMaterial("");
    setComponents([...components, comp]);
    setComponentData({
      name: "",
      materials: [],
      dimension: "",
      postProcess: "",
    });
    setComponentModalOpen(false);
  };

  const checkComponentInput = () => {
    // check if component add button should be disabled
    for (let key in componentData) {
      if (componentData[key as keyof ProjectComponentData].length === 0)
        return true;
    }
    return false;
  };

  const checkProjectInput = () => {
    // check if create project button should be disabled

    for (let key in projectData) {
      if (key === "comments" || key === "designId") continue;

      if (projectData[key as keyof ProjectData].length === 0) return true;
    }

    return components.length === 0;
  };

  const createProject = async () => {
    try {
      await createProjectMutation({
        variables: {
          data: {
            ...projectData,
            deliveryDate,
            budget: parseInt(projectData.budget, 10),
            components,
          },
        },
      });
      setSnackbar({
        severity: "success",
        message: "Project created.",
      });
      setSnackbarOpen(true);
      if (location.pathname.indexOf("/customer-projects")) {
        navigate("/customer-projects");
      } else {
        await getCustomerProjects({
          variables: {
            userId: user!.id,
          },
        });
      }
    } catch (e) {
      setSnackbar({
        severity: "error",
        message: "Something went wrong. Please try again later.",
      });
      setSnackbarOpen(true);
    }
  };

  const renderMaterialsDropdown = () => {
    // TODO: bug when input chart and click x
    return (
      <Autocomplete
        id="materials-select"
        sx={{ width: 400 }}
        options={["Rigid Box", "Folding Carton", "Molded Fiber", "Corrugate"]}
        autoHighlight
        inputValue={material}
        onInputChange={(e, v) => {
          materialOnChange(v);
        }}
        onChange={(e, v) => addMaterial(v)}
        value={componentData.materials}
        multiple
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="Component materials"
            value={material}
            onChange={(e) => materialOnChange(e.target.value)}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password",
            }}
            InputLabelProps={{
              sx: {
                fontSize: 16,
                top: -7,
              },
            }}
          />
        )}
      />
    );
  };

  const handleAddressOnChange = (address: string) => {
    setProjectData({
      ...projectData,
      deliveryAddress: address,
    });
  };
  return (
    <>
      {loading && <FullScreenLoading />}
      <Container>
        <Box display="flex" mb={4}>
          <Typography variant="h6" textAlign="left" flexGrow={1}>
            Configure Project Detail
          </Typography>

          <UploadDesign
            setProjectData={setProjectData}
            // setSnackbar={setSnackbar}
            // setSnackbarOpen={setSnackbarOpen}
          />
          <Button
            style={{ marginLeft: 16 }}
            onClick={openComponentModal}
            variant="outlined"
          >
            Add component
          </Button>
        </Box>
        <Stack spacing={2} textAlign="left">
          <TextField
            autoComplete="new-password"
            label="Project Name"
            onChange={projectInputHandler}
            name="name"
            value={projectData.name}
          />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              disablePast
              label="Delivery Date"
              inputFormat="YYYY-MM-DD"
              value={deliveryDate}
              onChange={(v) => {
                if (!v) return;
                setDeliveryDate(v);
              }}
              renderInput={(params) => (
                <TextField {...params} name="deliveryDate" />
              )}
            />
          </LocalizationProvider>
          <GoogleMapAutocomplete parentSetDataHandler={handleAddressOnChange} />

          <TextField
            autoComplete="new-password"
            type="tel"
            label="Budget"
            onChange={projectInputHandler}
            name="budget"
            value={projectData.budget}
          />
          <TextField
            autoComplete="new-password"
            multiline
            label="Comments"
            onChange={projectInputHandler}
            name="comments"
            value={projectData.comments}
          />
        </Stack>
      </Container>

      <Dialog
        open={componentModalOpen}
        onClose={() => setComponentModalOpen(false)}
      >
        <DialogContent>
          <Container>
            <Box>
              <Typography variant="h6" textAlign="left">
                Add Project Component
              </Typography>
            </Box>
            <Stack spacing={2} textAlign="left">
              <TextField
                autoComplete="new-password"
                label="Name"
                onChange={componentInputHandler}
                name="name"
                value={componentData.name}
              />
              {renderMaterialsDropdown()}
              <TextField
                autoComplete="new-password"
                label="Dimension"
                onChange={componentInputHandler}
                name="dimension"
                value={componentData.dimension}
              />
              <TextField
                autoComplete="new-password"
                label="Post Process"
                onChange={componentInputHandler}
                name="postProcess"
                value={componentData.postProcess}
              />
            </Stack>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={addComponent} disabled={checkComponentInput()}>
            ADD
          </Button>
        </DialogActions>
      </Dialog>

      <Container>
        <Stack spacing={2} textAlign="left">
          {components.map((comp, i) => {
            return (
              <ListItem key={i}>
                <Typography>Name: {comp.name}</Typography>
                <Typography>Materials: {comp.materials.join(",")}</Typography>
                <Typography>Dimension: {comp.dimension}</Typography>
                <Typography>Post Process: {comp.postProcess}</Typography>
              </ListItem>
            );
          })}
        </Stack>
      </Container>

      <Button
        variant="contained"
        disabled={checkProjectInput()}
        onClick={createProject}
      >
        CREATE
      </Button>
    </>
  );
};

export default CreateProject;
