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
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [
    deleteProjectMutation,
    { error: deleteProjectError, loading: deleteProjectLoading },
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
        onCompleted: () => {
          document.dispatchEvent(new CustomEvent("reload"));
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
        <DialogActions sx={{ mt: 1 }}>
          <Button
            onClick={deleteProjectOnClick}
            color="error"
            variant="contained"
          >
            {intl.formatMessage({
              id: "app.general.confirm",
            })}
          </Button>
          <Button
            onClick={() => setDeleteProjectModalOpen(false)}
            variant="outlined"
          >
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
        {!deleteProjectLoading &&
          !deleteProjectError &&
          renderDeleteProjectConfirmation()}
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProjectModal;
