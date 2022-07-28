import { 
  Button, 
  Container, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  Typography,
  CircularProgress 
} from "@mui/material";
import { useDeleteProject } from "./hooks";

const DeleteProjectModal = ({
  deleteProjectModalOpen,
  setDeleteProjectModalOpen,
  projectId,
  getCustomerProjectsRefetch
}) => {
  const { deleteProject, deleteProjectData, deleteProjectError, deleteProjectLoading } = useDeleteProject();

  const deleteProjectOnClick = async () => {
    await deleteProject({
      variables: {
        projectId
      }
    });
    await getCustomerProjectsRefetch()
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

  const renderDeleteProjectError = () => {
    return <>
      <Typography>Something went wrong, Try again later!</Typography>
      <DialogActions>
        <Button onClick={() => setDeleteProjectModalOpen(false)}>Close</Button>
      </DialogActions>
    </>
  };

  const renderDeleteProjectSuccess = () => {
    return <>
      <Typography>Project deleted successfully.</Typography>
      <DialogActions>
        <Button onClick={() => setDeleteProjectModalOpen(false)}>Close</Button>
      </DialogActions>
    </>
  }

  return <Dialog
      open={deleteProjectModalOpen}
      onClose={() => setDeleteProjectModalOpen(false)}
      maxWidth="xs"
    >
      <DialogContent>
        <Container>
          {deleteProjectLoading && <CircularProgress />}
          {deleteProjectError && renderDeleteProjectError()}
          {deleteProjectData && renderDeleteProjectSuccess()}
          {
            !deleteProjectLoading 
            && !deleteProjectError 
            && !deleteProjectData
            && renderDeleteProjectConfirmation()
          }
        </Container>
      </DialogContent>
    </Dialog>
};

export default DeleteProjectModal;