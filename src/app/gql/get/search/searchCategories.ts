import { gql } from "@apollo/client";


const SEARCH_CATEGORIES = gql`
  query searchCategories($data: SearchCategoriesInput!) {
    searchCategories(data: $data) {
      name
      parent 
      children
    }
  }
`