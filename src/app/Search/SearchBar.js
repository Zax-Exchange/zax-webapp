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
      isVerified
      locations
      materials
      moq
      leadTime
    }
  }
`;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
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

const SearchBar = () => {
  const { user } = useContext(AuthContext);
  const isVendor = user.isVendor;
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