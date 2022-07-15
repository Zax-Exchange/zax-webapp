import { useNavigate } from "react-router-dom";

const SearchProjectOverview = ({projectData}) => {
  const navigate = useNavigate();

  const handleProjectOnClick = (projectId) => {
    navigate("/project-detail", {state: {projectId}})
  };

  const date = new Date(Date(projectData.createdAt)).toISOString().slice(0, 10);
  return <div className="project-overview-container" onClick={() => handleProjectOnClick(projectData.id)}>
    <div>Project Name: {projectData.name}</div>
    {projectData.materials && <div>Materials: {projectData.materials.join(",")}</div>}
    <div>Company: {projectData.companyId}</div>
    <div>Delivery date: {projectData.deliveryDate}</div>
    <div>Delivery city: {projectData.deliveryCity}</div>
    <div>Budget: {projectData.budget}</div>
    <div>Posted on: {date}</div>
  </div>
}

export default SearchProjectOverview;