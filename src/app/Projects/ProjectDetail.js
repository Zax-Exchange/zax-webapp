import { gql, useQuery } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom"
import "./ProjectDetail.scss";
import { Dialog, 
  Container, 
  Typography, 
  Button,
  Card,
  CardActionArea, 
  CardContent,
  Paper 
} from "@mui/material";
import ProjectBid from "./ProjectBid";
import { useState } from "react";

export const GET_PROJECT_DETAIL = gql`
  query getProjectDetail($projectId: Int) {
    getProjectDetail(projectId: $projectId) {
      id
      userId
      companyId
      name
      deliveryDate
      deliveryCountry
      budget
      deliveryCity
      design
      status
      components {
        id
        projectId
        name
        materials
        dimension
        postProcess
      }
      createdAt
    }
  }
`;

export const useProjectDetail = (projectId) => {
  return useQuery(GET_PROJECT_DETAIL, {
    variables: {
      projectId
    }
  });
}

const ProjectDetail = () => {
  const {state} = useLocation();
  const {loading: projectLoading, error: projectError, data: projectData} = useProjectDetail(state.projectId);
  
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const afterOpenModal = () => {
    
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const bidProjectHandler = () => {
    setIsOpen(true);
    // navigate("/project-bid", {state: {projectId: state.projectId}});
  }
  const backHandler = () => {
    navigate(-1);
  }

  const renderProjectDetail = () => {
    const {
      name: projectName,
      deliveryDate,
      deliveryCountry,
      budget,
      deliveryCity,
      design,
      status
    } = projectData.getProjectDetail;

    return <Container>
      <Typography>Project Detail</Typography>
        <Paper variant="outlined" style={{padding: "12px", marginBottom:"8px"}}>
          <Container style={{width: "60%"}}>
            <Container className="project-info-container" style={{textAlign: "left"}}>
              <Typography>name: {projectName}</Typography>
              <Typography>deliveryDate: {deliveryDate}</Typography>
              <Typography>deliveryCountry: {deliveryCountry}</Typography>
              <Typography>budget: {budget}</Typography>
              <Typography>deliveryCity: {deliveryCity}</Typography>
              <Typography>design: {design}</Typography>
              <Typography>status: {status}</Typography>
            </Container>
          </Container>
        </Paper>
          
      
      
      <Typography>Components Detail</Typography>

      {
        projectData.getProjectDetail.components.map((comp, i) => {
          const {name,
            materials,
            dimension,
            postProcess} = comp;
          return (
            <Paper style={{padding: "12px", marginBottom:"8px"}}>
              <Container style={{width: "60%"}}>
                <Container className="component-detail-container" key={i} style={{textAlign: "left"}}>
                  <Typography>name: {name}</Typography>
                  <Typography>materials: {materials.join(",")}</Typography>
                  <Typography>dimension: {dimension}</Typography>
                  <Typography>post process: {postProcess}</Typography>
                </Container>

              </Container>
            </Paper>
          )
        })
      }
      </Container>
  }

  if (projectData) {
    
      // TODO: use isVendor
    if (true) {
      return (<Container className="project-detail-container">
        {renderProjectDetail()}

        <Button onClick={bidProjectHandler}>Bid Project</Button>
        <Button onClick={backHandler}>Back</Button>

        <Dialog
          open={modalIsOpen}
          onClose={closeModal}
        >
          <ProjectBid projectId={state.projectId} setIsOpen={setIsOpen}/>
        </Dialog>
      </Container>)
    }

  }
  return null;
};

export default ProjectDetail;