import {
  NavigateOptions,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import SearchProjectOverview from "./SearchProjectOverview";
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

// Allowed search params, if user tempers the url we will not allow search request to fire
const allowedParams = {
  userInput: true,
  budget: true,
  deliveryDate: true,
} as { [key: string]: boolean };

type VendorFiltersType = {
  budget: string;
  deliveryDate: string;
};

const VendorSearchResults = () => {
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
  const [filters, setFilters] = useState<VendorFiltersType>({
    budget: "",
    deliveryDate: "",
  });
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  // Query params after ? e.g. "budget=5000&deliveryDate=2022-12-31"
  const queries = location.search.substring(1);

  const queryMap = qs.parse(queries);

  const [
    searchProjects,
    {
      data: searchProjectsData,
      error: searchProjectsError,
      loading: searchProjectsLoading,
    },
  ] = useSearchCustomerProjectsLazyQuery();

  // Display error if any
  useEffect(() => {
    if (searchProjectsError) {
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
  }, [searchProjectsError, queryParamError]);

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
      if (queryMap.budget) {
        setFilters({
          ...filters,
          budget: queryMap.budget as string,
        });
      }
      if (queryMap.deliveryDate) {
        setFilters({
          ...filters,
          deliveryDate: queryMap.deliveryDate as string,
        });
      }
    }
  }, [queries]);

  // Runs on every query change based on userInput or filters, only runs if queries are valid.
  useEffect(() => {
    if (validQueryString) {
      searchProjects({
        variables: {
          data: {
            userInput: queryMap.userInput as string,
            budget: queryMap.budget ? (queryMap.budget as string) : undefined,
            deliveryDate: queryMap.deliveryDate
              ? (queryMap.deliveryDate as string)
              : undefined,
          },
        },
        fetchPolicy: "no-cache",
      });
    }
  }, [validQueryString, queries]);

  // Clears all filters and sets searchParam to only contain userInput. This changes the url and thus trigger a search request
  const clearFilters = () => {
    setFilters({
      budget: "",
      deliveryDate: "",
    });
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
    if (filters.budget) {
      currentSearchParams.budget = filters.budget;
    }

    if (filters.deliveryDate) {
      currentSearchParams.deliveryDate = filters.deliveryDate;
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

  const renderBudgetFilters = () => {
    const setBudgetFilter = (budget: string) => () => {
      setFilters({
        ...filters,
        budget,
      });
    };

    const clearBudgetFilter = () => {
      setFilters({
        ...filters,
        budget: "",
      });
    };

    const shouldDisable = (value: string) => {
      // If no budget filter is set, should not disable checkbox.
      if (!filters.budget) return false;

      // If current filter value is not the same as selected, should disable.
      return filters.budget !== value;
    };

    const shouldCheck = (value: string) => {
      return filters.budget === value;
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
            Budget
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
            "5000 +",
            setBudgetFilter("5000"),
            clearBudgetFilter,
            shouldDisable("5000"),
            shouldCheck("5000")
          )}
          {renderCheckBox(
            "10000 +",
            setBudgetFilter("10000"),
            clearBudgetFilter,
            shouldDisable("10000"),
            shouldCheck("10000")
          )}
          {renderCheckBox(
            "30000 +",
            setBudgetFilter("30000"),
            clearBudgetFilter,
            shouldDisable("30000"),
            shouldCheck("30000")
          )}
          {renderCheckBox(
            "50000 +",
            setBudgetFilter("50000"),
            clearBudgetFilter,
            shouldDisable("50000"),
            shouldCheck("50000")
          )}
          {renderCheckBox(
            "100000 +",
            setBudgetFilter("100000"),
            clearBudgetFilter,
            shouldDisable("100000"),
            shouldCheck("100000")
          )}
        </FormGroup>
      </>
    );
  };

  const renderDeliveryDateFilters = () => {
    const getOffSetDate = (offset: number) => {
      const date = new Date();
      date.setMonth(date.getMonth() + offset);
      return date.toISOString().split("T")[0];
    };
    const setDeliveryDateFilter = (offset: number) => () => {
      setFilters({
        ...filters,
        deliveryDate: getOffSetDate(offset),
      });
    };

    const clearDeliveryDateFilter = () => {
      setFilters({
        ...filters,
        deliveryDate: "",
      });
    };

    const shouldDisable = (value: number) => {
      if (!filters.deliveryDate) return false;
      return filters.deliveryDate !== getOffSetDate(value);
    };

    const shouldCheck = (value: number) => {
      return filters.deliveryDate === getOffSetDate(value);
    };
    return (
      <>
        <Box mt={2}>
          <Typography variant="subtitle2" textAlign="left">
            Delivery Date
          </Typography>
        </Box>
        <FormGroup>
          {renderCheckBox(
            "in 3 months",
            setDeliveryDateFilter(3),
            clearDeliveryDateFilter,
            shouldDisable(3),
            shouldCheck(3)
          )}
          {renderCheckBox(
            "in 6 months",
            setDeliveryDateFilter(6),
            clearDeliveryDateFilter,
            shouldDisable(6),
            shouldCheck(6)
          )}
          {renderCheckBox(
            "in 9 months",
            setDeliveryDateFilter(9),
            clearDeliveryDateFilter,
            shouldDisable(9),
            shouldCheck(9)
          )}
          {renderCheckBox(
            "in 12 months",
            setDeliveryDateFilter(12),
            clearDeliveryDateFilter,
            shouldDisable(12),
            shouldCheck(12)
          )}
        </FormGroup>
      </>
    );
  };

  if (searchProjectsLoading) {
    return <FullScreenLoading />;
  }

  if (searchProjectsData) {
    return (
      <Grid container justifyContent="space-evenly" spacing={0.5}>
        <Grid item xs={2} className="search-results-sortby-container">
          <Box>
            <Box>
              <Box>{renderBudgetFilters()}</Box>
              <Box>{renderDeliveryDateFilters()}</Box>
            </Box>
          </Box>
          <Box mt={2}>
            <Button variant="outlined" onClick={applyFilters} fullWidth>
              Apply Filters
            </Button>
          </Box>
        </Grid>

        <Grid item xs={7} className="search-results-inner-container">
          {!searchProjectsData.searchCustomerProjects.length && (
            <Typography variant="caption">
              Sorry, but we could not find any projects for your search. Try
              searching for other products!
            </Typography>
          )}
          {searchProjectsData.searchCustomerProjects.length && (
            <Stack direction="column">
              {searchProjectsData.searchCustomerProjects.map(
                (result: ProjectOverview, i: number) => {
                  return <SearchProjectOverview projectData={result} key={i} />;
                }
              )}
            </Stack>
          )}
        </Grid>
      </Grid>
    );
  }

  return null;
};

export default VendorSearchResults;
