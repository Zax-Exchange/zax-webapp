import { gql } from "@apollo/client";
import { FILE_FRAGMENT } from "../../utils/common/file";

const UPLOAD_PURCHASE_ORDER = gql`
${FILE_FRAGMENT}
  mutation uploadPurchaseOrder($file: Upload!) {
    uploadPurchaseOrder(file: $file) {
      ...FileFragment
      status
    }
  }
`;