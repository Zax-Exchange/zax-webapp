import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { Target } from "../../../type/common";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { PurchaseOrder } from "../../../generated/graphql";
import { useUploadPurchaseOrderMutation } from "../../gql/upload/customer/uploadPurchaseOrder.generated";

const UploadPO = ({
  setPurchaseOrderId,
  setPurchaseOrderFile,
}: {
  setPurchaseOrderId: React.Dispatch<React.SetStateAction<string | null>>;
  setPurchaseOrderFile: React.Dispatch<
    React.SetStateAction<PurchaseOrder | null>
  >;
}) => {
  const intl = useIntl();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [mutate, { error, loading, data }] = useUploadPurchaseOrderMutation();

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
          id: "app.customer.poInvoice.uploadPO.success",
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
      if (file.type !== "application/pdf") {
        throw new Error(
          intl.formatMessage({
            id: "app.customer.createProject.upload.fileTypeError",
          })
        );
      }
      const uploadResult = await mutate({
        variables: { file },
        fetchPolicy: "no-cache",
      });
      const poFile = uploadResult.data?.uploadPurchaseOrder;

      if (poFile) {
        setPurchaseOrderFile(poFile);
        setPurchaseOrderId(poFile.fileId);
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
      title={intl.formatMessage({
        id: "app.customer.poInvoice.uploadPO.tooltip",
      })}
    >
      <IconButton component="label" sx={{ borderRadius: 40 }} color="primary">
        {!loading && (
          <input hidden type="file" onChange={onUpload} accept=".pdf" />
        )}
        {loading && <CircularProgress size={24} />}
        {!loading && <CloudUploadIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default UploadPO;
