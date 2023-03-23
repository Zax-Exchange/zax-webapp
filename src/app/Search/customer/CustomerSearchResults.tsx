import { useLocation, useSearchParams } from "react-router-dom";

import {
  Typography,
  Stack,
  Grid,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  useTheme,
  TextField,
  Autocomplete,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useSearchVendorCompaniesLazyQuery } from "../../gql/get/vendor/vendor.generated";
import qs from "qs";
import FullScreenLoading from "../../Utils/Loading";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import SearchCompanyOverview from "./SearchCompanyOverview";
import { useIntl } from "react-intl";
import { countries } from "../../constants/countries";
import { Country } from "../../Signup/customer/CustomerSignup";

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

const CustomerSearchResults = () => {
  const intl = useIntl();
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

  // Query params after ? e.g. "targetPrice=5000&deliveryDate=2022-12-31"
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
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }

    if (queryParamError) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.search.invalidSearch" }),
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
      // If no targetPrice filter is set, should not disable checkbox.
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
          mb={1}
        >
          <Typography variant="subtitle2" textAlign="left">
            {intl.formatMessage({ id: "app.vendor.attribute.leadTime" })}
          </Typography>
          <Typography
            variant="caption"
            onClick={clearFilters}
            style={{ cursor: "pointer", color: theme.palette.primary.main }}
          >
            {intl.formatMessage({
              id: "app.search.clearFilters",
            })}
          </Typography>
        </Box>
        <FormGroup>
          {renderCheckBox(
            intl.formatMessage(
              { id: "app.search.filter.inMonths" },
              {
                month: "6",
              }
            ),
            setLeadTimeFilter("6"),
            clearLeadTimeFilter,
            shouldDisable("6"),
            shouldCheck("6")
          )}
          {renderCheckBox(
            intl.formatMessage(
              { id: "app.search.filter.inMonths" },
              {
                month: "12",
              }
            ),
            setLeadTimeFilter("12"),
            clearLeadTimeFilter,
            shouldDisable("12"),
            shouldCheck("12")
          )}
          {renderCheckBox(
            intl.formatMessage(
              { id: "app.search.filter.inMonths" },
              {
                month: "18",
              }
            ),
            setLeadTimeFilter("18"),
            clearLeadTimeFilter,
            shouldDisable("18"),
            shouldCheck("18")
          )}
          {renderCheckBox(
            intl.formatMessage(
              { id: "app.search.filter.inMonths" },
              {
                month: "24",
              }
            ),
            setLeadTimeFilter("24"),
            clearLeadTimeFilter,
            shouldDisable("24"),
            shouldCheck("24")
          )}
        </FormGroup>
      </>
    );
  };

  const renderFactoryLocationsFilter = () => {
    const renderFactoryLocationDropdown = () => {
      const convertToFilters = (v: Country[]) => {
        const res: Record<string, boolean> = {};
        for (let country of v) {
          res[country.label] = true;
        }
        return res;
      };
      return (
        <Autocomplete
          options={countries}
          autoHighlight
          getOptionLabel={(option) => option.label}
          value={countries.filter((country) =>
            Object.keys(filters.factoryLocations).includes(country.label)
          )}
          disableCloseOnSelect
          onChange={(e, v) => {
            setFilters({
              ...filters,
              factoryLocations: convertToFilters(v),
            });
          }}
          multiple
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                alt=""
              />
              {option.label} ({option.code})
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              required
              {...params}
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
      );
    };
    return (
      <>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          mt={2}
          mb={1}
        >
          <Typography variant="subtitle2" textAlign="left">
            {intl.formatMessage({ id: "app.vendor.attribute.locations" })}
          </Typography>
        </Box>
        {renderFactoryLocationDropdown()}
      </>
    );
  };

  // TODO: finish implementation since moq is now attached to vendor products
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
        <Grid item xs={2.8} className="search-results-sortby-container">
          <Paper sx={{ p: 2, pt: 0.5 }}>
            <Box>
              <Box>
                {/* <Box>{renderLeadTimeFilters()}</Box> */}
                {/* <Box>{renderMoqFilters()}</Box> */}
                <Box>{renderFactoryLocationsFilter()}</Box>
              </Box>
            </Box>
            <Box mt={2}>
              <Button variant="outlined" onClick={applyFilters} fullWidth>
                {intl.formatMessage({
                  id: "app.search.applyFilters",
                })}
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={7} className="search-results-inner-container">
          {!searchVendorsData.searchVendorCompanies.length && (
            <Typography variant="caption">
              {intl.formatMessage({
                id: "app.search.noResults",
              })}
            </Typography>
          )}

          {!!searchVendorsData.searchVendorCompanies.length && (
            <Stack direction="column">
              {searchVendorsData.searchVendorCompanies.map((result, i) => {
                return <SearchCompanyOverview searchResult={result} key={i} />;
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
