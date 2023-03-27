import React, { useContext, useEffect, useState } from "react";
import { GenericFile, ProductImageFile } from "../../../../generated/graphql";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useIntl } from "react-intl";
import UploadShowcaseImageButton from "../UploadShowcaseImageButton";
import AttachmentButton from "../../../Utils/AttachmentButton";
import { openLink } from "../../../Utils/openLink";
import { LoadingButton } from "@mui/lab";
import {
  useCreateCertificationsMutation,
  useCreateProductImagesMutation,
} from "../../../gql/create/vendor/vendor.generated";
import { AuthContext } from "../../../../context/AuthContext";
import useCustomSnackbar from "../../../Utils/CustomSnackbar";
import {
  useDeleteCertificationsMutation,
  useDeleteProductImagesMutation,
} from "../../../gql/delete/vendor/vendor.generated";

const UploadShowcaseImageModal = ({
  cancelOnClick,
  refetchImages,
  productType,
}: {
  cancelOnClick: () => void;
  refetchImages: () => void;
  productType: string;
}) => {
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [imagesList, setImagesList] = useState<GenericFile[]>([]);

  const [isUploading, setIsUploading] = useState(false);
  const [
    createImages,
    {
      loading: createImagesLoading,
      data: createImagesData,
      error: createImagesError,
    },
  ] = useCreateProductImagesMutation();
  const [
    deleteImages,
    {
      loading: deleteImagesLoading,
      data: deleteImagesData,
      error: deleteImagesError,
    },
  ] = useDeleteProductImagesMutation();

  useEffect(() => {
    if (createImagesError || deleteImagesError) {
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({ id: "app.general.network.error" }),
      });
      setSnackbarOpen(true);
    }
  }, [createImagesError, deleteImagesError]);

  useEffect(() => {
    if (createImagesData) {
      setSnackbar({
        severity: "success",
        message: intl.formatMessage({ id: "app.general.network.success" }),
      });
      setSnackbarOpen(true);
      refetchImages();
      cancelOnClick();
    }
  }, [createImagesData]);

  const createOnClick = async () => {
    await createImages({
      variables: {
        data: {
          companyId: user!.companyId,
          fileIds: imagesList.map((cert) => cert.fileId),
          productType,
        },
      },
    });
  };
  const deleteImagesOnClick = async () => {
    await deleteImages({
      variables: {
        data: {
          fileIds: imagesList.map((cert) => cert.fileId),
        },
      },
    });
  };
  const cancel = async () => {
    deleteImagesOnClick();
    cancelOnClick();
  };

  return (
    <>
      <DialogContent>
        <Box>
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle2">
              {intl.formatMessage({
                id: "app.settings.companySettings.uploadShowcaseImages",
              })}
            </Typography>
            <UploadShowcaseImageButton
              setImagesList={setImagesList}
              setIsUploading={setIsUploading}
            />
          </Box>
          <Box>
            <List>
              {imagesList.map((cert) => {
                return (
                  <ListItem>
                    <AttachmentButton
                      label={cert.filename}
                      onClick={() => openLink(cert.url)}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ mr: 2, mb: 2 }}>
        <Button variant="outlined" onClick={cancel} disabled={isUploading}>
          {intl.formatMessage({ id: "app.general.cancel" })}
        </Button>
        <LoadingButton
          variant="contained"
          onClick={createOnClick}
          disabled={!imagesList.length || isUploading}
          loading={createImagesLoading}
        >
          {intl.formatMessage({ id: "app.general.create" })}
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default UploadShowcaseImageModal;
