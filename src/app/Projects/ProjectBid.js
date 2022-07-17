import { gql, useMutation, useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom"
import ProjectBidComponent from "./ProjectBidComponent";
import { GET_PROJECT_DETAIL } from "./SearchProjectDetail"; 
import "./ProjectBid.scss";
import { useState } from "react";
import { useVendorProjects } from "./Projects";
import { Container, Button, Typography } from "@mui/material";
import { useUserData } from "./CustomerProjectDetail";

const CREATE_PROJECT_BID = gql`
mutation CreateProjectBid($data: CreateProjectBidInput) {
  createProjectBid(data: $data)
}
`;
const ProjectBid = ({projectId, setIsOpen}) => {
  const {loading:userLoading, error:userError, data: userData} = useUserData(parseInt(sessionStorage.getItem("userId"), 10))
  const {loading:projectLoading, error:projectError, data: projectData} = useQuery(GET_PROJECT_DETAIL, {
    variables: {
      projectId
    }
  });

  const [comments, setComments] = useState("");
  const [createProjectBid] = useMutation(CREATE_PROJECT_BID);
  const [componentsQpData, setComponentQpData] = useState({});
  const [isSuccessful, setIsSuccessful] = useState(null);
  const { refetch } = useVendorProjects(parseInt(sessionStorage.getItem("userId"), 10))
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
      <Container className="project-info-container">
        <Typography>Project Detail</Typography>
        <Typography>name: {projectName}</Typography>
        <Typography>deliveryDate: {deliveryDate}</Typography>
        <Typography>deliveryCountry: {deliveryCountry}</Typography>
        <Typography>budget: {budget}</Typography>
        <Typography>deliveryCity: {deliveryCity}</Typography>
        <Typography>design: {design}</Typography>
        <Typography>status: {status}</Typography>
      </Container>
      
      <Container className="bid-components-detail-container">
        <Typography>Components Detail</Typography>

        {
          components.map(comp => {
            return <ProjectBidComponent component={comp} setComponentQpData={setComponentQpData} componentsQpData={componentsQpData}/>
          })
        }
      </Container>
      
      <Container>
        <Button onClick={submitBid}>Submit</Button>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
      </Container>
    </Container>)

  }
}

export default ProjectBid;