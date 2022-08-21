import { gql } from "@apollo/client";

const CREATE_VENDOR = gql`
  mutation createVendor($data: CreateVendorInput) {
    createVendor(data: $data)
  }
`;

const CREATE_VENDOR_SUBSCRIPTION = gql`
  mutation createVendorSubscription($data: CreateVendorSubscriptionInput) {
    createVendorSubscription(data: $data) {
      clientSecret
      subscriptionId
    }
  }
`;