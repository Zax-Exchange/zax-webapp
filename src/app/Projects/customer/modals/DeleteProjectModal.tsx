import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";
import { useDeleteProjectMutation } from "../../../gql/delete/project/project.generated";
import useCustomSnackbar from "../../../Utils/CustomSnackbar";
import { LoadingButton } from "@mui/lab";

const DeleteProjectModal = ({
  deleteProjectModalOpen,
  setDeleteProjectModalOpen,
  projectId,
  setIsProjectPageLoading,
  refetchProjects,
}: {
  deleteProjectModalOpen: boolean;
  setDeleteProjectModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
  setIsProjectPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
  refetchProjects: () => void;
}) => {
  const intl = useIntl();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [
    deleteProjectMutation,
    { error: deleteProjectError, loading: deleteProjectLoading },
  ] = useDeleteProjectMutation();

  const deleteProjectOnClick = async () => {
    // setDeleteProjectModalOpen(false);
    // setIsProjectPageLoading(true);
    try {
      await deleteProjectMutation({
        variables: {
          data: {
            projectId,
          },
        },
        onCompleted: () => {
          refetchProjects();
        },
      });
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.success" }),
        severity: "success",
      });
    } catch (e) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
    } finally {
      setSnackbarOpen(true);
      setDeleteProjectModalOpen(false);
      setIsProjectPageLoading(false);
    }
  };

  const renderDeleteProjectConfirmation = () => {
    return (
      <>
        <DialogTitle>
          <Typography variant="subtitle2">
            {intl.formatMessage({
              id: "app.customer.projects.modal.delete.title",
            })}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="caption">
            {intl.formatMessage({
              id: "app.customer.projects.modal.delete.desc",
            })}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ mt: 1 }}>
          <Button
            onClick={() => setDeleteProjectModalOpen(false)}
            variant="outlined"
          >
            {intl.formatMessage({
              id: "app.general.cancel",
            })}
          </Button>
          <LoadingButton
            loading={deleteProjectLoading}
            onClick={deleteProjectOnClick}
            color="primary"
            variant="contained"
          >
            {intl.formatMessage({
              id: "app.general.confirm",
            })}
          </LoadingButton>
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
      <DialogContent>{renderDeleteProjectConfirmation()}</DialogContent>
    </Dialog>
  );
};

export default DeleteProjectModal;
