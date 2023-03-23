import { gql } from "@apollo/client";
import { FILE_FRAGMENT } from "../../utils/common/file";

const UPLOAD_INVOICE = gql`
${FILE_FRAGMENT}
  mutation uploadCertification($file: Upload!) {
    uploadCertification(file: $file) {
      ...FileFragment
    }
  }
`;