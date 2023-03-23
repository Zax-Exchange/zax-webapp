import React, { useContext, useEffect, useState } from "react";
import { GenericFile } from "../../../../generated/graphql";
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
import UploadCertButton from "../UploadCertButton";
import AttachmentButton from "../../../Utils/AttachmentButton";
import { openLink } from "../../../Utils/openLink";
import { LoadingButton } from "@mui/lab";
import { useCreateCertificationsMutation } from "../../../gql/create/vendor/vendor.generated";
import { AuthContext } from "../../../../context/AuthContext";
import useCustomSnackbar from "../../../Utils/CustomSnackbar";
import { useDeleteCertificationsMutation } from "../../../gql/delete/vendor/vendor.generated";

const UploadCertModal = ({
  cancelOnClick,
  refetchCerts,
}: {
  cancelOnClick: () => void;
  refetchCerts: () => void;
}) => {
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [certList, setCertList] = useState<GenericFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [
    createCerts,
    {
      loading: createCertsLoading,
      data: createCertsData,
      error: createCertsError,
    },
  ] = useCreateCertificationsMutation();
  const [
    deleteCerts,
    {
      loading: deleteCertsLoading,
      data: deleteCertsData,
      error: deleteCertsError,
    },
  ] = useDeleteCertificationsMutation();

  useEffect(() => {
    if (createCertsError || deleteCertsError) {
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({ id: "app.general.network.error" }),
      });
      setSnackbarOpen(true);
    }
  }, [createCertsError, deleteCertsError]);

  useEffect(() => {
    if (createCertsData) {
      setSnackbar({
        severity: "success",
        message: intl.formatMessage({ id: "app.general.network.success" }),
      });
      setSnackbarOpen(true);
      refetchCerts();
      cancelOnClick();
    }
  }, [createCertsData]);

  const createOnClick = async () => {
    await createCerts({
      variables: {
        data: {
          companyId: user!.companyId,
          fileIds: certList.map((cert) => cert.fileId),
        },
      },
    });
  };
  const deleteCertifications = async () => {
    await deleteCerts({
      variables: {
        data: {
          fileIds: certList.map((cert) => cert.fileId),
        },
      },
    });
  };
  const cancel = async () => {
    deleteCertifications();
    cancelOnClick();
  };

  return (
    <>
      <DialogContent>
        <Box>
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle2">
              {intl.formatMessage({
                id: "app.settings.companySettings.uploadCertifications",
              })}
            </Typography>
            <UploadCertButton
              setCertList={setCertList}
              setIsUploading={setIsUploading}
            />
          </Box>
          <Box>
            <List>
              {certList.map((cert) => {
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
          disabled={!certList.length || isUploading}
          loading={createCertsLoading}
        >
          {intl.formatMessage({ id: "app.general.create" })}
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default UploadCertModal;
