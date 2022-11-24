import { gql } from "@apollo/client";
import { FILE_FRAGMENT } from "../../utils/common/file";

const UPLOAD_PROJECT_DESIGN = gql`
${FILE_FRAGMENT}
  mutation uploadProjectDesign($file: Upload!) {
    uploadProjectDesign(file: $file) {
      ...FileFragment
    }
  }
`;