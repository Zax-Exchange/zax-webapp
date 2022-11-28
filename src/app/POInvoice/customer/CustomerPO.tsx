import { ChangeCircleOutlined } from "@mui/icons-material";
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
import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { AuthContext } from "../../../context/AuthContext";
import { useGetCustomerPosQuery } from "../../gql/get/customer/customer.generated";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import UploadPOModal from "./modals/UploadPOModal";

const CustomerPO = () => {
  const { user } = useContext(AuthContext);
  const intl = useIntl();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
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
  return (
    <Container>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Box>
          <Typography variant="h6">PO / Invoice</Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            onClick={() => setUploadCreatePOModal(true)}
          >
            {intl.formatMessage({ id: "app.customer.poInvoice.create" })}
          </Button>
        </Box>
      </Box>
      <Box>
        {getCustomerPosLoading && <CircularProgress />}
        {!!getCustomerPosData && !!getCustomerPosData.getCustomerPos.length && (
          <TableContainer>
            <TableHead>
              <TableRow>
                <TableCell>Project Name</TableCell>
                <TableCell>Vendor Name</TableCell>
                <TableCell>Purchase Order</TableCell>
                <TableCell>Invoice</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getCustomerPosData.getCustomerPos.map((customerPO) => {
                return (
                  <>
                    {customerPO.poDetails?.map((poDetail) => {
                      return (
                        <TableRow>
                          <TableCell>
                            {customerPO.projectInfo.projectName}
                          </TableCell>
                          <TableCell>
                            {poDetail.vendorInfo.companyName}
                          </TableCell>
                          <TableCell>
                            <Link
                              href={poDetail.poFile.url}
                              target="_blank"
                              rel="noopener"
                            >
                              {poDetail.poFile.filename}
                            </Link>
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
      <Dialog
        open={openUploadPOModal}
        onClose={closeUploadPOModal}
        maxWidth="md"
        fullWidth={true}
      >
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
