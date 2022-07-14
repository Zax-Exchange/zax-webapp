import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom"
import { GET_PROJECT_DETAIL } from "./ProjectDetail"; 

const ProjectBid = () => {
  const {state} = useLocation();
  const {loading:projectLoading, error:projectError, data: projectData} = useQuery(GET_PROJECT_DETAIL, {
    variables: {
      projectId: state.projectId
    }
  });

  if (projectData) {
    return (<div className="project-bid-container">

    </div>)

  }
}

export default ProjectBid;