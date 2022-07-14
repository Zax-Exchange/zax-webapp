import { gql, useQuery } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom"
import "./ProjectDetail.scss";

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

// const GET_COMPANY_DETAIL = gql`

// `;

const ProjectDetail = () => {
  const {state} = useLocation();
  const {loading: projectLoading, error: projectError, data: projectData} = useQuery(GET_PROJECT_DETAIL, {
    variables: {
      projectId: state.projectId
    }
  });
  const navigate = useNavigate();
  const bidProjectHandler = () => {
    navigate("/project-bid", {state: {projectId: state.projectId}});
  }
  const backHandler = () => {
    navigate(-1);
  }
  if (projectData) {
    const {name: projectName,
      deliveryDate,
      deliveryCountry,
      budget,
      deliveryCity,
      design,
      status} = projectData.getProjectDetail;
    
    return (<div className="project-detail-container">

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
      
      <div className="components-detail-container">
      <div className="title">Components Detail</div>

      {
        projectData.getProjectDetail.components.map(comp => {
           const {name,
            materials,
            dimension,
            postProcess} = comp;
          return (
            <div className="component-detail-container">
              <div className="field-container">name: {name}</div>
              <div className="field-container">materials: {materials.join(",")}</div>
              <div className="field-container">dimension: {dimension}</div>
              <div className="field-container">post process: {postProcess}</div>
            </div>
          )
        })
      }
      </div>

      <button onClick={bidProjectHandler}>Bid Project</button>
      <button onClick={backHandler}>Back</button>
    </div>)

  }
  return null;
};

export default ProjectDetail;