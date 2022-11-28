import { ChangeCircleOutlined, CloudUploadOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  IconButton,
  Link,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { AuthContext } from "../../../context/AuthContext";
import { Invoice } from "../../../generated/graphql";
import { useGetVendorPosQuery } from "../../gql/get/vendor/vendor.generated";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import UploadInvoiceModal from "./modals/UploadInvoiceModal";

const VendorPO = () => {
  const { user } = useContext(AuthContext);
  const intl = useIntl();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [uploadInvoiceModalOpen, setUploadInvoiceMoodalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [selectedProjectBidId, setSelectedProjectBidId] = useState<
    string | null
  >(null);

  const [hasExistingInvoice, setHasExistingInvoice] = useState(false);

  const {
    loading: getVendorPosLoading,
    data: getVendorPosData,
    error: getVendorPosError,
    refetch: getVendorPosRefetch,
  } = useGetVendorPosQuery({
    variables: {
      data: {
        userId: user!.id,
      },
    },
    fetchPolicy: "no-cache",
  });

  const createInvoiceOnClick = (
    projectId: string,
    projectBidId: string,
    hasExistingInvoice: boolean = false
  ) => {
    setSelectedProjectId(projectId);
    setSelectedProjectBidId(projectBidId);
    setHasExistingInvoice(hasExistingInvoice);
    setUploadInvoiceMoodalOpen(true);
  };

  const closeUploadInvoiceModal = () => {
    setUploadInvoiceMoodalOpen(false);
    setSelectedProjectId(null);
    setSelectedProjectBidId(null);
  };

  return (
    <Container>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Box>
          <Typography variant="h6">PO / Invoice</Typography>
        </Box>
      </Box>
      <Box>
        {getVendorPosLoading && <CircularProgress />}
        {!!getVendorPosData && !!getVendorPosData.getVendorPos.length && (
          <TableContainer>
            <TableHead>
              <TableRow>
                <TableCell>Customer Name</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Purchase Order</TableCell>
                <TableCell>Invoice</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getVendorPosData.getVendorPos.map((vendorPO) => {
                return (
                  <>
                    {vendorPO.poDetails?.map((poDetail) => {
                      return (
                        <TableRow>
                          <TableCell>
                            {poDetail.customerInfo.companyName}
                          </TableCell>
                          <TableCell>
                            {vendorPO.projectInfo.projectName}
                          </TableCell>
                          <TableCell>
                            <Link
                              href={poDetail.poFile.url}
                              target="_blank"
                              rel="noopener"
                            >
                              {poDetail.poFile.filename}
                            </Link>
                          </TableCell>
                          <TableCell>
                            {!!poDetail.invoiceFile && (
                              <Link
                                href={poDetail.invoiceFile.url}
                                target="_blank"
                                rel="noopener"
                              >
                                {poDetail.invoiceFile.filename}
                              </Link>
                            )}
                            {!!poDetail.invoiceFile && (
                              <IconButton
                                onClick={() =>
                                  createInvoiceOnClick(
                                    vendorPO.projectInfo.projectId,
                                    poDetail.projectBidId,
                                    true
                                  )
                                }
                              >
                                <Tooltip
                                  arrow
                                  title={intl.formatMessage({
                                    id: "app.vendor.poInvoice.uploadAnother.tooltip",
                                  })}
                                  placement="top"
                                >
                                  <ChangeCircleOutlined />
                                </Tooltip>
                              </IconButton>
                            )}
                            {!poDetail.invoiceFile && (
                              <IconButton
                                onClick={() =>
                                  createInvoiceOnClick(
                                    vendorPO.projectInfo.projectId,
                                    poDetail.projectBidId
                                  )
                                }
                              >
                                <Tooltip
                                  arrow
                                  title={intl.formatMessage({
                                    id: "app.vendor.poInvoice.upload.create",
                                  })}
                                  placement="top"
                                >
                                  <CloudUploadOutlined />
                                </Tooltip>
                              </IconButton>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                );
              })}
            </TableBody>
          </TableContainer>
        )}
      </Box>
      <Dialog open={uploadInvoiceModalOpen} maxWidth="md" fullWidth={true}>
        <DialogContent>
          <UploadInvoiceModal
            projectId={selectedProjectId}
            projectBidId={selectedProjectBidId}
            closeUploadInvoiceModal={closeUploadInvoiceModal}
            getVendorPosRefetch={getVendorPosRefetch}
            hasExistingInvoice={hasExistingInvoice}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default VendorPO;
