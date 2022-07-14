import { useLocation, useNavigate } from "react-router-dom";
import "./SearchResults.scss";
/**
 * 
 * name
      materials
      id
      companyId
      deliveryDate
      deliveryCountry
      deliveryCity
      budget
      createdAt
 */
const SearchResults = () => {
  const {state} = useLocation();
  const navigate = useNavigate();

  const handleProjectOnClick = (projectId) => {
    navigate("/project-detail", {state: {projectId}})
  };

  return (<div className="search-results-container">
    RESULTS:
    {
      state && state.searchCustomerProjects.map((result) => {
        const date = new Date(Date(result.createdAt)).toISOString().slice(0, 10);
        return <div className="project-overview-container" onClick={() => handleProjectOnClick(result.id)}>
          <div>Project Name: {result.name}</div>
          <div>Materials: {result.materials.join(" ")}</div>
          <div>Company: {result.companyId}</div>
          <div>Delivery date: {result.deliveryDate}</div>
          <div>Delivery city: {result.deliveryCity}</div>
          <div>Budget: {result.budget}</div>
          <div>Posted on: {date}</div>
        </div>
      })
    }
  </div>)
};

export default SearchResults;