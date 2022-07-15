import { useLocation, useNavigate } from "react-router-dom";
import "./SearchResults.scss";
import SearchProjectOverview from "./SearchProjectOverview";
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

  return (<div className="search-results-container">
    RESULTS:
    {
      state && state.searchCustomerProjects.map((result) => {
        return <SearchProjectOverview projectData={result}/>
      })
    }
  </div>)
};

export default SearchResults;