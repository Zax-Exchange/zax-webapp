import { gql } from "@apollo/client";

const CHECK_COMPANY_NAME = gql`
  query checkCompanyName($data: CheckCompanyNameInput!) {
    checkCompanyName(data: $data)
  }
`;