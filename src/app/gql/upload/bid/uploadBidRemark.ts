import { gql } from "@apollo/client";
import { FILE_FRAGMENT } from "../../utils/common/file";

const UPLOAD_BID_REMARK = gql`
${FILE_FRAGMENT}
  mutation uploadBidRemark($file: Upload!) {
    uploadBidRemark(file: $file) {
      ...FileFragment
    }
  }
`;