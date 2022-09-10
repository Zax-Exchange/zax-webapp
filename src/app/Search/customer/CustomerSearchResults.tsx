import {
  NavigateOptions,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  Typography,
  Stack,
  Grid,
  Container,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  useTheme,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  ProjectOverview,
  SearchCustomerProjectInput,
  VendorOverview,
} from "../../../generated/graphql";
import { useSearchVendorCompaniesLazyQuery } from "../../gql/get/vendor/vendor.generated";
import qs from "qs";
import { useSearchCustomerProjectsLazyQuery } from "../../gql/get/project/project.generated";
import FullScreenLoading from "../../Utils/Loading";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import SearchCompanyOverview from "./SearchCompanyOverview";

// Allowed search params, if user tempers the url we will not allow search request to fire
const allowedParams = {
  userInput: true,
  countries: true,
  factoryLocations: true,
  leadTime: true,
  moqMin: true,
  moqMax: true,
} as { [key: string]: boolean };

type CustomerFilters = {
  countries: Record<string, boolean>;
  factoryLocations: Record<string, boolean>;
  leadTime: string;
  moqMin: string;
  moqMax: string;
};

const initialFilters = {
  countries: {},
  factoryLocations: {},
  leadTime: "",
  moqMin: "",
  moqMax: "",
};

// TODO: figure out how to display accurate filters for locations
const CustomerSearchResults = () => {
  const theme = useTheme();
  // location is used to extract query params
  const location = useLocation();

  // setSearchParams is used to set url query strings, it will trigger a location change and re-run search query if location.search changes
  const [searchParams, setSearchParams] = useSearchParams();

  // state to check if url query is valid aka not tempered by user
  const [validQueryString, setValidQueryString] = useState(false);

  // state to indicate whether query params is malformed and display error if needed
  const [queryParamError, setQueryParamError] = useState(false);

  // Filter values, this will be initialized based on url if there is any, otherwise they will be empty string
  const [filters, setFilters] = useState<CustomerFilters>({
    ...initialFilters,
  });
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  // Query params after ? e.g. "budget=5000&deliveryDate=2022-12-31"
  const queries = location.search.substring(1);

  // We use queryMap to determine the query params sent to server.
  // Note: for array fields (countries, factoryLocations) if there is only one element, it will be a string, not an array.
  // so please make sure to handle properly when sending an array query param
  const queryMap = qs.parse(queries);

  const [
    searchVendors,
    {
      data: searchVendorsData,
      error: searchVendorsError,
      loading: searchVendorsLoading,
    },
  ] = useSearchVendorCompaniesLazyQuery();

  // Display error if any
  useEffect(() => {
    if (searchVendorsError) {
      setSnackbar({
        message: "Something went wrong. Please try again later.",
        severity: "error",
      });
      setSnackbarOpen(true);
    }

    if (queryParamError) {
      setSnackbar({
        message: "Invalid search.",
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [searchVendorsError, queryParamError]);

  // Validate url query string and set error if needed, also initializes filters value
  useEffect(() => {
    let valid = true;
    for (let key in queryMap) {
      if (!allowedParams[key]) {
        valid = false;
      }
    }
    setValidQueryString(valid);
    setQueryParamError(!valid);

    if (valid) {
      if (queryMap.leadTime) {
        setFilters({
          ...filters,
          leadTime: queryMap.leadTime as string,
        });
      }
      if (queryMap.factoryLocations) {
        // If there's more than one factory location selected
        if (Array.isArray(queryMap.factoryLocations)) {
          const factoryLocationsMap = {} as Record<string, boolean>;
          queryMap.factoryLocations.forEach((loc) => {
            factoryLocationsMap[loc as string] = true;
          });
          setFilters({
            ...filters,
            factoryLocations: factoryLocationsMap,
          });
        } else {
          setFilters({
            ...filters,
            factoryLocations: {
              [queryMap.factoryLocations as string]: true,
            },
          });
        }
      }
    }
  }, [queries]);

  // Runs on every query change based on userInput or filters, only runs if queries are valid.
  useEffect(() => {
    if (validQueryString) {
      searchVendors({
        variables: {
          data: {
            userInput: queryMap.userInput as string,
            leadTime: queryMap.leadTime
              ? (queryMap.leadTime as string)
              : undefined,
            factoryLocations: queryMap.factoryLocations
              ? Array.isArray(queryMap.factoryLocations)
                ? (queryMap.factoryLocations as string[])
                : [queryMap.factoryLocations as string]
              : undefined,
            moqMin: queryMap.moqMin ? (queryMap.moqMin as string) : undefined,
            moqMax: queryMap.moqMax ? (queryMap.moqMax as string) : undefined,
          },
        },
        fetchPolicy: "no-cache",
      });
    }
  }, [validQueryString, queries]);

  // Clears all filters and sets searchParam to only contain userInput. This changes the url and thus trigger a search request
  const clearFilters = () => {
    setFilters({ ...initialFilters });
    setSearchParams({
      userInput: queryMap.userInput as string,
    });
  };

  // Add current selected filters to url to trigger a new search request based on new query params
  const applyFilters = () => {
    let currentSearchParams: any = {
      ...searchParams,
      userInput: queryMap.userInput,
    };
    if (Object.keys(filters.countries).length) {
      currentSearchParams.countries = Object.keys(filters.countries);
    }

    if (Object.keys(filters.factoryLocations).length) {
      currentSearchParams.factoryLocations = Object.keys(
        filters.factoryLocations
      );
    }

    if (filters.leadTime) {
      currentSearchParams.leadTime = filters.leadTime;
    }

    if (filters.moqMax) {
      currentSearchParams.moqMax = filters.moqMax;
    }

    if (filters.moqMin) {
      currentSearchParams.moqMin = filters.moqMin;
    }

    setSearchParams(currentSearchParams);
  };

  const renderCheckBox = (
    label: string,
    onClickCallback: () => void,
    onClearCallback: () => void,
    shouldDisable: boolean,
    shouldCheck: boolean // persists filter check state when reload
  ) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            disabled={shouldDisable}
            onChange={(e) => {
              if (!e.target.checked) {
                onClearCallback();
              } else {
                onClickCallback();
              }
            }}
          />
        }
        componentsProps={{
          typography: {
            variant: "caption",
          },
        }}
        checked={shouldCheck}
        disabled={shouldDisable}
        label={label}
        style={{ maxHeight: "30px" }}
        sx={{
          ":hover": !shouldDisable
            ? {
                "& .MuiTypography-root": {
                  fontWeight: 600,
                },
                "& .MuiSvgIcon-root": {
                  color: theme.palette.primary.light,
                },
              }
            : {},
        }}
      />
    );
  };

  const renderLeadTimeFilters = () => {
    const setLeadTimeFilter = (leadTime: string) => () => {
      setFilters({
        ...filters,
        leadTime,
      });
    };

    const clearLeadTimeFilter = () => {
      setFilters({
        ...filters,
        leadTime: "",
      });
    };

    const shouldDisable = (value: string) => {
      // If no budget filter is set, should not disable checkbox.
      if (!filters.leadTime) return false;

      // If current filter value is not the same as selected, should disable.
      return filters.leadTime !== value;
    };

    const shouldCheck = (value: string) => {
      return filters.leadTime === value;
    };
    return (
      <>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          mt={2}
        >
          <Typography variant="subtitle2" textAlign="left">
            Lead Time
          </Typography>
          <Typography
            variant="caption"
            onClick={clearFilters}
            style={{ cursor: "pointer", color: theme.palette.primary.main }}
          >
            clear filters
          </Typography>
        </Box>
        <FormGroup>
          {renderCheckBox(
            "3 month",
            setLeadTimeFilter("3"),
            clearLeadTimeFilter,
            shouldDisable("3"),
            shouldCheck("3")
          )}
          {renderCheckBox(
            "6 month",
            setLeadTimeFilter("6"),
            clearLeadTimeFilter,
            shouldDisable("6"),
            shouldCheck("6")
          )}
          {renderCheckBox(
            "9 month",
            setLeadTimeFilter("9"),
            clearLeadTimeFilter,
            shouldDisable("9"),
            shouldCheck("9")
          )}
          {renderCheckBox(
            "12 month",
            setLeadTimeFilter("12"),
            clearLeadTimeFilter,
            shouldDisable("12"),
            shouldCheck("12")
          )}
          {renderCheckBox(
            "18 month",
            setLeadTimeFilter("18"),
            clearLeadTimeFilter,
            shouldDisable("18"),
            shouldCheck("18")
          )}
        </FormGroup>
      </>
    );
  };

  const renderFactoryLocationsFilter = () => {
    const setFactoryLocationsFilter = (location: string) => () => {
      setFilters({
        ...filters,
        factoryLocations: {
          ...filters.factoryLocations,
          [location]: true,
        },
      });
    };

    const clearFactoryLocationsFilter = (location: string) => () => {
      const currentFactoryLocations = { ...filters.factoryLocations };
      delete currentFactoryLocations[location];
      setFilters({
        ...filters,
        factoryLocations: currentFactoryLocations,
      });
    };

    // Allow any country to be selected
    const shouldDisable = () => {
      return false;
    };

    const shouldCheck = (value: string) => {
      return !!filters.factoryLocations[value];
    };
    return (
      <>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          mt={2}
        >
          <Typography variant="subtitle2" textAlign="left">
            Factory Locations
          </Typography>
        </Box>
        <FormGroup>
          {renderCheckBox(
            "USA",
            setFactoryLocationsFilter("USA"),
            clearFactoryLocationsFilter("USA"),
            shouldDisable(),
            shouldCheck("USA")
          )}
          {renderCheckBox(
            "China",
            setFactoryLocationsFilter("China"),
            clearFactoryLocationsFilter("China"),
            shouldDisable(),
            shouldCheck("China")
          )}
          {renderCheckBox(
            "Vietnam",
            setFactoryLocationsFilter("Vietnam"),
            clearFactoryLocationsFilter("Vietnam"),
            shouldDisable(),
            shouldCheck("Vietnam")
          )}
          {renderCheckBox(
            "Mexico",
            setFactoryLocationsFilter("Mexico"),
            clearFactoryLocationsFilter("Mexico"),
            shouldDisable(),
            shouldCheck("Mexico")
          )}
          {renderCheckBox(
            "India",
            setFactoryLocationsFilter("India"),
            clearFactoryLocationsFilter("India"),
            shouldDisable(),
            shouldCheck("India")
          )}
        </FormGroup>
      </>
    );
  };

  const renderMoqFilters = () => {
    const moqMinOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters({
        ...filters,
        moqMin: e.target.value,
      });
    };
    const moqMaxOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters({
        ...filters,
        moqMax: e.target.value,
      });
    };
    return (
      <>
        <Box mt={1.5} mb={1.5}>
          <Typography variant="subtitle2" textAlign="left">
            MOQ Range
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <TextField
            InputLabelProps={{ shrink: true }}
            label="Min"
            value={filters.moqMin}
            onChange={moqMinOnChange}
            sx={{ flexBasis: "45%" }}
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            label="Max"
            name="leadTime"
            value={filters.moqMax}
            sx={{ flexBasis: "45%" }}
            onChange={moqMaxOnChange}
          />
        </Box>
      </>
    );
  };
  if (searchVendorsLoading) {
    return <FullScreenLoading />;
  }

  if (searchVendorsData) {
    return (
      <Grid container justifyContent="space-evenly" spacing={0.5}>
        <Grid item xs={2} className="search-results-sortby-container">
          <Box>
            <Box>
              <Box>{renderLeadTimeFilters()}</Box>
              <Box>{renderMoqFilters()}</Box>
              <Box>{renderFactoryLocationsFilter()}</Box>
            </Box>
          </Box>
          <Box mt={2}>
            <Button variant="outlined" onClick={applyFilters} fullWidth>
              Apply Filters
            </Button>
          </Box>
        </Grid>

        <Grid item xs={7} className="search-results-inner-container">
          {!searchVendorsData.searchVendorCompanies.length && (
            <Typography variant="caption">
              Sorry, but we could not find any vendors for your search. Try
              searching for other products!
            </Typography>
          )}

          {!!searchVendorsData.searchVendorCompanies.length && (
            <Stack direction="column">
              {searchVendorsData.searchVendorCompanies.map((result, i) => {
                return <SearchCompanyOverview companyData={result} />;
              })}
            </Stack>
          )}
        </Grid>
      </Grid>
    );
  }

  return null;
};

export default CustomerSearchResults;
