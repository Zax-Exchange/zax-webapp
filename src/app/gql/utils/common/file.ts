import { gql } from "@apollo/client";

export const FILE_FRAGMENT = gql`
  fragment FileFragment on FileInterface {
      fileId
      filename
      url
  }
`