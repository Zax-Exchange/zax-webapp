import { gql } from "@apollo/client";

const DELETE_INVOICE = gql`
  mutation deleteInvoice($data: DeleteInvoiceInput!) {
    deleteInvoice(data: $data)
  }
`

const DELETE_CERTS = gql`
  mutation deleteCertifications($data: DeleteCertificationsInput!) {
    deleteCertifications(data: $data)
  }
`

const DELETE_PRODUCT_IMAGES = gql`
  mutation deleteProductImages($data: DeleteProductImagesInput!) {
    deleteProductImages(data: $data)
  }
`

const DELETE_FACTORY = gql`
  mutation deleteFactory($data: DeleteFactoryInput!) {
    deleteFactory(data: $data)
  }
`