import { gql } from "@apollo/client";

const GET_BILLING_EMAIL = gql`
  query getBillingEmail($data: GetBillingEmailInput!) {
    getBillingEmail(data: $data)
  }
`

const GET_STATEMENTS = gql`
  query getStatements($data: GetStatementsInput!) {
    getStatements(data: $data)
  }
`