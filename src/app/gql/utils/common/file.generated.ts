// THIS FILE IS GENERATED. DO NOT EDIT.
import * as Types from '../../../../generated/graphql';

import { gql } from '@apollo/client';
export type FileFragment_BidRemark_Fragment = { __typename?: 'BidRemark', fileId: string, filename: string, url: string };

export type FileFragment_Invoice_Fragment = { __typename?: 'Invoice', fileId: string, filename: string, url: string };

export type FileFragment_ProjectDesign_Fragment = { __typename?: 'ProjectDesign', fileId: string, filename: string, url: string };

export type FileFragment_PurchaseOrder_Fragment = { __typename?: 'PurchaseOrder', fileId: string, filename: string, url: string };

export type FileFragmentFragment = FileFragment_BidRemark_Fragment | FileFragment_Invoice_Fragment | FileFragment_ProjectDesign_Fragment | FileFragment_PurchaseOrder_Fragment;

export const FileFragmentFragmentDoc = gql`
    fragment FileFragment on FileInterface {
  fileId
  filename
  url
}
    `;