import { gql } from "@apollo/client";

const CHECK_COMPANY_NAME = gql`
  query checkCompanyName($name: String) {
    checkCompanyName(name: $name)
  }
`;