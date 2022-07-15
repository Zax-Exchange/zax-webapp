import { useState } from "react"
import { useLazyQuery, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { Container, Input, IconButton, Grid } from "@mui/material";
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
    }
  }
`;

const SearchBar = () => {
  const [input, setInput] = useState("");

  const [searchCustomerProjects] = useLazyQuery(vendorQuery);
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

  return (<Grid item xs={5} className="search-bar-container">
    <Input value={input} onChange={handleSearchInput} />
    <IconButton onClick={handleSearchOnClick} color="primary" ><SearchIcon/></IconButton>
  </Grid>)
}

export default SearchBar;