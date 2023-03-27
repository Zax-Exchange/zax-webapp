import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import {
  useGetCertificationsQuery,
  useGetProductImagesQuery,
} from "../../gql/get/vendor/vendor.generated";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import {
  Box,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack5";
import AttachmentButton from "../../Utils/AttachmentButton";
import { GenericFile, ProductImageFile } from "../../../generated/graphql";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  OpenInNew,
} from "@mui/icons-material";
import { openLink } from "../../Utils/openLink";
import FullScreenLoading from "../../Utils/Loading";
import { productValueToLabelMap } from "../../constants/products";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ProductShowcaseTab = () => {
  const intl = useIntl();
  const { companyId } = useParams();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [productTypeToImagesMap, setProductTypeToImagesMap] = useState<Record<
    string,
    ProductImageFile[]
  > | null>(null);
  const [selectedProductType, setSelectedProductType] = useState<string | null>(
    null
  );

  const { loading, data, error } = useGetProductImagesQuery({
    variables: {
      data: {
        companyId: companyId || "",
      },
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (data && data.getProductImages.length) {
      const res: Record<string, ProductImageFile[]> = {};
      data.getProductImages.forEach((image) => {
        if (!res[image.productType]) {
          res[image.productType] = [];
        }
        res[image.productType].push(image);
      });
      setProductTypeToImagesMap(res);
      setSelectedProductType(Object.keys(res)[0]);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({ id: "app.general.network.error" }),
      });
      setSnackbarOpen(true);
    }
  }, [error]);

  const renderProductsDropdown = () => {
    if (!productTypeToImagesMap) return null;

    return (
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Typography variant="subtitle2">
          {intl.formatMessage({ id: "app.product.type" })}
        </Typography>
        <Select
          sx={{ width: 250, mt: 1, mb: 2 }}
          value={selectedProductType}
          labelId="vendor-profile-showcase-select"
          onChange={(e) => setSelectedProductType(e.target.value)}
        >
          {Object.keys(productTypeToImagesMap).map((product) => {
            return (
              <MenuItem value={product}>
                <Typography variant="caption">
                  {intl.formatMessage({
                    id: productValueToLabelMap[product].labelId,
                  })}
                </Typography>
              </MenuItem>
            );
          })}
        </Select>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {loading && <FullScreenLoading />}
      {!loading && data && !data.getProductImages.length && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            {intl.formatMessage({
              id: "app.vendorProfile.tab.productShowcase.noImage",
            })}
          </Typography>
        </Box>
      )}

      {!!productTypeToImagesMap && !!selectedProductType && (
        <Box>
          {renderProductsDropdown()}

          <ImageList sx={{ maxWidth: 500 }} variant="masonry" cols={3} gap={8}>
            {productTypeToImagesMap[selectedProductType].map((image) => (
              <ImageListItem
                key={image.fileId}
                sx={{
                  ":hover": { cursor: "pointer", filter: "brightness(90%)" },
                }}
                onClick={() => openLink(image.url)}
              >
                <img
                  src={`${image.url}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${image.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={image.filename}
                  loading="lazy"
                  style={{ borderRadius: "4px" }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      )}
    </Box>
  );
};

export default ProductShowcaseTab;
