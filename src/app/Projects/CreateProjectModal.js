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
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import AddIcon from "@mui/icons-material/Add";
import {
  useCreateProject,
  useGetCustomerProjects,
} from "../hooks/projectHooks";
import { useLocation, useNavigate } from "react-router-dom";
import FullScreenLoading from "../Utils/Loading";
import contriesJson from "all-countries-and-cities-json";
import { isValidAlphanumeric, isValidInt } from "../Utils/inputValidators";
/**
 * name
 * deliveryDate
 * deliveryCountry
 * deliveryCity
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

const COUNTRIES_LIST = Object.keys(contriesJson);
const CreateProjectMoal = ({
  setIsCreateProjectOpen,
  setSnackbar,
  setSnackbarOpen,
}) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    createProjectMutation,
    createProjectLoading,
    createProjectError,
    createProjectData,
  } = useCreateProject();
  const { getCustomerProjectsRefetch } = useGetCustomerProjects(user.id, true);
  const [projectData, setProjectData] = useState({
    userId: user.id,
    name: "",
    deliveryCountry: "",
    deliveryCity: "",
    budget: "",
    // design: null,
    comments: "",
  });

  const [deliveryDate, setDeliveryDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [material, setMaterial] = useState("");

  const [components, setComponents] = useState([]);

  const [componentData, setComponentData] = useState({
    name: "",
    materials: [],
    dimension: "",
    postProcess: "",
  });

  const materialOnChange = (e) => {
    const val = e.target.value;

    if (isValidAlphanumeric(val)) {
      setMaterial(val);
    }
  };

  const addMaterial = (value) => {
    const materials = [...value].map((v) => v.trim());
    setComponentData({
      ...componentData,
      materials,
    });
    setMaterial("");
  };

  const projectInputHandler = (e) => {
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

  const componentInputHandler = (e) => {
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
  };

  const checkComponentInput = () => {
    // check if component add button should be disabled
    for (let key in componentData) {
      if (componentData[key].length === 0) return true;
    }
    return false;
  };

  const checkProjectInput = () => {
    // check if create project button should be disabled

    for (let key in projectData) {
      if (key === "comments") continue;
      if (projectData[key].length === 0) return true;
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
            design: null,
            components,
          },
        },
      });
      setIsCreateProjectOpen(false);
      setSnackbar({
        severity: "success",
        message: "Project created.",
      });

      if (location.pathname.indexOf("/projects")) {
        navigate("/projects");
      } else {
        await getCustomerProjectsRefetch();
      }
    } catch (e) {
      setSnackbar({
        severity: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setSnackbarOpen(true);
    }
  };

  const countryOnChange = (v) => {
    setProjectData({
      ...projectData,
      deliveryCountry: v,
      deliveryCity: "",
    });
  };

  const cityOnChange = (v) => {
    setProjectData({
      ...projectData,
      deliveryCity: v,
    });
  };

  const renderCountryDropdown = () => {
    return (
      <Autocomplete
        id="country-select"
        blurOnSelect
        sx={{ width: 300 }}
        options={COUNTRIES_LIST}
        autoHighlight
        getOptionLabel={(option) => option}
        onChange={(e, v) => countryOnChange(v)}
        value={COUNTRIES_LIST.find((c) => c === projectData.deliveryCountry)}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            {option}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            required
            {...params}
            label="Delivery Country/Region"
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
          />
        )}
      />
    );
  };

  const renderCityDropdown = () => {
    return (
      <Autocomplete
        id="city-select"
        blurOnSelect
        sx={{ width: 300 }}
        options={contriesJson[projectData.deliveryCountry] || []}
        autoHighlight
        getOptionLabel={(option) => option}
        onChange={(e, v) => cityOnChange(v)}
        value={projectData.deliveryCity || null}
        renderOption={(props, option) => (
          <Box component="li" {...props} key={undefined}>
            {option}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            required
            {...params}
            label="Delivery City"
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
          />
        )}
      />
    );
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
        onInputChange={materialOnChange}
        onChange={(e, v) => addMaterial(v)}
        value={componentData.materials}
        multiple
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="Component materials"
            value={material}
            onChange={materialOnChange}
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

  return (
    <>
      {createProjectLoading && <FullScreenLoading />}
      <Container>
        <Container>
          <Typography variant="h6">Create Project</Typography>
        </Container>
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
              label="Delivery Date"
              inputFormat="YYYY-MM-DD"
              value={deliveryDate}
              onChange={setDeliveryDate}
              renderInput={(params) => (
                <TextField {...params} name="deliveryDate" />
              )}
            />
          </LocalizationProvider>
          {renderCountryDropdown()}
          {renderCityDropdown()}
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

      <Container>
        <Container>
          <Typography variant="h6">Create Project Components</Typography>
        </Container>
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
          <Button onClick={addComponent} disabled={checkComponentInput()}>
            ADD
          </Button>
        </Stack>
      </Container>

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

      <DialogActions>
        <Button
          variant="contained"
          disabled={checkProjectInput()}
          onClick={createProject}
        >
          CREATE
        </Button>
      </DialogActions>
    </>
  );
};

export default CreateProjectMoal;
