import { 
  Grid,
  Container,
  Dialog,
  DialogContent,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Paper,
  List,
  ListItem,
  Button,
  IconButton
 } from "@mui/material";
import { GET_USER } from "../Profile/Profile";
import { useQuery } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import VendorBidModal from "./VendorBidModal";
import { useEffect, useState } from "react";
import VendorBidOverview from "./VendorBidOverview";

export const useUserData = (userId) => {
  return useQuery(GET_USER, {
    variables: {
      userId
    }
  });
};


const CustomerProjectDetail = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  const projectData = state.project;

  const { bids } = projectData;
  
  const getComponentName = (componentId, components) => {
    return components.find(comp => comp.id === componentId).name;
  };

  const convertToDate = (timestamp) => {
    return new Date(Date(timestamp)).toISOString().slice(0, 10);
  }

  const backButtonHandler = () => {
    navigate(-1);
  };

  return <Container>
  <Container disableGutters style={{textAlign: "left"}}>
    <IconButton onClick={backButtonHandler}>
      <KeyboardBackspaceIcon style={{color: "rgb(43, 52, 89)"}}/>
    </IconButton>
  </Container>
  <Grid container spacing={2}>

    <Grid item xs={4}>
      <Container>
        <Typography variant="h6">Vendor Bids</Typography>
      </Container>
      {
        bids.map(bid => {
          return <VendorBidOverview bid={bid} projectComponents={projectData.components}/>
        })
      }
    </Grid>
    <Grid item xs={8}>
      <Container>
        <Typography variant="h6">Project Detail</Typography>
      </Container>
      <Paper>
        <List>
          <ListItem><Typography>Project Name: {projectData.name}</Typography></ListItem>
          <ListItem><Typography>Delivery Date: {projectData.deliveryDate}</Typography></ListItem>
          <ListItem><Typography>Delivery Country: {projectData.deliveryCountry}</Typography></ListItem>
          <ListItem><Typography>Delivery City: {projectData.deliveryCity}</Typography></ListItem>
          <ListItem><Typography>Design: {projectData.design}</Typography></ListItem>
          <ListItem><Typography>Budget: {projectData.budget}</Typography></ListItem>
          <ListItem><Typography>Status: {projectData.status}</Typography></ListItem>
          <ListItem><Typography>Posted on: {convertToDate(projectData.createdAt)}</Typography></ListItem>

        </List>
      </Paper>
      {
        projectData.components.map(comp => {
          return <Paper style={{marginTop: "8px"}}>
            <List>
              <ListItem>
                <Typography>Name: {comp.name}</Typography>
              </ListItem>
              <ListItem>
                <Typography>Materials: {comp.materials.join(",")}</Typography>
              </ListItem>
              <ListItem>
                <Typography>Dimension: {comp.dimension}</Typography>
              </ListItem>
            </List>
          </Paper>
        })
      }
      
    </Grid>
  </Grid>
  </Container>
}

export default CustomerProjectDetail;