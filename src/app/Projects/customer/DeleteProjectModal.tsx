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
import React from "react";
import {
  Exact,
  GetCustomerProjectsQuery,
  InputMaybe,
  useDeleteProjectMutation,
} from "../../../generated/graphql";
import useCustomSnackbar from "../../Utils/CustomSnackbar";

const DeleteProjectModal = ({
  deleteProjectModalOpen,
  setDeleteProjectModalOpen,
  projectId,
  getCustomerProjectsRefetch,
  setIsProjectPageLoading,
}: {
  deleteProjectModalOpen: boolean;
  setDeleteProjectModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
  getCustomerProjectsRefetch: (
    variables?:
      | Partial<
          Exact<{
            userId: string;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<GetCustomerProjectsQuery>>;
  setIsProjectPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
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
          projectId,
        },
      });
      await getCustomerProjectsRefetch();
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
        <Typography>Do you want to delete the project?</Typography>
        <DialogActions>
          <Button onClick={deleteProjectOnClick} color="error">
            Confirm
          </Button>
          <Button onClick={() => setDeleteProjectModalOpen(false)}>
            Cancel
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
