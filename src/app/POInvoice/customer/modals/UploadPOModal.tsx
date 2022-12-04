import { ApolloQueryResult } from "@apollo/client";
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
  Exact,
  GetCustomerPosInput,
  ProjectBidForPo,
  ProjectPermission,
  PurchaseOrder,
} from "../../../../generated/graphql";
import { useCreatePurchaseOrderMutation } from "../../../gql/create/customer/customer.generated";
import { useDeletePurchaseOrderMutation } from "../../../gql/delete/customer/customer.generated";
import { useGetProjectBidsForPoLazyQuery } from "../../../gql/get/bid/bid.generated";
import {
  GetCustomerPosQuery,
  useGetCustomerProjectsQuery,
  useGetPurchaseOrderLazyQuery,
} from "../../../gql/get/customer/customer.generated";
import AttachmentButton from "../../../Utils/AttachmentButton";
import useCustomSnackbar from "../../../Utils/CustomSnackbar";
import { openLink } from "../../../Utils/openLink";
import UploadPO from "../UploadPO";

const UploadPOModal = ({
  closeUploadPOModal,
  getCustomerPosRefetch,
  defaultProjectId,
  defaultProjectBidId,
}: {
  closeUploadPOModal: () => void;
  getCustomerPosRefetch: (
    variables?:
      | Partial<
          Exact<{
            data: GetCustomerPosInput;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<GetCustomerPosQuery>>;
  defaultProjectId: string | null;
  defaultProjectBidId: string | null;
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

  const [existingPO, setExistingPO] = useState<PurchaseOrder | null>(null);

  const {
    data: getCustomerProjectsData,
    loading: getCustomerProjectsLoading,
    error: getCustomerProjectsError,
  } = useGetCustomerProjectsQuery({
    variables: {
      data: {
        userId: user!.id,
        // permissions: [ProjectPermission.Editor, ProjectPermission.Owner],
      },
    },
    fetchPolicy: "no-cache",
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
      try {
        getProjectBidsForPo({
          variables: {
            data: {
              projectId,
            },
          },
          fetchPolicy: "no-cache",
        });
      } catch (error) {}
    }
  }, [projectId]);

  useEffect(() => {
    if (projectId && projectBidId) {
      try {
        getPO({
          variables: {
            data: {
              projectId,
              projectBidId,
            },
          },
          fetchPolicy: "network-only",
        });
      } catch (error) {}
    }
  }, [projectId, projectBidId]);

  useEffect(() => {
    if (defaultProjectId && defaultProjectBidId) {
      setProjectId(defaultProjectId);
      setProjectBidId(defaultProjectBidId);
    }
  }, [defaultProjectId, defaultProjectBidId]);

  useEffect(() => {
    if (getPOData) {
      setExistingPO(getPOData.getPurchaseOrder || null);
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
    getCustomerPosRefetch();
    setSnackbar({
      severity: "success",
      message: intl.formatMessage({
        id: "app.customer.poInvoice.createSuccess",
      }),
    });
    setSnackbarOpen(true);
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
    closeUploadPOModal();
  };

  const getVendor = () => {
    if (projectBidId && getProjectBidsForPoData) {
      return getProjectBidsForPoData.getProjectBidsForPo.find(
        (p) => p.projectBidId === projectBidId
      );
    }
    return null;
  };

  const getProject = () => {
    if (projectId && getCustomerProjectsData) {
      return getCustomerProjectsData.getCustomerProjects.find(
        (p) => p.id === projectId
      );
    }
    return null;
  };

  return (
    <>
      <Box mb={3}>
        <Box>
          <Typography variant="subtitle2">
            {intl.formatMessage({ id: "app.customer.poInvoice.selectProject" })}
          </Typography>
        </Box>
        <Box>
          <Autocomplete
            openOnFocus
            options={
              getCustomerProjectsData?.getCustomerProjects as CustomerProjectOverview[]
            }
            getOptionLabel={(option) => option.name}
            value={getProject()}
            autoComplete
            onChange={(e, v) => {
              if (!v) {
                setProjectId(null);
                setExistingPO(null);
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
          {intl.formatMessage({ id: "app.customer.poInvoice.selectVendor" })}
          <Typography variant="subtitle2"></Typography>
        </Box>
        <Box>
          {!!getProjectBidsForPoData && (
            <Autocomplete
              disabled={!projectId}
              openOnFocus
              options={
                getProjectBidsForPoData.getProjectBidsForPo as ProjectBidForPo[]
              }
              value={getVendor()}
              getOptionLabel={(option) => option.companyName}
              autoComplete
              onChange={(e, v) => {
                if (!v) {
                  setProjectBidId(null);
                  setExistingPO(null);
                  return;
                }
                setProjectBidId(v.projectBidId);
              }}
              renderInput={(params) => {
                return <TextField {...params} />;
              }}
            />
          )}
          {!getProjectBidsForPoData && (
            <Autocomplete
              openOnFocus
              disabled={true}
              options={[]}
              renderInput={(params) => {
                return <TextField {...params} />;
              }}
            />
          )}
        </Box>
      </Box>

      <Box mb={3}>
        <Box display="flex" alignItems="center">
          <Typography variant="subtitle2">
            {intl.formatMessage({ id: "app.customer.poInvoice.uploadPO" })}
          </Typography>
          <UploadPO
            setPurchaseOrderFile={setPurchaseOrderFile}
            setPurchaseOrderId={setPurchaseOrderId}
          />
        </Box>
        {!!purchaseOrderFile && (
          <AttachmentButton
            label={purchaseOrderFile.filename}
            onClick={() => openLink(purchaseOrderFile.url)}
          />
        )}
        {!!existingPO && (
          <Box>
            <Typography variant="caption">
              {intl.formatMessage({
                id: "app.customer.poInvoice.uploadAnother.helperText",
              })}
            </Typography>
          </Box>
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
