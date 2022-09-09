import { useContext, useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Container,
  Input,
  IconButton,
  Grid,
  TextField,
  InputAdornment,
  InputBase,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { AuthContext } from "../../context/AuthContext";
import FullScreenLoading from "../Utils/Loading";

import React from "react";
import useCustomSnackbar from "../Utils/CustomSnackbar";
import { CUSTOMER_ROUTES, VENDOR_ROUTES } from "../constants/loggedInRoutes";
import { useSearchCustomerProjectsLazyQuery } from "../gql/get/project/project.generated";
import { useSearchVendorCompaniesLazyQuery } from "../gql/get/vendor/vendor.generated";

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

const SearchBar = () => {
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const isVendor = user!.isVendor;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [
    searchProjects,
    {
      data: searchProjectsData,
      error: searchProjectsError,
      loading: searchProjectsLoading,
    },
  ] = useSearchCustomerProjectsLazyQuery();

  const [
    searchVendors,
    {
      data: searchVendorsData,
      error: searchVendorsError,
      loading: searchVendorsLoading,
    },
  ] = useSearchVendorCompaniesLazyQuery();

  const [input, setInput] = useState("");

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSearchOnClick = async () => {
    try {
      if (isVendor) {
        navigate(`${VENDOR_ROUTES.SEARCH_RESULTS}/?userInput=${input}`);
      } else {
        const { data } = await searchVendors({
          variables: {
            data: {
              userInput: input,
              // locations: [String]
              // moq: Int
              // leadTime: Int
            },
          },
          fetchPolicy: "no-cache",
        });
        navigate(CUSTOMER_ROUTES.SEARCH_RESULTS, {
          state: {
            searchResults: data!.searchVendorCompanies,
          },
        });
      }
    } catch (error) {
      setSnackbar({
        severity: "error",
        message: "Something went wrong. Please try again later.",
      });
      setSnackbarOpen(true);
    }
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchOnClick();
    }
  };

  const isLoading = searchProjectsLoading || searchVendorsLoading;

  return (
    <Box>
      {isLoading && <FullScreenLoading />}
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          autoComplete="new-password"
          value={input}
          onChange={handleSearchInput}
          onKeyDown={handleEnterPress}
        />
      </Search>
    </Box>
  );
};

export default SearchBar;
