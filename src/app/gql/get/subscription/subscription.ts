import { gql } from "@apollo/client";


const GET_STATEMENTS_LINK = gql`
  query getStatementsLink($data: GetStatementsLinkInput!) {
    getStatementsLink(data: $data)
  }
`