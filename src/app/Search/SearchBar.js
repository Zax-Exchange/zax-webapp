import { useContext, useState } from "react"
import { useLazyQuery, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { 
  Container, 
  Input, 
  IconButton, 
  Grid, 
  TextField, 
  InputAdornment,
  InputBase,
  Box
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { AuthContext } from "../../context/AuthContext";
import { useSearchProjects, useSearchVendors } from "../hooks/searchHooks";
import FullScreenLoading from "../Utils/Loading";


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 40,
  border:"1px solid #aeaeae",
  backgroundColor: "white",
  flexGrow: 1,
  '&:hover': {
    backgroundColor: "white",
    borderColor: "#757575"
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: "#9f9e9e"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchBar = ({
  setSnackbar,
  setSnackbarOpen
}) => {
  const { user } = useContext(AuthContext);
  const isVendor = user.isVendor;
  const navigate = useNavigate();
  
  const {
    searchProjects,
    searchProjectsData,
    searchProjectsError,
    searchProjectsLoading
  } = useSearchProjects();

  const {
    searchVendors,
    searchVendorsData,
    searchVendorsError,
    searchVendorsLoading
  } = useSearchVendors();
  
  const [input, setInput] = useState("");

  const handleSearchInput = (e) => {
    setInput(e.target.value);
  };

  const handleSearchOnClick = async () => {

    try {
      if (isVendor) {
        const { data } = await searchProjects({
          variables: {
            searchInput: {
              userInput: input
              // deliveryCountries: [String]
              // deliveryCities: [String]
              // budget: Int
              // leadTime: Int
            }
          },
          fetchPolicy: "no-cache"
        })
        navigate("/vendor-search-results", {
          state: {
            searchResults: data.searchCustomerProjects
          }
        });
      } else {
        const { data } = await searchVendors({
          variables: {
            searchInput: {
              userInput: input
              // locations: [String]
              // moq: Int
              // leadTime: Int
            }
          },
          fetchPolicy: "no-cache"
        })
        navigate("/customer-search-results", {
          state: {
            searchResults: data.searchVendorCompanies
          }
        });
      }
    } catch (error) {
      setSnackbar({
        severity: "error",
        message: "Something went wrong. Please try again later."
      })
      setSnackbarOpen(true);
    }
  };

  const handleEnterPress = (e) => {
    if (e.keyCode === 13) {
      handleSearchOnClick();
    }
  };
  console.log({input, searchProjectsData})
  if (searchProjectsLoading || searchVendorsLoading) return <FullScreenLoading />

  return (
    <Box>
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
  )
}

export default SearchBar;