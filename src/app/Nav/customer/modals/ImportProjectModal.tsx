import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { CustomerProjectOverview } from "../../../../generated/graphql";
import { CUSTOMER_ROUTES } from "../../../constants/loggedInRoutes";
import { useGetCustomerProjectsQuery } from "../../../gql/get/customer/customer.generated";
import useCustomSnackbar from "../../../Utils/CustomSnackbar";

const ImportProjectModal = ({
  closeModal,
  newProjectOnClose,
}: {
  closeModal: () => void;
  newProjectOnClose: () => void;
}) => {
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const navigate = useNavigate();
  const intl = useIntl();
  const [selectedProjectForImport, setSelectProjectForImport] =
    useState<CustomerProjectOverview | null>(null);

  const {
    data: projectsData,
    loading: projectsLoading,
    error: projectsError,
  } = useGetCustomerProjectsQuery({
    variables: {
      data: {
        userId: user!.id,
      },
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (projectsError) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [projectsError]);

  const navigateToAdvanceCreateProject = (projectId: string) => {
    navigate(CUSTOMER_ROUTES.ADVANCED_CREATE_PROJECT, {
      state: {
        projectId,
      },
    });
    closeModal();
    newProjectOnClose();
  };

  return (
    <>
      <DialogTitle>
        {intl.formatMessage({
          id: "app.customer.createProject.importFromExisting",
        })}
      </DialogTitle>
      <DialogContent>
        <Box>
          <Autocomplete
            loading={projectsLoading}
            openOnFocus
            options={projectsData ? projectsData.getCustomerProjects : []}
            getOptionLabel={(option) => option.name}
            autoComplete
            onChange={(e, v) => {
              if (!v) {
                setSelectProjectForImport(null);
                return;
              }
              setSelectProjectForImport(v);
            }}
            renderInput={(params) => {
              return <TextField {...params} />;
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={() => {
            closeModal();
          }}
        >
          {intl.formatMessage({ id: "app.general.cancel" })}
        </Button>
        <Button
          disabled={!selectedProjectForImport}
          variant="outlined"
          onClick={() =>
            navigateToAdvanceCreateProject(selectedProjectForImport!.id)
          }
        >
          {intl.formatMessage({ id: "app.general.confirm" })}
        </Button>
      </DialogActions>
    </>
  );
};

export default ImportProjectModal;
