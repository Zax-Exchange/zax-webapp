import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  InputBase,
  Box,
  Autocomplete,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, useTheme } from "@mui/material/styles";
import { AuthContext } from "../../context/AuthContext";

import React from "react";
import useCustomSnackbar from "../Utils/CustomSnackbar";
import { CUSTOMER_ROUTES, VENDOR_ROUTES } from "../constants/loggedInRoutes";
import { useIntl } from "react-intl";
import { useSearchProductsLazyQuery } from "../gql/get/search/searchProducts.generated";
import { throttle } from "lodash";
import { Clear } from "@mui/icons-material";
import { useSearchCategoriesLazyQuery } from "../gql/get/search/searchCategories.generated";
import ReactGA from "react-ga4";
import { EVENT_ACTION, EVENT_CATEGORY } from "../../analytics/constants";
import mixpanel from "mixpanel-browser";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 40,
  border: "1px solid #aeaeae",
  backgroundColor: "white",
  flexGrow: 1,
  "&:hover": {
    backgroundColor: "white",
    borderColor: "#757575",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#9f9e9e",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

enum AutoSuggestOptionType {
  PRODUCT = "PRODUCT",
  CATEGORY = "CATEGORY",
}

type AutoSuggestOption = {
  label: string;
  type: AutoSuggestOptionType;
};

const SearchBar = () => {
  const intl = useIntl();
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const isVendor = user!.isVendor;
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [options, setOptions] = useState<AutoSuggestOption[]>([]);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const [
    searchProducts,
    {
      loading: searchProductsLoading,
      data: searchProductsData,
      error: searchProductsError,
    },
  ] = useSearchProductsLazyQuery();

  const [
    searchCategories,
    {
      loading: searchCategoriesLoading,
      data: searchCategoriesData,
      error: searchCategoriesError,
    },
  ] = useSearchCategoriesLazyQuery();

  const fetch = useMemo(() => {
    return throttle(
      (cb: () => void) => {
        cb();
      },
      500,
      { leading: true }
    );
  }, []);

  useEffect(() => {
    if (searchProductsError || searchCategoriesError) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [searchProductsError, searchCategoriesError]);

  useEffect(() => {
    fetch(() => {
      if (input) {
        searchProducts({
          variables: {
            data: {
              searchText: input,
            },
          },
          fetchPolicy: "network-only",
        });
        if (user!.isVendor) {
          searchCategories({
            variables: {
              data: {
                searchText: input,
              },
            },
            fetchPolicy: "network-only",
          });
        }
      }
    });
  }, [fetch, input]);

  useEffect(() => {
    let allData: AutoSuggestOption[] = [];
    if (searchProductsData && user!.isVendor && searchCategoriesData) {
      allData = [
        ...(searchProductsData.searchProducts.map((p) => ({
          label: p,
          type: AutoSuggestOptionType.PRODUCT,
        })) as AutoSuggestOption[]),
        ...(searchCategoriesData.searchCategories.map((c) => ({
          label: c.name,
          type: AutoSuggestOptionType.CATEGORY,
        })) as AutoSuggestOption[]),
      ];
    } else if (!user!.isVendor && searchProductsData) {
      allData = [
        ...(searchProductsData.searchProducts.map((p) => ({
          label: p,
          type: AutoSuggestOptionType.PRODUCT,
        })) as AutoSuggestOption[]),
      ];
    }
    setOptions(allData);
  }, [searchProductsData, searchCategoriesData]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSearchOnClick = async (input: string) => {
    mixpanel.track(EVENT_ACTION.INPUT, {
      category: EVENT_CATEGORY.SEARCH,
      value: input,
    });
    ReactGA.event({
      action: EVENT_ACTION.INPUT,
      category: EVENT_CATEGORY.SEARCH,
      label: input,
    });

    try {
      const encodedInput = encodeURIComponent(input);
      if (isVendor) {
        navigate(`${VENDOR_ROUTES.SEARCH_RESULTS}?userInput=${encodedInput}`);
      } else {
        navigate(`${CUSTOMER_ROUTES.SEARCH_RESULTS}?userInput=${encodedInput}`);
      }
    } catch (error) {
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({ id: "app.general.network.error" }),
      });
      setSnackbarOpen(true);
    }
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      closeSuggestions();
      handleSearchOnClick(input);
    }
  };

  const closeSuggestions = () => {
    setShowSuggestions(false);
  };
  return (
    <Box width="400px" ml={2}>
      <Autocomplete
        // loading={searchProductsLoading}
        // loadingText={intl.formatMessage({ id: "app.general.loading" }) + "..."}

        open={showSuggestions}
        onOpen={() => setShowSuggestions(true)}
        onClose={closeSuggestions}
        options={options}
        renderOption={(props, option) => {
          return <li {...props}>{option.label}</li>;
        }}
        onChange={(e, v) => {
          if (v) {
            setInput((v as AutoSuggestOption).label);
            handleSearchOnClick((v as AutoSuggestOption).label);
          }
        }}
        freeSolo
        inputValue={input}
        value={input}
        onInputChange={(e, v) => setInput(v)}
        onKeyDown={handleEnterPress}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          if (!input) {
            setOptions([]);
            setIsFocused(false);
          }
        }}
        blurOnSelect
        clearIcon={input ? <Clear fontSize="small" /> : null}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              sx: {
                fontSize: 16,
                borderRadius: "40px",
                width: "100%",
                "& .MuiInputBase-input": {
                  paddingLeft: "4px",
                  // padding: theme.spacing(1, 1, 1, 0),
                  // // vertical padding + font size from searchIcon
                  // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                  // transition: theme.transitions.create("width"),

                  // [theme.breakpoints.up("sm")]: {
                  //   width: "12ch",
                  //   minWidth: "12ch",
                  //   "&:focus": {
                  //     width: "20ch",
                  //   },
                  // },
                },
              },
              startAdornment:
                !isFocused && !input ? (
                  <SearchIconWrapper>
                    <SearchIcon />
                    {intl.formatMessage({ id: "app.general.search" })}
                  </SearchIconWrapper>
                ) : null,
            }}
          />
        )}
        groupBy={(option) => {
          return option.type;
        }}
        renderGroup={(params) => {
          return (
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ m: 1 }}
              >
                {params.group === AutoSuggestOptionType.PRODUCT
                  ? intl.formatMessage({
                      id: "app.component.attribute.product",
                    })
                  : intl.formatMessage({
                      id: "app.project.attribute.category",
                    })}
              </Typography>
              {params.children}
            </Box>
          );
        }}
      />
    </Box>
  );
};

export default SearchBar;
