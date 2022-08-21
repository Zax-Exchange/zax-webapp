import { gql } from "@apollo/client";

const UPDATE_VENDOR_DATA = gql`
  mutation updateVendor($data: UpdateVendorInput) {
    updateVendor(data: $data)
  }
`;