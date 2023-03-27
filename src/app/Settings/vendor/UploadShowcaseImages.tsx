import {
  Box,
  Button,
  Container,
  Dialog,
  IconButton,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import {
  useGetCertificationsQuery,
  useGetProductImagesQuery,
} from "../../gql/get/vendor/vendor.generated";
import { AuthContext } from "../../../context/AuthContext";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import AttachmentButton from "../../Utils/AttachmentButton";
import { openLink } from "../../Utils/openLink";
import FullScreenLoading from "../../Utils/Loading";
import UploadCertButton from "./UploadCertButton";
import { FileFragmentFragment } from "../../gql/utils/common/file.generated";
import UploadCertModal from "./modals/UploadCertModal";
import { Delete, InfoOutlined } from "@mui/icons-material";
import {
  useDeleteCertificationsMutation,
  useDeleteProductImagesMutation,
} from "../../gql/delete/vendor/vendor.generated";
import UploadShowcaseImageModal from "./modals/UploadShowcaseImageModal";
import {
  ALL_PRODUCT_NAMES,
  productValueToLabelMap,
} from "../../constants/products";

const UploadShowcaseImages = () => {
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedProductType, setSelectedProductType] = useState<string | null>(
    null
  );

  const { loading, data, error, refetch } = useGetProductImagesQuery({
    variables: {
      data: {
        companyId: user!.companyId,
      },
    },
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });

  const [
    deleteImage,
    {
      loading: deleteImageLoading,
      data: deleteImageData,
      error: deleteImageError,
    },
  ] = useDeleteProductImagesMutation();

  useEffect(() => {
    if (error || deleteImageError) {
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({ id: "app.general.network.error" }),
      });
      setSnackbarOpen(true);
    }
  }, [error, deleteImageError]);

  useEffect(() => {
    if (deleteImageData) {
      setSnackbar({
        severity: "success",
        message: intl.formatMessage({ id: "app.general.network.success" }),
      });
      setSnackbarOpen(true);
    }
  }, [deleteImageData]);

  const refetchImages = () => {
    refetch();
  };

  const deleteImageOnClick = async (id: string) => {
    await deleteImage({
      variables: {
        data: {
          fileIds: [id],
        },
      },
      onCompleted() {
        refetch();
      },
    });
  };
  const renderProductsDropdown = () => {
    return (
      <Select
        sx={{ width: 250, mr: 2 }}
        value={selectedProductType}
        labelId="vendor-settings-showcase-image-select"
        onChange={(e) => setSelectedProductType(e.target.value)}
      >
        {ALL_PRODUCT_NAMES.map((product) => {
          return (
            <MenuItem value={product.value}>
              <Typography variant="caption">
                {intl.formatMessage({ id: product.labelId })}
              </Typography>
            </MenuItem>
          );
        })}
      </Select>
    );
  };

  const isLoading = deleteImageLoading || loading;
  return (
    <Container>
      {isLoading && <FullScreenLoading />}
      <Box>
        <Typography variant="h6">
          {intl.formatMessage({
            id: "app.settings.companySettings.uploadShowcaseImages",
          })}
        </Typography>
      </Box>
      <Box p={2} sx={{ display: "flex", alignItems: "center" }}>
        <InfoOutlined fontSize="small" color="info" sx={{ mr: 1 }} />
        <Typography variant="caption" whiteSpace="pre-line">
          {intl.formatMessage({
            id: "app.settings.companySettings.uploadShowcaseImages.helperText",
          })}
        </Typography>
      </Box>
      <Box mt={2} mb={2}>
        {renderProductsDropdown()}
        <Button
          variant="outlined"
          onClick={() => setUploadModalOpen(true)}
          disabled={!selectedProductType}
        >
          {intl.formatMessage({ id: "app.general.upload" })}
        </Button>
      </Box>
      <Box>
        {data && (
          <List sx={{ maxHeight: "24rem", overflowY: "scroll" }}>
            {data.getProductImages.map((image) => {
              return (
                <ListItem
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    ":hover": {
                      backgroundColor: "#f5f5f5",
                    },
                    borderRadius: "8px",
                  }}
                >
                  <Box sx={{ flexBasis: "33%" }}>
                    <Typography variant="caption">
                      {intl.formatMessage({
                        id: productValueToLabelMap[image.productType].labelId,
                      })}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      flexBasis: "33%",
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <AttachmentButton
                      label={image.filename}
                      onClick={() => openLink(image.url)}
                    />
                  </Box>
                  <IconButton onClick={() => deleteImageOnClick(image.fileId)}>
                    <Delete color="error" />
                  </IconButton>
                </ListItem>
              );
            })}
          </List>
        )}
      </Box>
      <Dialog open={uploadModalOpen} maxWidth="sm" fullWidth>
        <UploadShowcaseImageModal
          cancelOnClick={() => setUploadModalOpen(false)}
          refetchImages={refetchImages}
          productType={selectedProductType!}
        />
      </Dialog>
    </Container>
  );
};

export default UploadShowcaseImages;
