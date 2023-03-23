import { gql } from "@apollo/client";

const CREATE_VENDOR = gql`
  mutation createVendor($data: CreateVendorInput!) {
    createVendor(data: $data)
  }
`;

const CREATE_VENDOR_SUBSCRIPTION = gql`
  mutation createVendorSubscription($data: CreateVendorSubscriptionInput!) {
    createVendorSubscription(data: $data) {
      clientSecret
      subscriptionId
    }
  }
`;

const CREATE_INVOICE = gql`
  mutation createInvoice($data: CreateInvoiceInput!) {
    createInvoice(data: $data)
  }
`

const CREATE_GUEST_PROJECT = gql`
  mutation createGuestProjectLink($data: CreateGuestProjectLinkInput!) {
    createGuestProjectLink(data: $data)
  }
`

const CREATE_CERTS = gql`
  mutation createCertifications($data: CreateCertificationsInput!) {
    createCertifications(data: $data)
  }
`

const CREATE_FACTORY = gql`
  mutation createFactory($data: CreateFactoryInput!) {
    createFactory(data: $data)
  }
`