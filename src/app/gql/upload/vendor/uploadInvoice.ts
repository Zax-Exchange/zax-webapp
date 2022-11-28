import { gql } from "@apollo/client";
import { FILE_FRAGMENT } from "../../utils/common/file";

const UPLOAD_INVOICE = gql`
${FILE_FRAGMENT}
  mutation uploadInvoice($file: Upload!) {
    uploadInvoice(file: $file) {
      ...FileFragment
      status
    }
  }
`;