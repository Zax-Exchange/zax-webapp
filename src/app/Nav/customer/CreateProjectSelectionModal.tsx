import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import {
  CustomerProjectOverview,
  ProjectOverview,
} from "../../../generated/graphql";
import { CUSTOMER_ROUTES } from "../../constants/loggedInRoutes";
import { useGetCustomerProjectsQuery } from "../../gql/get/customer/customer.generated";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import ReactGA from "react-ga4";
import {
  EVENT_ACTION,
  EVENT_CATEGORY,
  EVENT_LABEL,
} from "../../../analytics/constants";

enum ModalView {
  SELECTION_VIEW = "SELECTION_VIEW",
  IMPORT_VIEW = "IMPORT_VIEW",
}

const CreateProjectSelectionModal = ({
  createProjectSelectionModalOpen,
  setCreateProjectSelectionModalOpen,
}: {
  setCreateProjectSelectionModalOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  createProjectSelectionModalOpen: boolean;
}) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const intl = useIntl();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [currentView, setCurrentView] = useState(ModalView.SELECTION_VIEW);
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

  useEffect(() => {}, []);

  useEffect(() => {
    if (projectsError) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [projectsError]);

  const navigateToProjectCreationPage = (
    route:
      | CUSTOMER_ROUTES.ADVANCED_CREATE_PROJECT
      | CUSTOMER_ROUTES.GUIDED_CREATE_PROJECT
  ) => {
    navigate(route);
    setCreateProjectSelectionModalOpen(false);
  };

  // Default view, shows options for how project is going to be created.
  const renderSelectionView = () => {
    return (
      <>
        <DialogTitle>
          {intl.formatMessage({
            id: "app.customer.createProject.creationModeModalTitle",
          })}
        </DialogTitle>
        <DialogContent>
          <Box>
            <Box display="flex" justifyContent="space-around">
              <Button
                variant="outlined"
                onClick={() =>
                  navigateToProjectCreationPage(
                    CUSTOMER_ROUTES.GUIDED_CREATE_PROJECT
                  )
                }
              >
                {intl.formatMessage({
                  id: "app.customer.createProject.guidedCreate",
                })}
              </Button>

              <Button
                variant="outlined"
                onClick={() =>
                  navigateToProjectCreationPage(
                    CUSTOMER_ROUTES.ADVANCED_CREATE_PROJECT
                  )
                }
              >
                {intl.formatMessage({
                  id: "app.customer.createProject.advancedCreate",
                })}
              </Button>

              <Button
                variant="outlined"
                onClick={() => {
                  ReactGA.event({
                    action: EVENT_ACTION.CLICK,
                    category: EVENT_CATEGORY.PROJECT,
                    label: EVENT_LABEL.IMPORT_PROJECT,
                  });
                  setCurrentView(ModalView.IMPORT_VIEW);
                }}
              >
                {intl.formatMessage({
                  id: "app.customer.createProject.import",
                })}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </>
    );
  };

  const renderImportView = () => {
    const navigateToAdvanceCreateProject = (projectId: string) => {
      navigate(CUSTOMER_ROUTES.ADVANCED_CREATE_PROJECT, {
        state: {
          projectId,
        },
      });
      setCreateProjectSelectionModalOpen(false);
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
            {projectsLoading && <CircularProgress />}
            {projectsData && (
              <Autocomplete
                openOnFocus
                options={
                  projectsData.getCustomerProjects as CustomerProjectOverview[]
                }
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
            )}
            {projectsData && (
              <Box>
                <Button
                  onClick={() => {
                    setCurrentView(ModalView.SELECTION_VIEW);
                    setSelectProjectForImport(null);
                  }}
                >
                  {intl.formatMessage({ id: "app.general.back" })}
                </Button>
                <Button
                  disabled={!selectedProjectForImport}
                  onClick={() =>
                    navigateToAdvanceCreateProject(selectedProjectForImport!.id)
                  }
                >
                  {intl.formatMessage({ id: "app.general.confirm" })}
                </Button>
              </Box>
            )}
          </Box>
        </DialogContent>
      </>
    );
  };

  const renderModalView = () => {
    switch (currentView) {
      case ModalView.SELECTION_VIEW:
        return renderSelectionView();
      case ModalView.IMPORT_VIEW:
        return renderImportView();
    }
    return null;
  };

  return renderModalView();
};

export default CreateProjectSelectionModal;
