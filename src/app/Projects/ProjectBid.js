import { gql, useMutation, useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom"
import ProjectBidComponent from "./ProjectBidComponent";
import { GET_PROJECT_DETAIL } from "./ProjectDetail"; 
import "./ProjectBid.scss";
import { useState } from "react";
import { useVendorProjects } from "./Projects";

const CREATE_PROJECT_BID = gql`
mutation CreateProjectBid($data: CreateProjectBidInput) {
  createProjectBid(data: $data)
}
`;
const ProjectBid = ({projectId, setIsOpen}) => {

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
          userId: parseInt(sessionStorage.getItem("userId"), 10),
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
    <div className="project-bid-container">
      <div className="project-info-container">
        <div className="title">Project Detail</div>
        <div className="field-container">name: {projectName}</div>
        <div className="field-container">deliveryDate: {deliveryDate}</div>
        <div className="field-container">deliveryCountry: {deliveryCountry}</div>
        <div className="field-container">budget: {budget}</div>
        <div className="field-container">deliveryCity: {deliveryCity}</div>
        <div className="field-container">design: {design}</div>
        <div className="field-container">status: {status}</div>
      </div>
      
      <div className="bid-components-detail-container">
        <div className="title">Components Detail</div>

        {
          components.map(comp => {
            return <ProjectBidComponent component={comp} setComponentQpData={setComponentQpData} componentsQpData={componentsQpData}/>
          })
        }
      </div>

      <button onClick={submitBid}>Submit</button>
      <button onClick={() => setIsOpen(false)}>Cancel</button>
    </div>)

  }
}

export default ProjectBid;