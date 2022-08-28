import { NavigateOptions, useLocation, useNavigate } from "react-router-dom";
import SearchCompanyOverview from "./SearchCompanyOverview";
import { Typography, Stack, Grid, Container } from "@mui/material";
import React from "react";
import { VendorOverview } from "../../../generated/graphql";

const CustomerSearchResults = () => {
  const { state }: { state: NavigateOptions["state"] } = useLocation();

  return (
    <Grid container className="search-results-container">
      <Grid item xs={2} className="search-results-sortby-container">
        <Typography>Sort by</Typography>
      </Grid>

      <Grid item xs={10} className="search-results-inner-container">
        <Stack direction="column">
          {state &&
            state.searchResults.map((res: VendorOverview, i: number) => {
              return <SearchCompanyOverview key={i} companyData={res} />;
            })}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CustomerSearchResults;
