import { Cancel } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Container,
  Typography,
  List,
  ListItem,
  Select,
  MenuItem,
  TextField,
  DialogActions,
  Stack,
  SelectChangeEvent,
  Box,
  IconButton,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import {
  GenericUser,
  ProjectPermission,
  UserProjectPermission,
  UserStatus,
  VendorProjectOverview,
} from "../../../../generated/graphql";
import { AuthContext } from "../../../../context/AuthContext";
import useCustomSnackbar from "../../../Utils/CustomSnackbar";
import { useUpdateProjectBidPermissionsMutation } from "../../../gql/update/bid/bid.generated";
import { useDeleteProjectBidPermissionsMutation } from "../../../gql/delete/bid/bid.generated";
import { useGetProjectBidUsersLazyQuery } from "../../../gql/get/bid/bid.generated";
import { useGetAllUsersWithinCompanyQuery } from "../../../gql/get/company/company.generated";
import { useIntl } from "react-intl";
import { LoadingButton } from "@mui/lab";

type User = {
  name: string;
  email: string;
};
// TODO: rework whole thing, should not pass in whole project object. Should just use projectId and userId to fetch for necessary info.
const VendorPermissionModal = ({
  project,
  setPermissionModalOpen,
}: {
  setPermissionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  project: VendorProjectOverview;
}) => {
  const intl = useIntl();
  const { user: loggedInUser } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const isVendor = loggedInUser!.isVendor;
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
    updateProjectBidPermission,
    {
      error: updateProjectBidPermissionError,
      loading: updateProjectBidPermissionLoading,
    },
  ] = useUpdateProjectBidPermissionsMutation();

  const [
    deleteProjectBidPermission,
    {
      error: deleteProjectBidPermissionError,
      loading: deleteProjectBidPermissionLoading,
    },
  ] = useDeleteProjectBidPermissionsMutation();

  const [getProjectBidUsers, { data: getProjectBidUsersData }] =
    useGetProjectBidUsersLazyQuery();

  useEffect(() => {
    if (updateProjectBidPermissionError || deleteProjectBidPermissionError) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [updateProjectBidPermissionError, deleteProjectBidPermissionError]);

  useEffect(() => {
    // init allProjectUsers list
    getProjectBidUsers({
      variables: {
        data: {
          projectBidId: project.bidId,
        },
      },
      fetchPolicy: "no-cache",
      onCompleted: ({
        getProjectBidUsers,
      }: {
        getProjectBidUsers: UserProjectPermission[];
      }) => {
        setAllProjectUsers(getProjectBidUsers);
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
  }, [selectedEmails]);

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
    if (getProjectBidUsersData) {
      return (
        getProjectBidUsersData!.getProjectBidUsers!.findIndex(
          (user) => user!.userId === userId
        ) >= 0
      );
    }
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
      await Promise.all([
        updateProjectBidPermission({
          variables: {
            data: {
              viewers: {
                userIds: toUpdate.viewers,
                projectId: project.id,
                projectBidId: project.bidId,
                permission: ProjectPermission.Viewer,
              },
              editors: {
                userIds: toUpdate.editors,
                projectId: project.id,
                projectBidId: project.bidId,
                permission: ProjectPermission.Editor,
              },
            },
          },
        }),
        deleteProjectBidPermission({
          variables: {
            data: {
              userIds: toUpdate.toDelete,
              projectBidId: project.bidId,
            },
          },
        }),
      ]);
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
    updateProjectBidPermissionLoading || deleteProjectBidPermissionLoading;

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

export default VendorPermissionModal;
