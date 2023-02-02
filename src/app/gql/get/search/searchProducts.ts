import { gql } from "@apollo/client";


const SEARCH_PRODUCTS = gql`
  query searchProducts($data: SearchProductsInput!) {
    searchProducts(data: $data)
  }
`