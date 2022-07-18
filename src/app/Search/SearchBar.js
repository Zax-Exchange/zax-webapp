import { useState } from "react"
import { useLazyQuery, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { Container, Input, IconButton, Grid, TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const vendorQuery = gql`
  query searchCustomerProjects($seachInput: SearchProjectInput) {
    searchCustomerProjects(searchInput: $seachInput) {
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

const SearchBar = () => {
  const [input, setInput] = useState("");

  const [searchCustomerProjects] = useLazyQuery(vendorQuery, {
    fetchPolicy: "no-cache"
  });
  const navigate = useNavigate();
  const handleSearchInput = (e) => {
    setInput(e.target.value);
  };

  const handleSearchOnClick = async () => {
    await searchCustomerProjects({
      variables: {
        seachInput: {
          userInput: input
          // deliveryCountries: [String]
          // deliveryCities: [String]
          // budget: Int
          // leadTime: Int
        }
      },
      fetchPolicy: "no-cache"
    }).then(v => {
      navigate("/search", {state: v.data});
    })
  };

  const handleEnterPress = (e) => {
    if (e.keyCode === 13) {
      handleSearchOnClick();
    }
  };

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