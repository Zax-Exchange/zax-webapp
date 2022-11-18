import { gql } from "@apollo/client";

const UPLOAD_PROJECT_DESIGN = gql`
  mutation uploadProjectDesign($file: Upload!) {
    uploadProjectDesign(file: $file) {
      filename
      fileId
      url
    }
  }
`;