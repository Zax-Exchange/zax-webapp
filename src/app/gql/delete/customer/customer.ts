import { gql } from "@apollo/client";

const DELETE_PURCHASE_ORDER = gql`
  mutation deletePurchaseOrder($data: DeletePurchaseOrderInput!) {
    deletePurchaseOrder(data: $data)
  }
`