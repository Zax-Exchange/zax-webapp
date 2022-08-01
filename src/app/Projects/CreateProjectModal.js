import { gql, useMutation } from "@apollo/client";
import { 
  Button,
  DialogActions,
  Container,
  List,
  ListItem,
  TextField,
  Grid,
  Typography,
  Box,
  Input,
  Autocomplete,
  Stack,
  Chip,
  IconButton,
  CircularProgress
 } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { countries } from "../constants/countries";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import AddIcon from '@mui/icons-material/Add';
import { useCreateProject, useGetCustomerProjects } from "./projectHooks";
import { useLocation, useNavigate } from "react-router-dom";
import FullScreenLoading from "../Utils/Loading";

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

const CreateProjectMoal = ({ 
  setIsCreateProjectOpen, 
  setSnackbar,
  setSnackbarOpen
}) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    createProjectMutation,
    createProjectLoading,
    createProjectError,
    createProjectData
  } = useCreateProject();
  const { getCustomerProjectsRefetch } = useGetCustomerProjects(user.id, true);
  const [projectData, setProjectData] = useState({
    userId: user.id,
    name: "",
    deliveryCountry: "",
    deliveryCity: "",
    budget: "",
    // design: null,
    comments: ""
  })
  

  const [deliveryDate, setDeliveryDate] = useState(new Date().toISOString().split('T')[0]);
  const [material, setMaterial] = useState("");
  const [materialInputBorderColor, setMaterialInputBorderColor] = useState("lightgray")
  const [components, setComponents] = useState([]);

  const [componentData, setComponentData] = useState({
    name: "",
    materials: [],
    dimension: "",
    postProcess: ""
  });

  const materialOnChange = (e) => {
    setMaterial(e.target.value);
  }

  const handleMaterialKeyDown = (e) => {
    if (e.keyCode === 13) {
      const materials = [...componentData.materials];
      materials.push(material);
      setComponentData({
        ...componentData,
        materials
      });
      setMaterial("");
    } 
  };

  const addMaterial = () => {
    const materials = [...componentData.materials];
    materials.push(material);
    setComponentData({
      ...componentData,
      materials
    });
    setMaterial("");
  }

  const handleMaterialsDelete = (i) => {
    const arr = [...componentData.materials];
    arr.splice(i, 1);
    setComponentData({
      ...componentData,
      materials: arr
    });
  }
  
  const materialOnFocus = (e) => {
    setMaterialInputBorderColor("rgba(0, 0, 0, 0.87)");
  }
  const materialonBlur = (e) => {
    setMaterialInputBorderColor("lightgray");
  }
  const projectInputHandler = (e) => {
    if (e.target.type !== "tel" || e.target.validity.valid) {
      setProjectData({
        ...projectData,
        [e.target.name]: e.target.value
      })
    }
  }

  const componentInputHandler = (e) => {
    const data = componentData;

    setComponentData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const addComponent = () => {
    const comp = {
      ...componentData,
      materials: componentData.materials
    };
    setMaterial([]);
    setComponents([...components, comp]);
    setComponentData({
      name: "",
      materials: [],
      dimension: "",
      postProcess: ""
    });
  }

  const checkComponentInput = () => {
    // check if component add button should be disabled
    for (let key in componentData) {
      if (componentData[key].length === 0) return true;
    }
    return false;
  }

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
            components
          }
        }
      })
      setIsCreateProjectOpen(false);
      setSnackbar({
        severity: "success",
        message: "Project created."
      });
      
      if (location.pathname.indexOf("/projects")) {
        navigate("/projects")
      } else {
        await getCustomerProjectsRefetch();
      }
    } catch (e) {

      setSnackbar({
        severity: "error",
        message: "Something went wrong. Please try again later."
      })
    } finally {
      setSnackbarOpen(true)
    }
  }

  const countryOnChange = (v) => {
    setProjectData({
      ...projectData,
      deliveryCountry: v.label
    })
  };

  const renderCountryDropdown = () => {
    return (
      <Autocomplete
        id="country-select"
        blurOnSelect
        sx={{ width: 300 }}
        options={countries}
        autoHighlight
        getOptionLabel={(option) => option.label}
        onChange={(e,v) => countryOnChange(v)}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt=""
            />
            {option.label} ({option.code})
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Delivery Country"
            name="country"
            value={projectData.deliveryCountry}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      />
    );
  }

  return <>
    {createProjectLoading && <FullScreenLoading />}
        <Container>
          <Container>
            <Typography variant="h6">Create Project</Typography>
          </Container>
          <Stack spacing={2} textAlign="left">
            <TextField autoComplete="new-password" label="Project Name" onChange={projectInputHandler} name="name" value={projectData.name}/>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker 
                label="Delivery Date"
                inputFormat="YYYY-MM-DD"
                value={deliveryDate}
                onChange={setDeliveryDate}
                renderInput={(params) => <TextField {...params} name="deliveryDate"/>}
              />
            </LocalizationProvider>
            {renderCountryDropdown()}
            <TextField autoComplete="new-password" label="Delivery City" onChange={projectInputHandler} name="deliveryCity" value={projectData.deliveryCity}/>
            <TextField autoComplete="new-password" type="tel" inputProps={{pattern: "[0-9]*"}} label="Budget" onChange={projectInputHandler} name="budget" value={projectData.budget}/>
            <TextField autoComplete="new-password" multiline label="Comments" onChange={projectInputHandler} name="comments" value={projectData.comments}/>
          </Stack>
        </Container>



        <Container>
          <Container>
            <Typography variant="h6">Create Project Components</Typography>
          </Container>
          <Stack spacing={2} textAlign="left">
            <TextField autoComplete="new-password" label="Name" onChange={componentInputHandler} name="name" value={componentData.name}/>
            <ListItem disableGutters>
              <div className="form-control-materials" style={{borderColor: materialInputBorderColor}}>
                <div className="container">
                  {componentData.materials.map((item,index) => (
                    <Chip size="small" onDelete={()=>handleMaterialsDelete(index)} label={item} />
                  ))}
                </div>
                <Input
                  value={material}
                  onChange={materialOnChange}
                  onKeyDown={handleMaterialKeyDown}
                  placeholder="Materials"
                  inputProps={{
                    onFocus: materialOnFocus,
                    onBlur: materialonBlur
                  }}
                  disableUnderline
                />
              </div>
              <IconButton onClick={addMaterial} disabled={material.length === 0}>
                <AddIcon />
              </IconButton>
            </ListItem>
            <TextField autoComplete="new-password" label="Dimension" onChange={componentInputHandler} name="dimension" value={componentData.dimension}/>
            <TextField autoComplete="new-password" label="Post Process" onChange={componentInputHandler} name="postProcess" value={componentData.postProcess}/>
            <Button onClick={addComponent} disabled={checkComponentInput()}>ADD</Button>
          </Stack>
        </Container>

        <Container>
          <Stack spacing={2} textAlign="left">
            {
              components.map((comp, i) => {
                return <ListItem key={i}>
                  <Typography>Name: {comp.name}</Typography>
                  <Typography>Materials: {comp.materials.join(",")}</Typography>
                  <Typography>Dimension: {comp.dimension}</Typography>
                  <Typography>Post Process: {comp.postProcess}</Typography>
                </ListItem>
              })
            }
          </Stack>
        </Container>
      
  <DialogActions>
    <Button variant="contained" disabled={checkProjectInput()} onClick={createProject}>CREATE</Button>
  </DialogActions>
  </>
};

export default CreateProjectMoal;