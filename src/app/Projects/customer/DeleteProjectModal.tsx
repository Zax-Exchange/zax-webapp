import { ApolloQueryResult } from "@apollo/client";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import React from "react";
import {
  Exact,
  GetCustomerProjectsQuery,
  InputMaybe,
  useDeleteProjectMutation,
} from "../../../generated/graphql";

const DeleteProjectModal = ({
  deleteProjectModalOpen,
  setDeleteProjectModalOpen,
  projectId,
  getCustomerProjectsRefetch,
  // setSnackbar,
  // setSnackbarOpen,
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
  // setSnackbar,
  // setSnackbarOpen,
  setIsProjectPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
      // setSnackbar({
      //   message: "Project deleted.",
      //   severity: "success",
      // });
    } catch (e) {
      // setSnackbar({
      //   message: "Something went wrong. Please try again later.",
      //   severity: "error",
      // });
    } finally {
      setIsProjectPageLoading(false);
      // setSnackbarOpen(true);
    }
  };

  const renderDeleteProjectConfirmation = () => {
    return (
      <>
        <Typography>Do you want to delete the project?</Typography>
        <DialogActions>
          <Button onClick={deleteProjectOnClick}>Confirm</Button>
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
          {/* {deleteProjectLoading && <CircularProgress />} */}
          {!deleteProjectLoading &&
            !deleteProjectError &&
            renderDeleteProjectConfirmation()}
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProjectModal;
