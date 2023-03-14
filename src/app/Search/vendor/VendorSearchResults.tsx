import { useLocation, useSearchParams } from "react-router-dom";
import SearchProjectOverview from "./SearchProjectOverview";
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

import qs from "qs";
import { useSearchCustomerProjectsLazyQuery } from "../../gql/get/project/project.generated";
import FullScreenLoading from "../../Utils/Loading";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import { useIntl } from "react-intl";
import { isValidFloat } from "../../Utils/inputValidators";
import { Country } from "../../Signup/customer/CustomerSignup";
import { countries } from "../../constants/countries";

// Allowed search params, if user tempers the url we will not allow search request to fire
const allowedParams = {
  userInput: true,
  userId: true,
  targetPriceRange: true,
  deliveryDate: true,
  countries: true,
} as { [key: string]: boolean };

type VendorFiltersType = {
  targetPriceRange: string[];
  deliveryDate: string;
  countries: Record<string, boolean>;
};

const VendorSearchResults = () => {
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
  const [filters, setFilters] = useState<VendorFiltersType>({
    targetPriceRange: ["", ""],
    deliveryDate: "",
    countries: {},
  });
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  // Query params after ? e.g. "targetPrice=5000&deliveryDate=2022-12-31"
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
      if (queryMap.targetPriceRange) {
        setFilters({
          ...filters,
          targetPriceRange: queryMap.targetPriceRange as string[],
        });
      }
      if (queryMap.deliveryDate) {
        setFilters({
          ...filters,
          deliveryDate: queryMap.deliveryDate as string,
        });
      }
      if (queryMap.countries) {
        // If there's more than one factory location selected
        if (Array.isArray(queryMap.countries)) {
          const countriesMap = {} as Record<string, boolean>;
          queryMap.countries.forEach((loc) => {
            countriesMap[loc as string] = true;
          });
          setFilters({
            ...filters,
            countries: countriesMap,
          });
        } else {
          setFilters({
            ...filters,
            countries: {
              [queryMap.countries as string]: true,
            },
          });
        }
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
            userId: queryMap.userId as string,
            targetPriceRange: queryMap.targetPriceRange
              ? (queryMap.targetPriceRange as string[])
              : undefined,
            deliveryDate: queryMap.deliveryDate
              ? (queryMap.deliveryDate as string)
              : undefined,
            countries: queryMap.countries
              ? Array.isArray(queryMap.countries)
                ? (queryMap.countries as string[])
                : [queryMap.countries as string]
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
      targetPriceRange: ["", ""],
      deliveryDate: "",
      countries: {},
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
    if (
      filters.targetPriceRange[0] !== "" &&
      filters.targetPriceRange[1] !== ""
    ) {
      currentSearchParams.targetPriceRange = filters.targetPriceRange;
    }

    if (filters.deliveryDate) {
      currentSearchParams.deliveryDate = filters.deliveryDate;
    }

    if (filters.countries.length) {
      currentSearchParams.countries = filters.countries;
    }

    if (Object.keys(filters.countries).length) {
      currentSearchParams.countries = Object.keys(filters.countries);
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

  const renderTargetPriceFilters = () => {
    const targetPriceOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      const isAllowed = isValidFloat(val);

      if (isAllowed) {
        if (e.target.name === "min") {
          setFilters((prev) => ({
            ...prev,
            targetPriceRange: [val, prev.targetPriceRange[1]],
          }));
        }
        if (e.target.name === "max") {
          setFilters((prev) => ({
            ...prev,
            targetPriceRange: [prev.targetPriceRange[0], val],
          }));
        }
      }
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
            {intl.formatMessage({
              id: "app.project.attribute.targetPrice",
            })}
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
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <TextField
            InputLabelProps={{ shrink: true }}
            placeholder={intl.formatMessage({ id: "app.general.minimum" })}
            value={filters.targetPriceRange[0]}
            name="min"
            onChange={targetPriceOnChange}
            sx={{ flexBasis: "45%" }}
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            placeholder={intl.formatMessage({ id: "app.general.maximum" })}
            value={filters.targetPriceRange[1]}
            name="max"
            sx={{ flexBasis: "45%" }}
            onChange={targetPriceOnChange}
          />
        </Box>
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
            {intl.formatMessage({
              id: "app.project.attribute.deliveryDate",
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
            setDeliveryDateFilter(6),
            clearDeliveryDateFilter,
            shouldDisable(6),
            shouldCheck(6)
          )}
          {renderCheckBox(
            intl.formatMessage(
              { id: "app.search.filter.inMonths" },
              {
                month: "12",
              }
            ),
            setDeliveryDateFilter(12),
            clearDeliveryDateFilter,
            shouldDisable(12),
            shouldCheck(12)
          )}
          {renderCheckBox(
            intl.formatMessage(
              { id: "app.search.filter.inMonths" },
              {
                month: "18",
              }
            ),
            setDeliveryDateFilter(18),
            clearDeliveryDateFilter,
            shouldDisable(18),
            shouldCheck(18)
          )}
          {renderCheckBox(
            intl.formatMessage(
              { id: "app.search.filter.inMonths" },
              {
                month: "24",
              }
            ),
            setDeliveryDateFilter(24),
            clearDeliveryDateFilter,
            shouldDisable(24),
            shouldCheck(24)
          )}
        </FormGroup>
      </>
    );
  };

  const renderCountriesFilter = () => {
    const renderCountriesDropdown = () => {
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
          disableCloseOnSelect
          onChange={(e, v) => {
            setFilters({
              ...filters,
              countries: convertToFilters(v),
            });
          }}
          value={countries.filter((country) =>
            Object.keys(filters.countries).includes(country.label)
          )}
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
            {intl.formatMessage({ id: "app.project.attribute.country" })}
          </Typography>
        </Box>
        {renderCountriesDropdown()}
      </>
    );
  };
  if (searchProjectsLoading) {
    return <FullScreenLoading />;
  }

  if (searchProjectsData) {
    return (
      <Grid container justifyContent="space-evenly" spacing={0.5}>
        <Grid item xs={2.8} className="search-results-sortby-container">
          <Paper sx={{ p: 2, pt: 0.5 }}>
            <Box>
              <Box>
                <Box>{renderTargetPriceFilters()}</Box>
                <Box>{renderDeliveryDateFilters()}</Box>
                <Box>{renderCountriesFilter()}</Box>
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
          {!searchProjectsData.searchCustomerProjects.length && (
            <Typography variant="caption">
              {intl.formatMessage({
                id: "app.search.noResults",
              })}
            </Typography>
          )}
          {!!searchProjectsData.searchCustomerProjects.length && (
            <>
              <Stack direction="column">
                {searchProjectsData.searchCustomerProjects.map((result, i) => {
                  return <SearchProjectOverview projectData={result} key={i} />;
                })}
              </Stack>
            </>
          )}
        </Grid>
      </Grid>
    );
  }

  return null;
};

export default VendorSearchResults;
