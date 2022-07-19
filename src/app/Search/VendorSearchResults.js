import { useLocation, useNavigate } from "react-router-dom";
import "./SearchResults.scss";
import SearchProjectOverview from "./SearchProjectOverview";
import { Typography, Stack, Grid, Container} from "@mui/material";
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
const VendorSearchResults = () => {
  const {state} = useLocation();

  return (<Grid container className="search-results-container">
    <Grid item xs={2} className="search-results-sortby-container">
      <Typography>Sort by</Typography>

    </Grid>

    <Grid item xs={10} className="search-results-inner-container">
      <Stack direction="column">
        {
          state && state.searchResults.map((result, i) => {
            return <SearchProjectOverview projectData={result} key={i}/>
          })
        }
      </Stack>

    </Grid>
  </Grid>)
};

export default VendorSearchResults;