import { gql } from "@apollo/client";
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
 } from "@mui/material";
import { useState } from "react";
import { countries } from "../constants/countries";
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
const CREATE_PROJECT = gql`
  mutation createProject($data: CreateProjectInput) {
    createProject(data: $data)
  }
`;
const CreateProjectMoal = () => {

  const [projectData, setProjectData] = useState({
    userId: parseInt(sessionStorage.getItem("userId"), 10),
    name: "",
    deliveryDate: "",
    deliveryCountry: "",
    deliveryCity: "",
    budget: "",
    // design: null,
    comments: ""
  })
  const [components, setComponents] = useState([]);

  const [componentData, setComponentData] = useState({
    name: "",
    materials: "",
    dimension: "",
    postProcess: ""
  });

  const projectInputHandler = (e) => {
    const data = projectData;

    setProjectData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const componentInputHandler = (e) => {
    const data = componentData;

    setComponentData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const addComponent = () => {
    const comp = {...componentData};
    setComponents([...components, comp]);
    setComponentData({
      name: "",
      materials: "",
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
    console.log(projectData)
    for (let key in projectData) {
      if (projectData[key].length === 0) return true;
    }
    return !checkComponentInput();
  };

  const createProject = (e) => {
    e.preventDefault();
    console.log(e)
  }
  
  const renderCountrySelect = () => {
    return (
      <Autocomplete
        id="country-select"
        sx={{width: 300}}
        options={countries}
        autoHighlight
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt=""
            />
            {option.label} ({option.code}) +{option.phone}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            name="deliveryCountry"
            {...params}
            label="Delivery country"
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
  <Grid container direction="row" spacing={2}>
      <Grid item xs={6}>
        <Container>
          <Typography variant="h6">Create Projects</Typography>
        </Container>
        <Container>
          <List>
            <ListItem>
              <TextField autoComplete="new-password" variant="standard" label="Project Name" onChange={projectInputHandler} name="name" value={projectData.name}/>
            </ListItem>
            <ListItem>
              <TextField autoComplete="new-password" variant="standard" label="Delivery Date" onChange={projectInputHandler} name="deliveryDate" value={projectData.deliveryDate}/>
            </ListItem>
            <ListItem>
              {/* {renderCountrySelect()} */}
              <TextField autoComplete="new-password" variant="standard" label="Delivery Country" onChange={projectInputHandler} name="deliveryCountry" value={projectData.deliveryCountry}/>
            </ListItem>
            <ListItem>
              <TextField autoComplete="new-password" variant="standard" label="Delivery City" onChange={projectInputHandler} name="deliveryCity" value={projectData.deliveryCity}/>
            </ListItem>
            <ListItem>
              <TextField autoComplete="new-password" variant="standard" label="Budget" onChange={projectInputHandler} name="budget" value={projectData.budget}/>
            </ListItem>
            <ListItem>
              <TextField autoComplete="new-password" multiline variant="standard" label="Comments" onChange={projectInputHandler} name="comments" value={projectData.comments}/>
            </ListItem>
          </List>
        </Container>
      </Grid>

      <Grid item xs={6}>
        <Container>
          <Typography variant="h6">Create Project Components</Typography>
        </Container>
        <Container>
          <TextField autoComplete="new-password" variant="standard" label="Name" onChange={componentInputHandler} name="name" value={componentData.name}/>
          <TextField autoComplete="new-password" variant="standard" label="Materials" onChange={componentInputHandler} name="materials" value={componentData.materials}/>
          <TextField autoComplete="new-password" variant="standard" label="Dimension" onChange={componentInputHandler} name="dimension" value={componentData.dimension}/>
          <TextField autoComplete="new-password" variant="standard" label="Post Process" onChange={componentInputHandler} name="postProcess" value={componentData.postProcess}/>
          <Button onClick={addComponent} disabled={checkComponentInput()}>ADD</Button>
        </Container>

        <Container>
          <List>
            {
              components.map((comp) => {
                return <ListItem>
                  <Typography>Name: {comp.name}</Typography>
                  <Typography>Materials: {comp.materials}</Typography>
                  <Typography>Dimension: {comp.dimension}</Typography>
                  <Typography>Post Process: {comp.postProcess}</Typography>
                </ListItem>
              })
            }
          </List>
        </Container>
      </Grid>
      
  </Grid>
  <DialogActions>
    <Button variant="contained" disabled={checkProjectInput()}>CREATE</Button>
  </DialogActions>
  </>
};

export default CreateProjectMoal;