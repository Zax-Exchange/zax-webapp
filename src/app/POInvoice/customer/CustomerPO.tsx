import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  Link,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
  const {
    loading: getCustomerPosLoading,
    data: getCustomerPosData,
    error: getCustomerPosError,
  } = useGetCustomerPosQuery({
    variables: {
      data: {
        userId: user!.id,
      },
    },
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
        {!!getCustomerPosData &&
          getCustomerPosData.getCustomerPos.map((customerPO) => {
            return (
              <TableContainer>
                <TableHead>
                  <TableRow>
                    <TableCell>{customerPO.projectInfo.projectName}</TableCell>
                    <TableCell>PO</TableCell>
                    <TableCell>Invoice</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customerPO.poDetails?.map((poDetail) => {
                    return (
                      <TableRow>
                        <TableCell>{poDetail.vendorInfo.companyName}</TableCell>
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
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </TableContainer>
            );
          })}
      </Box>
      <Dialog
        open={openUploadPOModal}
        onClose={() => setUploadCreatePOModal(false)}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogContent>
          <UploadPOModal setUploadCreatePOModal={setUploadCreatePOModal} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default CustomerPO;
