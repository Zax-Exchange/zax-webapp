import { NavigateOptions, useLocation, useNavigate } from "react-router-dom";
import SearchProjectOverview from "./SearchProjectOverview";
import { Typography, Stack, Grid, Container } from "@mui/material";
import React from "react";
import { ProjectOverview, VendorOverview } from "../../../generated/graphql";

const VendorSearchResults = () => {
  const { state }: any = useLocation();

  return (
    <Grid container className="search-results-container">
      <Grid item xs={2} className="search-results-sortby-container">
        <Typography>Sort by</Typography>
      </Grid>

      <Grid item xs={10} className="search-results-inner-container">
        <Stack direction="column">
          {state &&
            state.searchResults.map((result: ProjectOverview, i: number) => {
              return <SearchProjectOverview projectData={result} key={i} />;
            })}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default VendorSearchResults;
