import { 
  Button, 
  Container, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  Typography,
  CircularProgress 
} from "@mui/material";
import { useState } from "react";
import { useDeleteProject } from "./hooks";

const DeleteProjectModal = ({
  deleteProjectModalOpen,
  setDeleteProjectModalOpen,
  projectId,
  getCustomerProjectsRefetch,
  setDeleteSnackbarOpen,
  setErrorSnackbarOpen,
  setIsProjectPageLoading,
}) => {
  const { deleteProject, deleteProjectData, deleteProjectError, deleteProjectLoading } = useDeleteProject();

  const deleteProjectOnClick = async () => {
    setDeleteProjectModalOpen(false);
    setIsProjectPageLoading(true);

    try {
      await deleteProject({
        variables: {
          projectId
        }
      })
      await getCustomerProjectsRefetch();
      setIsProjectPageLoading(false);
      setDeleteSnackbarOpen(true);
    } catch (e) {
      setIsProjectPageLoading(false);
      setErrorSnackbarOpen(true);
    }
  }

  const renderDeleteProjectConfirmation = () => {
    return <>
      <Typography>Do you want to delete the project?</Typography>
      <DialogActions>
        <Button onClick={deleteProjectOnClick}>Confirm</Button>
        <Button onClick={() => setDeleteProjectModalOpen(false)}>Cancel</Button>
      </DialogActions>
    </>
  };

  return <Dialog
      open={deleteProjectModalOpen}
      onClose={() => setDeleteProjectModalOpen(false)}
      maxWidth="xs"
    >

      <DialogContent>
        <Container>
          {/* {deleteProjectLoading && <CircularProgress />} */}
          {
            !deleteProjectLoading 
            && !deleteProjectError 
            && renderDeleteProjectConfirmation()
          }
        </Container>
      </DialogContent>
    </Dialog>
};

export default DeleteProjectModal;