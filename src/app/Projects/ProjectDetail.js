import { gql, useQuery } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom"
import "./ProjectDetail.scss";
import Modal from 'react-modal';
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

    return <div>
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
      </div>
  }

  if (projectData) {
    
      // TODO: use isVendor
    if (true) {
      return (<div className="project-detail-container">
        {renderProjectDetail()}

        <button onClick={bidProjectHandler}>Bid Project</button>
        <button onClick={backHandler}>Back</button>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          // style={customStyles}
          contentLabel="Project Bid"
          ariaHideApp={false}
        >
          <ProjectBid projectId={state.projectId} setIsOpen={setIsOpen}/>
        </Modal>
      </div>)
    }

  }
  return null;
};

export default ProjectDetail;