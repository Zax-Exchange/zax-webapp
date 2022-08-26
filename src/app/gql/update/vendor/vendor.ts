import { gql } from "@apollo/client";

const UPDATE_VENDOR_INFO = gql`
  mutation updateVendorInfo($data: UpdateVendorInfoInput!) {
    updateVendorInfo(data: $data)
  }
`;