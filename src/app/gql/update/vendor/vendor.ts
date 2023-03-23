import { gql } from "@apollo/client";

const UPDATE_VENDOR_INFO = gql`
  mutation updateVendorInfo($data: UpdateVendorInfoInput!) {
    updateVendorInfo(data: $data)
  }
`;

const UPDATE_FACTORY = gql`
  mutation updateFactory($data: UpdateFactoryInput!) {
    updateFactory(data: $data)
  }
`