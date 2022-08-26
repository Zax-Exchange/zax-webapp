import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Email } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Container,
  Typography,
  Card,
  Input,
  List,
  ListItem,
  Select,
  MenuItem,
  ListItemButton,
  TextField,
  DialogActions,
  Stack,
  SelectChangeEvent,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../../context/AuthContext";
import {
  CustomerProject,
  ProjectPermission,
  UserPermission,
  VendorProject,
} from "../../generated/graphql";
import useCustomSnackbar from "../Utils/CustomSnackbar";
import { useUpdateProjectPermissionsMutation } from "../gql/update/project/project.generated";
import { useUpdateProjectBidPermissionsMutation } from "../gql/update/bid/bid.generated";
import { useDeleteProjectPermissionsMutation } from "../gql/delete/project/project.generated";
import { useDeleteProjectBidPermissionsMutation } from "../gql/delete/bid/bid.generated";
import { useGetProjectBidUsersLazyQuery } from "../gql/get/bid/bid.generated";
import { useGetProjectUsersLazyQuery } from "../gql/get/project/project.generated";
import { useGetAllUsersWithinCompanyQuery } from "../gql/get/company/company.generated";

const ProjectPermissionModal = ({
  project,
  setPermissionModalOpen,
}: {
  setPermissionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  project: VendorProject | CustomerProject;
}) => {
  const { user: loggedInUser } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const isVendor = loggedInUser!.isVendor;
  const [email, setEmail] = useState("");

  const [allProjectUsers, setAllProjectUsers] = useState<UserPermission[]>([]);

  const [emailsList, setEmailsList] = useState<string[]>([]);

  const [toUpdate, setToUpdate] = useState<{
    viewers: string[];
    editors: string[];
    toDelete: string[];
  }>({
    viewers: [],
    editors: [],
    toDelete: [],
  });

  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);

  const [
    updateProjectPermission,
    {
      error: updateProjectPermissionError,
      data: updateProjectPermissionData,
      loading: updateProjectPermissionLoading,
    },
  ] = useUpdateProjectPermissionsMutation();

  const [
    updateProjectBidPermission,
    {
      data: updateProjectBidPermissionData,
      error: updateProjectBidPermissionError,
      loading: updateProjectBidPermissionLoading,
    },
  ] = useUpdateProjectBidPermissionsMutation();

  const [
    deleteProjectPermission,
    {
      data: deleteProjectPermissionData,
      error: deleteProjectPermissionError,
      loading: deleteProjectPermissionLoading,
    },
  ] = useDeleteProjectPermissionsMutation();

  const [
    deleteProjectBidPermission,
    {
      data: deleteProjectBidPermissionData,
      error: deleteProjectBidPermissionError,
      loading: deleteProjectBidPermissionLoading,
    },
  ] = useDeleteProjectBidPermissionsMutation();

  const [
    getProjectBidUsers,
    { data: getProjectBidUsersData, refetch: getProjectBidUsersRefetch },
  ] = useGetProjectBidUsersLazyQuery();

  const [
    getProjectUsers,
    { data: getProjectUsersData, refetch: getProjectUsersRefetch },
  ] = useGetProjectUsersLazyQuery();

  useEffect(() => {
    // init allProjectUsers list
    console.log("fetching all project users");
    if (isVendor) {
      getProjectBidUsers({
        variables: {
          data: {
            projectBidId: (project as VendorProject).bidInfo.id,
          },
        },
        fetchPolicy: "no-cache",
        onCompleted: ({
          getProjectBidUsers,
        }: {
          getProjectBidUsers: UserPermission[];
        }) => {
          setAllProjectUsers(getProjectBidUsers);
        },
      });
    } else {
      getProjectUsers({
        variables: {
          data: {
            projectId: (project as CustomerProject).id,
          },
        },
        fetchPolicy: "no-cache",
        onCompleted: ({
          getProjectUsers,
        }: {
          getProjectUsers: UserPermission[];
        }) => {
          console.log("customer project users fetched");
          setAllProjectUsers(getProjectUsers);
        },
      });
    }
  }, []);

  const { data: getAllCompanyUsersData } = useGetAllUsersWithinCompanyQuery({
    variables: {
      data: {
        companyId: loggedInUser!.companyId,
      },
    },
  });

  useEffect(() => {
    const isDisabled =
      getAllCompanyUsersData &&
      !getAllCompanyUsersData!.getAllUsersWithinCompany!.find(
        (user) => user!.email === email
      );
    setIsAddButtonDisabled(isDisabled!);
  }, [email]);

  // this sets the email list for input dropdown
  useEffect(() => {
    const userEmails: string[] = [];
    if (allProjectUsers && getAllCompanyUsersData) {
      getAllCompanyUsersData!.getAllUsersWithinCompany!.forEach((data) => {
        if (!allProjectUsers.find((user) => user.email === data!.email)) {
          userEmails.push(data!.email);
        }
      });
      console.log(userEmails, allProjectUsers);
      setEmailsList(userEmails);
    }
  }, [allProjectUsers, getAllCompanyUsersData]);

  const shareHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const selectHandler = (email: string) => {
    setEmail(email);
  };
  const getUser = (email: string) => {
    return getAllCompanyUsersData!.getAllUsersWithinCompany!.find(
      (user) => user!.email === email
    );
  };

  const addPermissionHandler = () => {
    const user = getUser(email);

    // update data that'll be sent to server
    updateViewersEditorsList(user!.id, ProjectPermission.Viewer);

    // update data for display purpose
    setAllProjectUsers([
      ...allProjectUsers,
      {
        name: user!.name,
        email: user!.email,
        userId: user!.id,
        permission: ProjectPermission.Viewer,
      },
    ]);

    setEmail("");
  };

  const updateViewersEditorsList = (
    userId: string,
    permission: ProjectPermission
  ) => {
    let viewers = [...toUpdate.viewers];
    let editors = [...toUpdate.editors];
    let toDelete = [...toUpdate.toDelete];

    if (permission === ProjectPermission.Viewer) {
      // user is previously editor
      const ind = editors.indexOf(userId);
      editors.splice(ind, 1);
      viewers.push(userId);
    } else {
      const ind = viewers.indexOf(userId);
      viewers.splice(ind, 1);
      editors.push(userId);
    }
    const deleteInd = toDelete.indexOf(userId);
    if (deleteInd >= 0) {
      toDelete.splice(deleteInd, 1);
    }

    setToUpdate({
      toDelete,
      viewers,
      editors,
    });
  };

  const isUserWithinPermission = (userId: string) => {
    if (isVendor && getProjectBidUsersData) {
      return (
        getProjectBidUsersData!.getProjectBidUsers!.findIndex(
          (user) => user!.userId === userId
        ) >= 0
      );
    } else if (getProjectUsersData) {
      return (
        getProjectUsersData!.getProjectUsers!.findIndex(
          (user) => user!.userId === userId
        ) >= 0
      );
    }
  };

  const deleteViewersEditorsList = (
    userId: string,
    permission: ProjectPermission
  ) => {
    let viewers = [...toUpdate.viewers];
    let editors = [...toUpdate.editors];
    let toDelete = [...toUpdate.toDelete];

    if (permission === ProjectPermission.Editor) {
      // user is previously editor
      const ind = editors.indexOf(userId);
      editors.splice(ind, 1);
    } else {
      const ind = viewers.indexOf(userId);
      viewers.splice(ind, 1);
    }

    if (toDelete.indexOf(userId) === -1 && isUserWithinPermission(userId)) {
      // check if user is within project/bid permissions already
      toDelete.push(userId);
    }

    setToUpdate({
      viewers,
      editors,
      toDelete,
    });
  };
  // TODO: need to setToUpdate state
  const selectPermissionHandler = (
    e: SelectChangeEvent<string>,
    userId: string
  ) => {
    let projectUsers = [...allProjectUsers];
    const permission = e.target.value as ProjectPermission;
    projectUsers = projectUsers.map((user) => {
      if (user.userId === userId) {
        return {
          ...user,
          permission,
        };
      }
      return user;
    });
    setAllProjectUsers(projectUsers);

    updateViewersEditorsList(userId, permission);
  };

  const removePermissionHandler = (
    userId: string,
    previousPermission: ProjectPermission
  ) => {
    const projectUsers = [...allProjectUsers];
    const userIndex = projectUsers.findIndex((user) => user.userId === userId);

    projectUsers.splice(userIndex, 1);
    setAllProjectUsers(projectUsers);
    deleteViewersEditorsList(userId, previousPermission);
  };

  const savePermissionHandler = async () => {
    try {
      if (isVendor) {
        await updateProjectBidPermission({
          variables: {
            data: {
              viewers: {
                userIds: toUpdate.viewers,
                projectId: project.id,
                projectBidId: (project as VendorProject).bidInfo.id,
                permission: ProjectPermission.Viewer,
              },
              editors: {
                userIds: toUpdate.editors,
                projectId: project.id,
                projectBidId: (project as VendorProject).bidInfo.id,
                permission: ProjectPermission.Editor,
              },
            },
          },
        });
        await deleteProjectBidPermission({
          variables: {
            data: {
              userIds: toUpdate.toDelete,
              projectBidId: (project as VendorProject).bidInfo.id,
            },
          },
        });
        getProjectBidUsersRefetch();
      } else {
        await updateProjectPermission({
          variables: {
            data: {
              viewers: {
                userIds: toUpdate.viewers,
                projectId: project.id,
                permission: ProjectPermission.Viewer,
              },
              editors: {
                userIds: toUpdate.editors,
                projectId: project.id,
                permission: ProjectPermission.Editor,
              },
            },
          },
        });
        await deleteProjectPermission({
          variables: {
            data: {
              userIds: toUpdate.toDelete,
              projectId: project.id,
            },
          },
        });
        getProjectUsersRefetch();
      }
    } catch (error) {
      setSnackbar({
        severity: "error",
        message: "Could not perform action. Please try again later.",
      });
      setSnackbarOpen(true);
    } finally {
      setPermissionModalOpen(false);
    }
  };

  const isUserOwner = () => {
    // not used for now
    if (isVendor) {
      return (
        (project as VendorProject).bidInfo.permission ===
        ProjectPermission.Owner
      );
    }
    return project.permission === ProjectPermission.Owner;
  };

  const renderPermissionedUsers = () => {
    return (
      <Stack>
        {allProjectUsers &&
          allProjectUsers.map((data) => {
            if (data.userId === loggedInUser!.id) return null;
            return (
              <List style={{ display: "flex", flexDirection: "row" }}>
                <ListItem>
                  <Typography>{data.name}</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="caption">({data.email})</Typography>
                </ListItem>
                {data.permission === ProjectPermission.Owner && (
                  <ListItem>
                    <Typography>OWNER</Typography>
                  </ListItem>
                )}
                {data.permission !== ProjectPermission.Owner && (
                  <ListItem>
                    <Select
                      autoWidth
                      onChange={(e) => selectPermissionHandler(e, data.userId)}
                      value={data.permission}
                    >
                      <MenuItem value={ProjectPermission.Editor}>
                        EDITOR
                      </MenuItem>
                      <MenuItem value={ProjectPermission.Viewer}>
                        VIEWER
                      </MenuItem>
                    </Select>
                    <Button
                      onClick={() =>
                        removePermissionHandler(
                          data.userId,
                          data.permission as ProjectPermission
                        )
                      }
                    >
                      Remove
                    </Button>
                  </ListItem>
                )}
              </List>
            );
          })}
      </Stack>
    );
  };

  const isLoading =
    updateProjectPermissionLoading ||
    updateProjectBidPermissionLoading ||
    deleteProjectPermissionLoading ||
    deleteProjectBidPermissionLoading;
  // TODO: use isVendor
  return (
    <Container>
      {isLoading && <CircularProgress />}

      {!isLoading && (
        <>
          <Container style={{ display: "flex", justifyContent: "center" }}>
            <Autocomplete
              sx={{ width: 300 }}
              freeSolo
              disableClearable
              options={emailsList}
              onChange={(e, v) => selectHandler(v)}
              value={email}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Share with"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                  onChange={shareHandler}
                  value={email}
                  variant="standard"
                />
              )}
            />
            <Button
              variant="contained"
              style={{ marginLeft: "4px" }}
              onClick={addPermissionHandler}
              disabled={isAddButtonDisabled}
            >
              Add
            </Button>
          </Container>

          {renderPermissionedUsers()}

          <DialogActions>
            <Button onClick={savePermissionHandler} variant="contained">
              Save
            </Button>
            <Button
              onClick={() => setPermissionModalOpen(false)}
              variant="outlined"
            >
              Cancel
            </Button>
          </DialogActions>
        </>
      )}
    </Container>
  );
};

export default ProjectPermissionModal;
