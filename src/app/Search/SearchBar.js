import { useState } from "react"
import { useLazyQuery, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { 
  Container, 
  Input, 
  IconButton, 
  Grid, 
  TextField, 
  InputAdornment,
  InputBase
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';

const vendorQuery = gql`
  query searchCustomerProjects($searchInput: SearchProjectInput) {
    searchCustomerProjects(searchInput: $searchInput) {
      name
      materials
      id
      companyId
      deliveryDate
      deliveryCountry
      deliveryCity
      budget
      createdAt
    },
  }
`;

const customerQuery = gql`
  query searchVendorCompanies($searchInput: SearchCompanyInput) {
    searchVendorCompanies(searchInput: $searchInput) {
      id
      name
      logo
      country
      isVendor
      isVerified
      locations
      materials
    }
  }
`;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
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
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
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

const SearchBar = ({ isVendor }) => {
  const [input, setInput] = useState("");

  const [searchCustomerProjects] = useLazyQuery(vendorQuery);

  const [searchVendorCompanies] = useLazyQuery(customerQuery);

  const navigate = useNavigate();
  const handleSearchInput = (e) => {
    setInput(e.target.value);
  };

  const handleSearchOnClick = async () => {
    if (isVendor) {
      await searchCustomerProjects({
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
      }).then(v => {
        navigate("/vendor-search", {
          state: {
            searchResults: v.data.searchCustomerProjects
          }
        });
      })
    } else {

      await searchVendorCompanies({
        variables: {
          searchInput: {
            userInput: input
            // locations: [String]
            // moq: Int
            // leadTime: Int
          }
        },
        fetchPolicy: "no-cache"
      }).then(v => {

        navigate("/customer-search", {
          state: {
            searchResults: v.data.searchVendorCompanies
          }
        });
      })
    }
  };

  const handleEnterPress = (e) => {
    if (e.keyCode === 13) {
      handleSearchOnClick();
    }
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        value={input} 
        onChange={handleSearchInput}
        onKeyDown={handleEnterPress}
      />
    </Search>
  )
  if (isVendor) {
    return (
      <TextField
        id="search-bar"
        autoComplete="new-password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon onClick={handleSearchOnClick} style={{cursor: "pointer"}}/>
            </InputAdornment>
          )
        }}
        variant="outlined"
        value={input} 
        onChange={handleSearchInput}
        onKeyDown={handleEnterPress}
        style={{backgroundColor: "white", width: "80%"}}
      />)
  } 

  return (
      <TextField
        id="search-bar"
        autoComplete="new-password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon onClick={handleSearchOnClick} style={{cursor: "pointer"}}/>
            </InputAdornment>
          )
        }}
        variant="outlined"
        value={input} 
        onChange={handleSearchInput}
        onKeyDown={handleEnterPress}
        style={{backgroundColor: "white", width: "80%"}}
      />)
}

export default SearchBar;