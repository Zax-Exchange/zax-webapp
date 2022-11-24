import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Button,
  DialogActions,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { AuthContext } from "../../../../context/AuthContext";
import {
  CustomerProjectOverview,
  ProjectBidForPo,
  ProjectPermission,
  PurchaseOrder,
} from "../../../../generated/graphql";
import { useCreatePurchaseOrderMutation } from "../../../gql/create/customer/customer.generated";
import { useDeletePurchaseOrderMutation } from "../../../gql/delete/customer/customer.generated";
import { useGetProjectBidsForPoLazyQuery } from "../../../gql/get/bid/bid.generated";
import {
  useGetCustomerProjectsQuery,
  useGetPurchaseOrderLazyQuery,
} from "../../../gql/get/customer/customer.generated";
import useCustomSnackbar from "../../../Utils/CustomSnackbar";
import UploadPO from "../UploadPO";

const UploadPOModal = ({
  setUploadCreatePOModal,
}: {
  setUploadCreatePOModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const [purchaseOrderId, setPurchaseOrderId] = useState<string | null>(null);
  const [purchaseOrderFile, setPurchaseOrderFile] =
    useState<PurchaseOrder | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [projectBidId, setProjectBidId] = useState<string | null>(null);

  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  const [createPO, { loading: createPOLoading, error: createPOError }] =
    useCreatePurchaseOrderMutation();

  const [deletePO, { loading: deletePOLoading, error: deletePOError }] =
    useDeletePurchaseOrderMutation();

  const {
    data: getCustomerProjectsData,
    loading: getCustomerProjectsLoading,
    error: getCustomerProjectsError,
  } = useGetCustomerProjectsQuery({
    variables: {
      data: {
        userId: user!.id,
        permissions: [ProjectPermission.Editor, ProjectPermission.Owner],
      },
    },
  });

  const [
    getProjectBidsForPo,
    {
      loading: getProjectBidsForPoLoading,
      error: getProjectBidsForPoError,
      data: getProjectBidsForPoData,
    },
  ] = useGetProjectBidsForPoLazyQuery();

  const [getPO, { loading: getPOLoading, error: getPOError, data: getPOData }] =
    useGetPurchaseOrderLazyQuery();

  useEffect(() => {
    if (projectId) {
      getProjectBidsForPo({
        variables: {
          data: {
            projectId,
          },
        },
      });
    }
  }, [projectId]);

  useEffect(() => {
    if (projectId && projectBidId) {
      getPO({
        variables: {
          data: {
            projectId,
            projectBidId,
          },
        },
      });
    }
  }, [projectId, projectBidId]);

  useEffect(() => {
    if (getPOData) {
    }
  }, [getPOData]);

  useEffect(() => {
    if (createPOError || getCustomerProjectsError || getProjectBidsForPoError) {
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({
          id: "app.general.network.error",
        }),
      });
      setSnackbarOpen(true);
    }
  }, [createPOError, getCustomerProjectsError, getProjectBidsForPoError]);

  const createPurchaseOrder = async () => {
    if (!purchaseOrderId || !projectId || !projectBidId) return;

    await createPO({
      variables: {
        data: {
          purchaseOrderId,
          projectId,
          projectBidId,
        },
      },
    });
    closeModal();
  };

  const deletePurchaseOrderFile = async () => {
    if (!purchaseOrderId) return;

    await deletePO({
      variables: {
        data: {
          fileId: purchaseOrderId,
        },
      },
    });
  };

  const cancelCreatePurchaseOrder = async () => {
    if (purchaseOrderFile) {
      deletePurchaseOrderFile();
    }
    closeModal();
  };

  const closeModal = () => {
    setUploadCreatePOModal(false);
  };
  return (
    <>
      <Box mb={3}>
        <Box>
          <Typography variant="subtitle2">select project</Typography>
        </Box>
        <Box>
          <Autocomplete
            openOnFocus
            options={
              getCustomerProjectsData?.getCustomerProjects as CustomerProjectOverview[]
            }
            getOptionLabel={(option) => option.name}
            autoComplete
            onChange={(e, v) => {
              if (!v) {
                setProjectId(null);
              } else {
                setProjectId(v.id);
              }
              setProjectBidId(null);
            }}
            renderInput={(params) => {
              return <TextField {...params} />;
            }}
          />
        </Box>
      </Box>

      <Box mb={3}>
        <Box>
          <Typography variant="subtitle2">select vendor</Typography>
        </Box>
        <Box>
          <Autocomplete
            openOnFocus
            disabled={!getProjectBidsForPoData || !projectId}
            options={
              getProjectBidsForPoData?.getProjectBidsForPo as ProjectBidForPo[]
            }
            getOptionLabel={(option) => option.companyName}
            autoComplete
            onChange={(e, v) => {
              if (!v) {
                setProjectBidId(null);
                return;
              }
              setProjectBidId(v.projectBidId);
            }}
            renderInput={(params) => {
              return <TextField {...params} />;
            }}
          />
        </Box>
      </Box>

      <Box mb={3}>
        <Box display="flex" alignItems="center">
          <Typography variant="subtitle2">Upload PO</Typography>
          <UploadPO
            setPurchaseOrderFile={setPurchaseOrderFile}
            setPurchaseOrderId={setPurchaseOrderId}
          />
        </Box>
        {!!purchaseOrderFile && (
          <Link href={purchaseOrderFile.url} target="_blank" rel="noopener">
            {purchaseOrderFile.filename}
          </Link>
        )}
        {getPOData && getPOData.getPurchaseOrder && (
          <Typography>
            Creating a new PO will overwrite the existing one and void the
            associating invoice.
          </Typography>
        )}
      </Box>

      <DialogActions>
        <Button variant="outlined" onClick={cancelCreatePurchaseOrder}>
          {intl.formatMessage({ id: "app.general.cancel" })}
        </Button>
        <LoadingButton
          variant="contained"
          onClick={createPurchaseOrder}
          disabled={!projectId || !projectBidId || !purchaseOrderId}
          loading={createPOLoading}
        >
          {intl.formatMessage({ id: "app.general.create" })}
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default UploadPOModal;
