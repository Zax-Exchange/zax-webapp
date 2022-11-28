import { ApolloQueryResult } from "@apollo/client";
import { LoadingButton } from "@mui/lab";
import { Box, Button, DialogActions, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import {
  Exact,
  GetVendorPosInput,
  Invoice,
} from "../../../../generated/graphql";
import { useCreateInvoiceMutation } from "../../../gql/create/vendor/vendor.generated";
import { useDeleteInvoiceMutation } from "../../../gql/delete/vendor/vendor.generated";
import {
  GetVendorPosQuery,
  useGetInvoiceQuery,
} from "../../../gql/get/vendor/vendor.generated";
import useCustomSnackbar from "../../../Utils/CustomSnackbar";
import UploadInvoice from "../UploadInvoice";

const UploadInvoiceModal = ({
  projectId,
  projectBidId,
  hasExistingInvoice,
  closeUploadInvoiceModal,
  getVendorPosRefetch,
}: {
  projectId: string | null;
  projectBidId: string | null;
  hasExistingInvoice: boolean;
  closeUploadInvoiceModal: () => void;
  getVendorPosRefetch: (
    variables?:
      | Partial<
          Exact<{
            data: GetVendorPosInput;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<GetVendorPosQuery>>;
}) => {
  const intl = useIntl();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  const [invoiceId, setInvoiceId] = useState<string | null>(null);
  const [invoiceFile, setInvoiceFile] = useState<Invoice | null>(null);

  const [
    createInvoice,
    { loading: createInvoiceLoading, error: createInvoiceError },
  ] = useCreateInvoiceMutation();

  const [
    deleteInvoice,
    { loading: deleteInvoiceLoading, error: deleteInvoiceError },
  ] = useDeleteInvoiceMutation();

  useEffect(() => {
    if (createInvoiceError) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [createInvoiceError]);

  const cancelOnClick = () => {
    if (invoiceFile) {
      deleteInvoice({
        variables: {
          data: {
            fileId: invoiceFile.fileId,
          },
        },
      });
    }
    closeUploadInvoiceModal();
  };

  const createOnClick = async () => {
    if (!projectId || !projectBidId || !invoiceId) {
      return;
    }

    await createInvoice({
      variables: {
        data: {
          projectId,
          projectBidId,
          invoiceId,
        },
      },
    });

    setSnackbar({
      message: intl.formatMessage({
        id: "app.vendor.poInvoice.create.success",
      }),
      severity: "success",
    });
    setSnackbarOpen(true);
    closeUploadInvoiceModal();
    getVendorPosRefetch();
  };
  return (
    <>
      <Box>
        <Box display="flex" alignItems="center">
          <Typography variant="subtitle2">Upload Invoice</Typography>
          <UploadInvoice
            setInvoiceId={setInvoiceId}
            setInvoiceFile={setInvoiceFile}
          />
        </Box>
        {!!invoiceFile && (
          <Link href={invoiceFile.url} target="_blank" rel="noopener">
            {invoiceFile.filename}
          </Link>
        )}
        {hasExistingInvoice && (
          <Box>
            <Typography variant="caption">
              Creating a new Invoice will overwrite the existing one.
            </Typography>
          </Box>
        )}
      </Box>
      <DialogActions>
        <Button variant="outlined" onClick={cancelOnClick}>
          {intl.formatMessage({ id: "app.general.cancel" })}
        </Button>
        <LoadingButton
          variant="contained"
          onClick={createOnClick}
          disabled={!projectId || !projectBidId || !invoiceId}
          loading={createInvoiceLoading}
        >
          {intl.formatMessage({ id: "app.general.create" })}
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default UploadInvoiceModal;
