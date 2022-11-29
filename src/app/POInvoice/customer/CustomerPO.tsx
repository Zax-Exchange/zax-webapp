import { AttachFile, ChangeCircleOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
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
import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import {
  GENERAL_ROUTES,
  CUSTOMER_ROUTES,
} from "../../constants/loggedInRoutes";
import { useGetCustomerPosQuery } from "../../gql/get/customer/customer.generated";
import AttachmentButton from "../../Utils/AttachmentButton";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import FullScreenLoading from "../../Utils/Loading";
import { openLink } from "../../Utils/openLink";
import UploadPOModal from "./modals/UploadPOModal";

const CustomerPO = () => {
  const { user } = useContext(AuthContext);
  const intl = useIntl();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const navigate = useNavigate();
  const [openUploadPOModal, setUploadCreatePOModal] = useState(false);
  const [defaultProjectId, setDefaultProjectId] = useState<string | null>(null);
  const [defaultProjectBidId, setDefaultProjectBidId] = useState<string | null>(
    null
  );

  const {
    loading: getCustomerPosLoading,
    data: getCustomerPosData,
    error: getCustomerPosError,
    refetch: getCustomerPosRefetch,
  } = useGetCustomerPosQuery({
    variables: {
      data: {
        userId: user!.id,
      },
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (getCustomerPosError) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [getCustomerPosError]);

  const uploadAnotherOnClick = (projectId: string, projectBidId: string) => {
    setDefaultProjectId(projectId);
    setDefaultProjectBidId(projectBidId);
    setUploadCreatePOModal(true);
  };

  const closeUploadPOModal = () => {
    setDefaultProjectId(null);
    setDefaultProjectBidId(null);
    setUploadCreatePOModal(false);
  };

  const projectNameOnClick = (projectId: string) => {
    const dest = GENERAL_ROUTES.PROJECT_DETAIL.split(":");

    dest[1] = projectId;

    navigate(`${dest.join("")}`);
  };

  const vendorNameOnClick = (companyId: string) => {
    const dest = CUSTOMER_ROUTES.VENDOR_PROFILE.split(":");

    dest[1] = companyId;

    navigate(`${dest.join("")}`);
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        mb={2}
      >
        <Box>
          <Typography variant="h6">
            {intl.formatMessage({ id: "app.routes.loggedIn.poInvoice" })}
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            onClick={() => setUploadCreatePOModal(true)}
          >
            {intl.formatMessage({ id: "app.customer.poInvoice.create" })}
          </Button>
        </Box>
      </Box>
      <Box>
        {getCustomerPosLoading && <FullScreenLoading />}
        {!!getCustomerPosData && !!getCustomerPosData.getCustomerPos.length && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" width="25%">
                    {intl.formatMessage({ id: "app.project.attribute.name" })}
                  </TableCell>
                  <TableCell align="center" width="25%">
                    {intl.formatMessage({
                      id: "app.general.company.vendorName",
                    })}
                  </TableCell>
                  <TableCell align="center" width="25%">
                    {intl.formatMessage({ id: "app.general.purchaseOrder" })}
                  </TableCell>
                  <TableCell align="center" width="25%">
                    {intl.formatMessage({ id: "app.general.invoice" })}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getCustomerPosData.getCustomerPos.map((customerPO) => {
                  return (
                    <>
                      {customerPO.poDetails?.map((poDetail) => {
                        return (
                          <TableRow>
                            <TableCell align="center" width="25%">
                              <Box
                                onClick={() =>
                                  projectNameOnClick(
                                    customerPO.projectInfo.projectId
                                  )
                                }
                                sx={{
                                  ":hover": {
                                    cursor: "pointer",
                                    backgroundColor: "#eee",
                                  },
                                  borderRadius: "4px",
                                }}
                              >
                                <Typography variant="caption">
                                  {customerPO.projectInfo.projectName}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell align="center" width="25%">
                              <Box
                                onClick={() =>
                                  vendorNameOnClick(
                                    poDetail.vendorInfo.companyId
                                  )
                                }
                                sx={{
                                  ":hover": {
                                    cursor: "pointer",
                                    backgroundColor: "#eee",
                                  },
                                  borderRadius: "4px",
                                }}
                              >
                                <Typography variant="caption">
                                  {poDetail.vendorInfo.companyName}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell align="center" width="25%">
                              <AttachmentButton
                                label={poDetail.poFile.filename}
                                onClick={() => openLink(poDetail.poFile.url)}
                              />

                              {/* <Typography>{poDetail.poFile.status}</Typography> */}
                              <IconButton
                                onClick={() =>
                                  uploadAnotherOnClick(
                                    customerPO.projectInfo.projectId,
                                    poDetail.projectBidId
                                  )
                                }
                              >
                                <Tooltip
                                  arrow
                                  title={intl.formatMessage({
                                    id: "app.customer.poInvoice.uploadAnother",
                                  })}
                                  placement="top"
                                >
                                  <ChangeCircleOutlined />
                                </Tooltip>
                              </IconButton>
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
                              {/* {!!poDetail.invoiceFile && (
                                <Typography>
                                  {poDetail.invoiceFile.status}
                                </Typography>
                              )} */}
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
      <Dialog open={openUploadPOModal} maxWidth="md" fullWidth={true}>
        <DialogContent>
          <UploadPOModal
            closeUploadPOModal={closeUploadPOModal}
            getCustomerPosRefetch={getCustomerPosRefetch}
            defaultProjectId={defaultProjectId}
            defaultProjectBidId={defaultProjectBidId}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default CustomerPO;
