import { ApolloQueryResult } from "@apollo/client";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  CircularProgress,
  AlertColor,
  IconButton,
} from "@mui/material";
import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { AuthContext } from "../../../../context/AuthContext";
import { Exact, InputMaybe } from "../../../../generated/graphql";
import { useDeleteProjectMutation } from "../../../gql/delete/project/project.generated";
import {
  GetCustomerProjectsQuery,
  useGetCustomerProjectsLazyQuery,
} from "../../../gql/get/customer/customer.generated";
import useCustomSnackbar from "../../../Utils/CustomSnackbar";

const DeleteProjectModal = ({
  deleteProjectModalOpen,
  setDeleteProjectModalOpen,
  projectId,
  setIsProjectPageLoading,
}: {
  deleteProjectModalOpen: boolean;
  setDeleteProjectModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
  setIsProjectPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [getCustomerProjects] = useGetCustomerProjectsLazyQuery();
  const [
    deleteProjectMutation,
    {
      data: deleteProjectData,
      error: deleteProjectError,
      loading: deleteProjectLoading,
    },
  ] = useDeleteProjectMutation();

  const deleteProjectOnClick = async () => {
    setDeleteProjectModalOpen(false);
    setIsProjectPageLoading(true);
    try {
      await deleteProjectMutation({
        variables: {
          data: {
            projectId,
          },
        },
      });
      await getCustomerProjects({
        variables: {
          data: {
            userId: user!.id,
          },
        },
      });
      setSnackbar({
        message: "Project deleted.",
        severity: "success",
      });
    } catch (e) {
      setSnackbar({
        message: "Something went wrong. Please try again later.",
        severity: "error",
      });
    } finally {
      setSnackbarOpen(true);
      setIsProjectPageLoading(false);
    }
  };

  const renderDeleteProjectConfirmation = () => {
    return (
      <>
        <Typography variant="subtitle2">
          {intl.formatMessage({
            id: "app.customer.projects.modal.delete.title",
          })}
        </Typography>
        <DialogActions>
          <Button onClick={deleteProjectOnClick} color="error">
            {intl.formatMessage({
              id: "app.general.confirm",
            })}
          </Button>
          <Button onClick={() => setDeleteProjectModalOpen(false)}>
            {intl.formatMessage({
              id: "app.general.cancel",
            })}
          </Button>
        </DialogActions>
      </>
    );
  };

  return (
    <Dialog
      open={deleteProjectModalOpen}
      onClose={() => setDeleteProjectModalOpen(false)}
      maxWidth="xs"
    >
      <DialogContent>
        <Container>
          {!deleteProjectLoading &&
            !deleteProjectError &&
            renderDeleteProjectConfirmation()}
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProjectModal;
