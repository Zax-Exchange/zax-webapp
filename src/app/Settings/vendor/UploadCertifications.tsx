import {
  Box,
  Button,
  Container,
  Dialog,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useGetCertificationsQuery } from "../../gql/get/vendor/vendor.generated";
import { AuthContext } from "../../../context/AuthContext";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import AttachmentButton from "../../Utils/AttachmentButton";
import { openLink } from "../../Utils/openLink";
import FullScreenLoading from "../../Utils/Loading";
import UploadCertButton from "./UploadCertButton";
import { FileFragmentFragment } from "../../gql/utils/common/file.generated";
import UploadCertModal from "./modals/UploadCertModal";
import { Delete } from "@mui/icons-material";
import { useDeleteCertificationsMutation } from "../../gql/delete/vendor/vendor.generated";

const UploadCertifications = () => {
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const { loading, data, error, refetch } = useGetCertificationsQuery({
    variables: {
      data: {
        companyId: user!.companyId,
      },
    },
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });

  const [
    deleteCert,
    {
      loading: deleteCertLoading,
      data: deleteCertData,
      error: deleteCertError,
    },
  ] = useDeleteCertificationsMutation();

  useEffect(() => {
    if (error || deleteCertError) {
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({ id: "app.general.network.error" }),
      });
      setSnackbarOpen(true);
    }
  }, [error, deleteCertError]);

  useEffect(() => {
    if (deleteCertData) {
      setSnackbar({
        severity: "success",
        message: intl.formatMessage({ id: "app.general.network.success" }),
      });
      setSnackbarOpen(true);
    }
  }, [deleteCertData]);

  const refetchCerts = () => {
    refetch();
  };

  const deleteCertOnClick = async (id: string) => {
    await deleteCert({
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
  const isLoading = deleteCertLoading || loading;
  return (
    <Container>
      {isLoading && <FullScreenLoading />}
      <Box>
        <Typography variant="h6">
          {intl.formatMessage({
            id: "app.settings.companySettings.uploadCertifications",
          })}
        </Typography>
      </Box>
      <Box>
        <Typography variant="caption">
          {intl.formatMessage({
            id: "app.settings.companySettings.uploadCertifications.helperText",
          })}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={() => setUploadModalOpen(true)}>
          {intl.formatMessage({ id: "app.general.upload" })}
        </Button>
      </Box>
      <Box>
        {data && (
          <List>
            {data.getCertifications.map((cert) => {
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
                  <AttachmentButton
                    label={cert.filename}
                    onClick={() => openLink(cert.url)}
                  />
                  <IconButton onClick={() => deleteCertOnClick(cert.fileId)}>
                    <Delete />
                  </IconButton>
                </ListItem>
              );
            })}
          </List>
        )}
      </Box>
      <Dialog open={uploadModalOpen} maxWidth="sm" fullWidth>
        <UploadCertModal
          cancelOnClick={() => setUploadModalOpen(false)}
          refetchCerts={refetchCerts}
        />
      </Dialog>
    </Container>
  );
};

export default UploadCertifications;
