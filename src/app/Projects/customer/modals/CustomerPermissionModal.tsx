import { Cancel } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  DialogActions,
  IconButton,
  List,
  ListItem,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { AuthContext } from "../../../../context/AuthContext";
import {
  GenericUser,
  ProjectPermission,
  UserProjectPermission,
  UserStatus,
} from "../../../../generated/graphql";
import { useDeleteProjectPermissionsMutation } from "../../../gql/delete/project/project.generated";
import { useGetAllUsersWithinCompanyQuery } from "../../../gql/get/company/company.generated";
import { useGetProjectUsersLazyQuery } from "../../../gql/get/project/project.generated";
import { useUpdateProjectPermissionsMutation } from "../../../gql/update/project/project.generated";
import useCustomSnackbar from "../../../Utils/CustomSnackbar";

type User = {
  name: string;
  email: string;
};

const CustomerPermissionModal = ({
  projectId,
  setPermissionModalOpen,
}: {
  setPermissionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
}) => {
  const intl = useIntl();
  const { user: loggedInUser } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [selectedEmails, setSelectedEmails] = useState<User[]>([]);

  const [allProjectUsers, setAllProjectUsers] = useState<
    UserProjectPermission[]
  >([]);

  const [emailsList, setEmailsList] = useState<User[]>([]);

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
      loading: updateProjectPermissionLoading,
    },
  ] = useUpdateProjectPermissionsMutation();

  const [
    deleteProjectPermission,
    {
      error: deleteProjectPermissionError,
      loading: deleteProjectPermissionLoading,
    },
  ] = useDeleteProjectPermissionsMutation();

  const [
    getProjectUsers,
    { data: getProjectUsersData, refetch: getProjectUsersRefetch },
  ] = useGetProjectUsersLazyQuery();

  useEffect(() => {
    if (updateProjectPermissionError || deleteProjectPermissionError) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [updateProjectPermissionError, deleteProjectPermissionError]);
  useEffect(() => {
    // init allProjectUsers list

    getProjectUsers({
      variables: {
        data: {
          projectId: projectId,
        },
      },
      fetchPolicy: "no-cache",
      onCompleted: ({
        getProjectUsers,
      }: {
        getProjectUsers: UserProjectPermission[];
      }) => {
        setAllProjectUsers(getProjectUsers);
      },
    });
  }, []);

  const { data: getAllCompanyUsersData, loading: getAllCompanyUsersLoading } =
    useGetAllUsersWithinCompanyQuery({
      variables: {
        data: {
          companyId: loggedInUser!.companyId,
          userStatus: [UserStatus.Active],
        },
      },
      fetchPolicy: "no-cache",
    });

  useEffect(() => {
    if (getAllCompanyUsersData) {
      const isDisabled = getAllCompanyUsersData && !selectedEmails.length;
      setIsAddButtonDisabled(isDisabled);
    }
  }, [selectedEmails, getAllCompanyUsersData]);

  // this sets the email list for input dropdown
  useEffect(() => {
    const userEmails: User[] = [];
    if (allProjectUsers && getAllCompanyUsersData) {
      getAllCompanyUsersData!.getAllUsersWithinCompany!.forEach((data) => {
        if (!allProjectUsers.find((user) => user.email === data!.email)) {
          userEmails.push({
            email: data!.email,
            name: data!.name,
          });
        }
      });
      setEmailsList(userEmails);
    }
  }, [allProjectUsers, getAllCompanyUsersData]);

  const selectHandler = (emails: User[]) => {
    setSelectedEmails(emails);
  };
  const getUser = (email: string) => {
    return getAllCompanyUsersData!.getAllUsersWithinCompany!.find(
      (user) => user!.email === email
    )!;
  };

  const addPermissionHandler = () => {
    const selectedUsers: GenericUser[] = [];
    for (let user of selectedEmails) {
      selectedUsers.push(getUser(user.email));
    }
    // update data that'll be sent to server
    updateViewersEditorsList(
      selectedUsers.map((user) => user.id),
      ProjectPermission.Viewer
    );

    // update data for display purpose
    setAllProjectUsers([
      ...allProjectUsers,
      ...selectedUsers.map((user) => ({
        name: user!.name,
        email: user!.email,
        userId: user!.id,
        permission: ProjectPermission.Viewer,
      })),
    ]);

    setSelectedEmails([]);
  };

  const updateViewersEditorsList = (
    userIds: string[],
    permission: ProjectPermission
  ) => {
    const viewers = [...toUpdate.viewers];
    const editors = [...toUpdate.editors];
    const toDelete = [...toUpdate.toDelete];

    for (let id of userIds) {
      if (permission === ProjectPermission.Viewer) {
        // user is previously editor
        const ind = editors.indexOf(id);
        editors.splice(ind, 1);
        viewers.push(id);
      } else {
        const ind = viewers.indexOf(id);
        viewers.splice(ind, 1);
        editors.push(id);
      }
      const deleteInd = toDelete.indexOf(id);
      if (deleteInd >= 0) {
        toDelete.splice(deleteInd, 1);
      }
    }

    setToUpdate({
      toDelete,
      viewers,
      editors,
    });
  };

  const isUserWithinPermission = (userId: string) => {
    if (getProjectUsersData) {
      return (
        getProjectUsersData!.getProjectUsers!.findIndex(
          (user) => user!.userId === userId
        ) >= 0
      );
    }
    return false;
  };

  const deleteViewersEditorsList = (
    userId: string,
    permission: ProjectPermission
  ) => {
    const viewers = [...toUpdate.viewers];
    const editors = [...toUpdate.editors];
    const toDelete = [...toUpdate.toDelete];

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

    updateViewersEditorsList([userId], permission);
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
      await updateProjectPermission({
        variables: {
          data: {
            viewers: {
              userIds: toUpdate.viewers,
              projectId: projectId,
              permission: ProjectPermission.Viewer,
            },
            editors: {
              userIds: toUpdate.editors,
              projectId: projectId,
              permission: ProjectPermission.Editor,
            },
          },
        },
      });
      await deleteProjectPermission({
        variables: {
          data: {
            userIds: toUpdate.toDelete,
            projectId: projectId,
          },
        },
      });
      getProjectUsersRefetch();
    } catch (error) {
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({ id: "app.general.network.error" }),
      });
      setSnackbarOpen(true);
    } finally {
      setPermissionModalOpen(false);
    }
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
                    <Typography>
                      {intl.formatMessage({ id: "app.permission.owner" })}
                    </Typography>
                  </ListItem>
                )}
                {data.permission !== ProjectPermission.Owner && (
                  <ListItem>
                    <Select
                      autoWidth
                      onChange={(e) => selectPermissionHandler(e, data.userId)}
                      value={data.permission}
                      sx={{ mr: 2 }}
                    >
                      <MenuItem value={ProjectPermission.Editor}>
                        {intl.formatMessage({ id: "app.permission.editor" })}
                      </MenuItem>
                      <MenuItem value={ProjectPermission.Viewer}>
                        {intl.formatMessage({ id: "app.permission.viewer" })}
                      </MenuItem>
                    </Select>
                    <IconButton
                      onClick={() =>
                        removePermissionHandler(
                          data.userId,
                          data.permission as ProjectPermission
                        )
                      }
                    >
                      <Cancel />
                    </IconButton>
                  </ListItem>
                )}
              </List>
            );
          })}
      </Stack>
    );
  };

  const isLoading =
    updateProjectPermissionLoading || deleteProjectPermissionLoading;

  return (
    <Container>
      <>
        <Box display="flex" justifyContent="space-around">
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Autocomplete
              sx={{ width: 400 }}
              loading={getAllCompanyUsersLoading}
              multiple
              options={emailsList}
              disableCloseOnSelect
              getOptionDisabled={(option) =>
                !!allProjectUsers.find((u) => u.email === option.email)
              }
              getOptionLabel={(option) => option.name}
              onChange={(e, v) => {
                selectHandler(v);
              }}
              renderOption={(props, option) => {
                return (
                  <ListItem {...props}>
                    <Box sx={{ display: "flex" }}>
                      <Typography variant="subtitle2" sx={{ mr: 2 }}>
                        {option.name}
                      </Typography>
                      <Typography variant="caption">
                        ({option.email})
                      </Typography>
                    </Box>
                  </ListItem>
                );
              }}
              value={selectedEmails}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={intl.formatMessage({
                    id: "app.permission.shareWith",
                  })}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                  InputLabelProps={{
                    sx: {
                      fontSize: 16,
                      top: -7,
                    },
                  }}
                />
              )}
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              style={{ marginLeft: "4px" }}
              onClick={addPermissionHandler}
              disabled={isAddButtonDisabled}
            >
              {intl.formatMessage({ id: "app.general.add" })}
            </Button>
          </Box>
        </Box>

        {renderPermissionedUsers()}

        <DialogActions sx={{ mt: 2 }}>
          <Button
            onClick={() => setPermissionModalOpen(false)}
            variant="outlined"
          >
            {intl.formatMessage({ id: "app.general.cancel" })}
          </Button>
          <LoadingButton
            onClick={savePermissionHandler}
            variant="contained"
            loading={isLoading}
          >
            {intl.formatMessage({ id: "app.general.save" })}
          </LoadingButton>
        </DialogActions>
      </>
    </Container>
  );
};

export default CustomerPermissionModal;
