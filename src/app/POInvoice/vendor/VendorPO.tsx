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
  Paper,
  Table,
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
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { Invoice } from "../../../generated/graphql";
import { GENERAL_ROUTES } from "../../constants/loggedInRoutes";
import { useGetVendorPosQuery } from "../../gql/get/vendor/vendor.generated";
import AttachmentButton from "../../Utils/AttachmentButton";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import FullScreenLoading from "../../Utils/Loading";
import { openLink } from "../../Utils/openLink";
import UploadInvoiceModal from "./modals/UploadInvoiceModal";

const VendorPO = () => {
  const { user } = useContext(AuthContext);
  const intl = useIntl();
  const navigate = useNavigate();
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

  const projectNameOnClick = (projectId: string) => {
    const dest = GENERAL_ROUTES.PROJECT_DETAIL.split(":");

    dest[1] = projectId;

    navigate(`${dest.join("")}`);
  };

  return (
    <Container>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Box>
          <Typography variant="subtitle2">
            {intl.formatMessage({ id: "app.routes.loggedIn.poInvoice" })}
          </Typography>
        </Box>
      </Box>
      <Box>
        {getVendorPosLoading && <FullScreenLoading />}
        {!!getVendorPosData && !!getVendorPosData.getVendorPos.length && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" width="25%">
                    {intl.formatMessage({
                      id: "app.general.company.customerName",
                    })}
                  </TableCell>
                  <TableCell align="center" width="25%">
                    {intl.formatMessage({ id: "app.project.attribute.name" })}
                  </TableCell>
                  <TableCell align="center" width="25%">
                    {intl.formatMessage({
                      id: "app.general.purchaseOrder",
                    })}
                  </TableCell>
                  <TableCell align="center" width="25%">
                    {intl.formatMessage({
                      id: "app.general.invoice",
                    })}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getVendorPosData.getVendorPos.map((vendorPO) => {
                  return (
                    <>
                      {vendorPO.poDetails?.map((poDetail) => {
                        return (
                          <TableRow
                            sx={{ ":hover": { backgroundColor: "#fafafa" } }}
                          >
                            <TableCell align="center" width="25%">
                              {poDetail.customerInfo.companyName}
                            </TableCell>
                            <TableCell
                              align="center"
                              width="25%"
                              onClick={() =>
                                projectNameOnClick(
                                  vendorPO.projectInfo.projectId
                                )
                              }
                              sx={{
                                ":hover": {
                                  cursor: "pointer",
                                  backgroundColor: "#f2f2f2",
                                  fontWeight: 600,
                                },
                                borderRadius: "4px",
                              }}
                            >
                              {vendorPO.projectInfo.projectName}
                            </TableCell>
                            <TableCell align="center" width="25%">
                              <AttachmentButton
                                label={poDetail.poFile.filename}
                                onClick={() => openLink(poDetail.poFile.url)}
                              />
                              {/* <Typography>{poDetail.poFile.status}</Typography> */}
                            </TableCell>
                            <TableCell align="center" width="25%">
                              {!!poDetail.invoiceFile && (
                                <AttachmentButton
                                  label={poDetail.invoiceFile.filename}
                                  onClick={() =>
                                    openLink(poDetail.invoiceFile!.url)
                                  }
                                />
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
                              {/* {!!poDetail.invoiceFile && (
                                <Typography>
                                  {poDetail.invoiceFile.status}
                                </Typography>
                              )} */}
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
            </Table>
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
