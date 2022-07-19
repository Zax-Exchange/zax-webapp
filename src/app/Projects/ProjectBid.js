import { gql, useMutation, useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom"
import ProjectBidComponent from "./ProjectBidComponent";
import { GET_PROJECT_DETAIL } from "../Search/SearchProjectDetail"; 
import "./ProjectBid.scss";
import { useContext, useState } from "react";
import { useVendorProjects } from "./Projects";
import { Container, Button, Typography, List, ListItem, Grid } from "@mui/material";
import { useUserData } from "./CustomerProjectDetail";
import { AuthContext } from "../../context/AuthContext";

const CREATE_PROJECT_BID = gql`
mutation CreateProjectBid($data: CreateProjectBidInput) {
  createProjectBid(data: $data)
}
`;
const ProjectBid = ({projectId, setIsOpen}) => {
  const { user } = useContext(AuthContext);
  const {loading:userLoading, error:userError, data: userData} = useUserData(user.id);
  const {loading:projectLoading, error:projectError, data: projectData} = useQuery(GET_PROJECT_DETAIL, {
    variables: {
      projectId
    }
  });

  const [comments, setComments] = useState("");
  const [createProjectBid] = useMutation(CREATE_PROJECT_BID);
  const [componentsQpData, setComponentQpData] = useState({});
  const [isSuccessful, setIsSuccessful] = useState(null);
  const { refetch } = useVendorProjects(user.id);
  if (userLoading || projectLoading) return null;
  if (userError || projectError) return null;

  const submitBid = () => {
    const components = [];
    for (let id in componentsQpData) {
      components.push({
        projectComponentId: parseInt(id, 10),
        quantityPrices: componentsQpData[id]
      })
    }
    createProjectBid({
      variables: {
        data: {
          userId: userData.getUserWithUserId.id,
          projectId,
          comments,
          components
        }
      }
    })
    .then(() => {
      setIsSuccessful(true);
      refetch()
    })
    .catch(() => {
      setIsSuccessful(false);
    })
  }

  if (projectData) {
    if (isSuccessful) {
      return <div className="project-bid-container">
        Submission successful!
        <button onClick={() => setIsOpen(false)}>OK</button>
      </div>
    }
    if (isSuccessful === false) {
      // bid submission failed
      return <div className="project-bid-container">
        Submission failed!
        <button onClick={() => setIsOpen(false)}>Ok</button>
      </div>
    }
    const {
      name: projectName,
      deliveryDate,
      deliveryCountry,
      budget,
      deliveryCity,
      design,
      status,
      components
    } = projectData.getProjectDetail;

    return (
    <Container className="project-bid-container">
      <Grid container>
        <Grid item xs={6}>
          <Typography>Project Detail</Typography>
          <List>
            <ListItem><Typography>name: {projectName}</Typography></ListItem>
            <ListItem><Typography>deliveryDate: {deliveryDate}</Typography></ListItem>
            <ListItem><Typography>deliveryCountry: {deliveryCountry}</Typography></ListItem>
            <ListItem><Typography>budget: {budget}</Typography></ListItem>
            <ListItem><Typography>deliveryCity: {deliveryCity}</Typography></ListItem>
            <ListItem><Typography>design: {design}</Typography></ListItem>
            <ListItem><Typography>status: {status}</Typography></ListItem>

          </List>
        </Grid>
        
        <Grid item xs={6}>
          <Typography>Components Detail</Typography>

          {
            components.map(comp => {
              return <ProjectBidComponent component={comp} setComponentQpData={setComponentQpData} componentsQpData={componentsQpData}/>
            })
          }
        </Grid>
        
        <Container>
          <Button onClick={submitBid}>Submit</Button>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        </Container>
      </Grid>
    </Container>)

  }
}

export default ProjectBid;