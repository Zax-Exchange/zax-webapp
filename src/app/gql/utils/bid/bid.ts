import { gql } from "@apollo/client";

const UPLOAD_BID_REMARK = gql`
  mutation uploadBidRemark($file: Upload!) {
    uploadBidRemark(file: $file) {
      fileId
      filename
      url
    }
  }
`;