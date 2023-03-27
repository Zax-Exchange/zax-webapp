import { gql } from "@apollo/client";
import { FILE_FRAGMENT } from "../../utils/common/file";

const UPLOAD_PRODUC_IMAGE = gql`
${FILE_FRAGMENT}
  mutation uploadProductImage($file: Upload!) {
    uploadProductImage(file: $file) {
      ...FileFragment
    }
  }
`;