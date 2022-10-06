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

import {
  ProjectPermission,
  UserProjectPermission,
  VendorProjectOverview,
} from "../../../../generated/graphql";
import { AuthContext } from "../../../../context/AuthContext";
import useCustomSnackbar from "../../../Utils/CustomSnackbar";
import { useUpdateProjectBidPermissionsMutation } from "../../../gql/update/bid/bid.generated";
import { useDeleteProjectBidPermissionsMutation } from "../../../gql/delete/bid/bid.generated";
import { useGetProjectBidUsersLazyQuery } from "../../../gql/get/bid/bid.generated";
import { useGetAllUsersWithinCompanyQuery } from "../../../gql/get/company/company.generated";

// TODO: rework whole thing, should not pass in whole project object. Should just use projectId and userId to fetch for necessary info.
const VendorPermissionModal = ({
  project,
  setPermissionModalOpen,
}: {
  setPermissionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  project: VendorProjectOverview;
}) => {
  const { user: loggedInUser } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const isVendor = loggedInUser!.isVendor;
  const [email, setEmail] = useState("");

  const [allProjectUsers, setAllProjectUsers] = useState<
    UserProjectPermission[]
  >([]);

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
    updateProjectBidPermission,
    {
      data: updateProjectBidPermissionData,
      error: updateProjectBidPermissionError,
      loading: updateProjectBidPermissionLoading,
    },
  ] = useUpdateProjectBidPermissionsMutation();

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
      await updateProjectBidPermission({
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
      });
      await deleteProjectBidPermission({
        variables: {
          data: {
            userIds: toUpdate.toDelete,
            projectBidId: project.bidId,
          },
        },
      });
      getProjectBidUsersRefetch();
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
      return project.permission === ProjectPermission.Owner;
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
    updateProjectBidPermissionLoading || deleteProjectBidPermissionLoading;
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

export default VendorPermissionModal;