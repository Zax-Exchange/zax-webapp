import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useIntl } from "react-intl";
import { Target } from "../../../type/common";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { GenericFile, PurchaseOrder } from "../../../generated/graphql";
import { useUploadPurchaseOrderMutation } from "../../gql/upload/customer/uploadPurchaseOrder.generated";
import { useUploadCertificationMutation } from "../../gql/upload/vendor/uploadCertification.generated";
import { AuthContext } from "../../../context/AuthContext";
import { useUploadProductImageMutation } from "../../gql/upload/vendor/uploadProductImage.generated";

const UploadShowcaseImageButton = ({
  setImagesList,
  setIsUploading,
}: {
  setImagesList: React.Dispatch<React.SetStateAction<GenericFile[]>>;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [mutate, { error, loading, data }] = useUploadProductImageMutation();

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
          id: "app.general.network.success",
        }),
      });
      setSnackbarOpen(true);
    }
  }, [error, data]);

  useEffect(() => {
    setIsUploading(loading);
  }, [loading]);

  const onUpload = async ({ target }: { target: Target }) => {
    if (!target.files) return;
    const file = target.files[0];
    target.value = "";

    try {
      if (file.type.substring(0, 5) !== "image") {
        throw new Error("invalid file type");
      }
      const uploadResult = await mutate({
        variables: { file },
        fetchPolicy: "no-cache",
      });
      const imageFile = uploadResult.data?.uploadProductImage;
      if (imageFile) {
        setImagesList((prev) => [...prev, imageFile]);
      }
    } catch (e) {
      // invalid file type
      if ((e as Error).message === "invalid file type") {
        setSnackbar({
          severity: "error",
          message: intl.formatMessage({
            id: "app.customer.createProject.upload.fileTypeError",
          }),
        });
      } else {
        setSnackbar({
          severity: "error",
          message: intl.formatMessage({
            id: "app.general.network.error",
          }),
        });
      }
      setSnackbarOpen(true);
    }
  };

  return (
    <IconButton component="label" sx={{ borderRadius: 40 }} color="primary">
      {!loading && (
        <input
          hidden
          type="file"
          onChange={onUpload}
          accept="image/jpeg, image/png"
        />
      )}
      {loading && <CircularProgress size={24} />}
      {!loading && <CloudUploadIcon />}
    </IconButton>
  );
};

export default UploadShowcaseImageButton;
