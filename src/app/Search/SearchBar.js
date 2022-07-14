import { useState } from "react"
import { useLazyQuery, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";

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

  const [searchCustomerProjects, {data: result}] = useLazyQuery(vendorQuery);
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
      }
    }).then(v => {
      console.log(v.data)
      navigate("/search", {state: v.data});
    })
  };

  return (<div className="search-bar-container">
    <input value={input} onChange={handleSearchInput}/>
    <button onClick={handleSearchOnClick}>Search</button>
  </div>)
}

export default SearchBar;