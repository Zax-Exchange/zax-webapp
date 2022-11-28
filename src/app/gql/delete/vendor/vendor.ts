import { gql } from "@apollo/client";

const DELETE_INVOICE = gql`
  mutation deleteInvoice($data: DeleteInvoiceInput!) {
    deleteInvoice(data: $data)
  }
`