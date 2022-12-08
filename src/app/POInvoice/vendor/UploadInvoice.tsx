import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { Target } from "../../../type/common";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Invoice, PurchaseOrder } from "../../../generated/graphql";
import { useUploadPurchaseOrderMutation } from "../../gql/upload/customer/uploadPurchaseOrder.generated";
import { useUploadInvoiceMutation } from "../../gql/upload/vendor/uploadInvoice.generated";

const UploadInvoice = ({
  setInvoiceId,
  setInvoiceFile,
}: {
  setInvoiceId: React.Dispatch<React.SetStateAction<string | null>>;
  setInvoiceFile: React.Dispatch<React.SetStateAction<Invoice | null>>;
}) => {
  const intl = useIntl();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [mutate, { error, loading, data }] = useUploadInvoiceMutation();

  useEffect(() => {
    // server error
    if (error) {
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({ id: "app.general.network.error" }),
      });
      setSnackbarOpen(true);
    }
    // upload success
    if (data) {
      setSnackbar({
        severity: "success",
        message: intl.formatMessage({
          id: "app.vendor.poInvoice.upload.success",
        }),
      });
      setSnackbarOpen(true);
    }
  }, [error, data]);

  const onUpload = async ({ target }: { target: Target }) => {
    if (!target.files) return;
    const file = target.files[0];
    target.value = "";

    try {
      const uploadResult = await mutate({
        variables: { file },
        fetchPolicy: "no-cache",
      });
      const invoiceFile = uploadResult.data?.uploadInvoice;

      if (invoiceFile) {
        setInvoiceFile(invoiceFile);
        setInvoiceId(invoiceFile.fileId);
      }
    } catch (e) {
      // invalid file type
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({
          id: "app.customer.createProject.upload.fileTypeError",
        }),
      });
      setSnackbarOpen(true);
    }
  };

  return (
    <Tooltip
      placement="top"
      arrow
      title={intl.formatMessage({
        id: "app.vendor.poInvoice.uploadInvoice.tooltip",
      })}
    >
      <IconButton component="label" sx={{ borderRadius: 40 }} color="primary">
        {!loading && <input hidden type="file" onChange={onUpload} />}
        {loading && <CircularProgress size={24} />}
        {!loading && <CloudUploadIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default UploadInvoice;