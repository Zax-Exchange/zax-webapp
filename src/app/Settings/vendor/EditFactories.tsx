import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { AuthContext } from "../../../context/AuthContext";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import {
  useGetVendorDetailQuery,
  useGetVendorFactoriesQuery,
} from "../../gql/get/vendor/vendor.generated";
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
import { FactoryDetail } from "../../../generated/graphql";
import { CreateOrEditFactoryModal } from "./modals/CreateOrEditFactoryModal";
import { Delete, Edit } from "@mui/icons-material";
import { useDeleteFactoryMutation } from "../../gql/delete/vendor/vendor.generated";
import FullScreenLoading from "../../Utils/Loading";

const EditFactories = () => {
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [selectedFactory, setSelectedFactory] = useState<FactoryDetail | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [factories, setFactories] = useState<FactoryDetail[]>([]);

  const { data, loading, error, refetch } = useGetVendorFactoriesQuery({
    variables: {
      data: {
        vendorCompanyId: user!.companyId,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const [
    deleteMutation,
    {
      loading: deleteMutationLoading,
      error: deleteMutationError,
      data: deleteMutationData,
    },
  ] = useDeleteFactoryMutation();

  useEffect(() => {
    if (data && data.getVendorFactories) {
      setFactories(data.getVendorFactories);
    }
  }, [data]);

  useEffect(() => {
    if (deleteMutationData) {
      setSnackbar({
        severity: "success",
        message: intl.formatMessage({ id: "app.general.network.success" }),
      });
      setSnackbarOpen(true);
    }
  }, [deleteMutationData]);

  useEffect(() => {
    if (error || deleteMutationError) {
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({ id: "app.general.network.error" }),
      });
      setSnackbarOpen(true);
    }
  }, [error, deleteMutationError]);

  const editFactory = (factory: FactoryDetail) => {
    setSelectedFactory(factory);
    setModalOpen(true);
  };

  const deleteFactory = async (id: string) => {
    await deleteMutation({
      variables: {
        data: {
          id,
          companyId: user!.companyId,
        },
      },
    });
    refetchFactories();
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedFactory(null);
  };

  const refetchFactories = () => {
    refetch();
  };
  const isLoading = loading || deleteMutationLoading;
  return (
    <Container sx={{ position: "relative" }}>
      <Box>
        <Typography variant="h6">
          {intl.formatMessage({
            id: "app.settings.companySettings.editFactories",
          })}
        </Typography>
      </Box>
      {isLoading && <FullScreenLoading />}
      <Box sx={{ position: "absolute", top: 0, right: 16 }}>
        <Button onClick={() => setModalOpen(true)} variant="outlined">
          {intl.formatMessage({ id: "app.general.create" })}
        </Button>
      </Box>
      {!!factories.length && (
        <List sx={{ mt: 3 }}>
          {factories.map((factory) => {
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
                <Typography variant="subtitle2">{factory.location}</Typography>
                <Box>
                  <IconButton onClick={() => editFactory(factory)}>
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton onClick={() => deleteFactory(factory.id)}>
                    <Delete color="error" />
                  </IconButton>
                </Box>
              </ListItem>
            );
          })}
        </List>
      )}
      <Dialog open={modalOpen} onClose={closeModal} maxWidth="md" fullWidth>
        <CreateOrEditFactoryModal
          factory={selectedFactory}
          closeModal={closeModal}
          refetchFactories={refetchFactories}
        />
      </Dialog>
    </Container>
  );
};

export default EditFactories;
