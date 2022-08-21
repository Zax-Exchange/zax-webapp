import { gql } from "@apollo/client";

// updates customer company data
const UPDATE_CUSTOMER_DATA = gql`
  mutation updateCustomer($data: UpdateCustomerInput) {
    updateCustomer(data: $data)
  }
`;