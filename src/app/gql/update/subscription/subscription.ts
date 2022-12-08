import { gql } from "@apollo/client";

const UPDATE_BILLING_EMAIL = gql`
  mutation updateBillingEmail($data: UpdateBillingEmailInput!) {
    updateBillingEmail(data: $data)
  }
`