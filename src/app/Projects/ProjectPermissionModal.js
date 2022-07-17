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
  Stack
} from "@mui/material";
import { useEffect, useState } from "react";
import { GET_USER } from "../Profile/Profile";
import CircularProgress from "@mui/material/CircularProgress";

const GET_PROJECT_USERS = gql`
  query getProjectUsers($projectId: Int) {
    getProjectUsers(projectId: $projectId) {
      userId
      name
      email
      permission
    } 
  }
`;

const GET_PROJECT_BID_USERS = gql`
  query getProjectBidUsers($projectBidId: Int) {
    getProjectBidUsers(projectBidId: $projectBidId) {
      userId
      name
      email
      permission
    } 
  }
`;

const GET_ALL_COMPANY_USERS = gql`
  query getAllUsersWithinCompany($companyId: Int) {
    getAllUsersWithinCompany(companyId: $companyId) {
      id
      email
      name
    }
  }
`;

const UPDATE_PROJECT_PERMISSION = gql`
  mutation updateProjectPermissions($data: UpdateProjectPermissionsInput) {
    updateProjectPermissions(data: $data)
  }
`;

const UPDATE_PROJECT_BID_PERMISSION = gql`
  mutation updateProjectBidPermissions($data: UpdateProjectBidPermissionsInput) {
    updateProjectBidPermissions(data: $data)
  }
`;

const DELETE_PROJECT_PERMISSION = gql`
  mutation deleteProjectPermissions($data: DeleteProjectPermissionsInput) {
    deleteProjectPermissions(data: $data)
  }
`;

const DELETE_PROJECT_BID_PERMISSION = gql`
  mutation deleteProjectBidPermissions($data: DeleteProjectBidPermissionsInput) {
    deleteProjectBidPermissions(data: $data)
  }
`;

const useUpdatePermission = (query) => {
  const [mutationQuery] = useMutation(query);
  return mutationQuery;
};

const useDeletePermission = (query) => {
  const [mutationQuery] = useMutation(query);
  return mutationQuery;
};
const ProjectPermissionModal = ({ projectData, setIsPermissionOpen, isVendor }) => {

  const [email, setEmail] = useState("");

  const [allProjectUsers, setAllProjectUsers] = useState([]);

  const [emailsList, setEmailsList] = useState([]);

  const [toUpdate, setToUpdate] = useState({
    "viewers": [],
    "editors": [],
    "toDelete": []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);
  
  const updateProjectBidViewers = useUpdatePermission(UPDATE_PROJECT_BID_PERMISSION);
  const updateProjectBidBidEditors = useUpdatePermission(UPDATE_PROJECT_BID_PERMISSION);
  const updateProjectViewers = useUpdatePermission(UPDATE_PROJECT_PERMISSION);
  const updateProjectEditors = useUpdatePermission(UPDATE_PROJECT_PERMISSION);
  const deleteProjectUsers = useDeletePermission(DELETE_PROJECT_PERMISSION);
  const deleteProjectBidUsers = useDeletePermission(DELETE_PROJECT_BID_PERMISSION);

  useEffect(() => {
    const isDisabled = allCompanyUsersData && !allCompanyUsersData.getAllUsersWithinCompany.find(user => user.email === email);
    setIsAddButtonDisabled(isDisabled)
  }, [email]);

  // this sets the email list for input dropdown
  useEffect(() => {
    const userEmails = [];
    if (userData && allCompanyUsersData) {
      if (isVendor) {
        allCompanyUsersData.getAllUsersWithinCompany.forEach((data) => {
            if (!allProjectUsers.find(user => user.email === data.email)) {
              userEmails.push(data.email);
            }
          
        });
      } else {
        allCompanyUsersData.getAllUsersWithinCompany.forEach((data) => {
          if (!allProjectUsers.find(user => user.email === data.email)) {
            userEmails.push(data.email);
          }
        });
      }
    }
    setEmailsList(userEmails);
  }, [allProjectUsers]);

  const {error: userError, loading: userLoading, data: userData} = useQuery(GET_USER, {
    variables: {
      userId: parseInt(sessionStorage.getItem("userId"), 10)
    }
  });

  const {data: allCompanyUsersData} = useQuery(GET_ALL_COMPANY_USERS, {
    variables: {
      companyId: userData ? userData.getUserWithUserId.companyId : null
    },
    skip: !userData
  });
  const {error: projectUserDataError, loading: projectUserDataLoading, data: projectUserData, refetch: projectUserRefetch} = useQuery(GET_PROJECT_USERS, {
    variables: {
      projectId: projectData.id
    },
    skip: isVendor,
    fetchPolicy: "no-cache",
    onCompleted: (data) => setAllProjectUsers(data.getProjectUsers)
  });
  const {error: bidError, loading: bidLoading, data: bidUserData, refetch: bidDataRefetch} = useQuery(GET_PROJECT_BID_USERS, {
    variables: {
      projectBidId: projectData.bidInfo ? projectData.bidInfo.id : null
    },
    skip: !isVendor,
    fetchPolicy: "no-cache",
    onCompleted: (data) => setAllProjectUsers(data.getProjectBidUsers)
  });

  const shareHandler = (e) => {
    setEmail(e.target.value)
  };

  const selectHandler = (e) => {
    setEmail(e.target.innerHTML)
  }
  const getUser = (email) => {
    return allCompanyUsersData.getAllUsersWithinCompany.find((user) => user.email === email);
  }
  const addPermissionHandler = () => {
    const user = getUser(email);

    // update data that'll be sent to server
    updateViewersEditorsList(user.id, "VIEWER");

    // update data for display purpose
    const projectUsers = [...allProjectUsers];
    projectUsers.push({
      name: user.name,
      email: user.email,
      userId: user.id,
      permission: "VIEWER"
    })

    setEmail("");
    setAllProjectUsers(projectUsers);
  };
  
  
  const updateViewersEditorsList = (userId, permission) => {
    let viewers = [...toUpdate.viewers];
    let editors = [...toUpdate.editors];
    let toDelete = [...toUpdate.toDelete];

    if (permission === "VIEWER") {
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
      editors
    })
  }

  const isUserWithinPermission = (userId) => {
    if (isVendor) {
      return bidUserData.getProjectBidUsers.findIndex(user => user.userId === userId) >= 0;
    } else {
      return projectUserData.getProjectUsers.findIndex(user => user.userId === userId) >= 0;
    }
  }
  const deleteViewersEditorsList = (userId, permission) => {
    let viewers = [...toUpdate.viewers];
    let editors = [...toUpdate.editors];
    let toDelete = [...toUpdate.toDelete];

    if (permission === "EDITOR") {
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
      toDelete
    });
  }
  // TODO: need to setToUpdate state
  const selectPermissionHandler = (e, userId) => {
    let projectUsers = [...allProjectUsers];
    const permission =  e.target.value;
    projectUsers = projectUsers.map((user) => {
      if (user.userId === userId) {
        return {
          ...user,
          permission
        }
      }
      return user;
    });
    setAllProjectUsers(projectUsers);
    
    updateViewersEditorsList(userId, permission);
  };

  const removePermissionHandler = (userId, previousPermission) => {
    const projectUsers = [...allProjectUsers];
    const userIndex = projectUsers.findIndex(user => user.userId === userId);

    projectUsers.splice(userIndex, 1);
    setAllProjectUsers(projectUsers);
    deleteViewersEditorsList(userId, previousPermission);
  };

  const savePermissionHandler = async () => {
    setIsLoading(true);
    if (isVendor) {
      await updateProjectBidViewers({
        variables: {
          data: {
            viewers: {
              userIds: toUpdate.viewers,
              projectBidId: projectData.bidInfo.id,
              permission: "VIEWER"
            },
            editors: {
              userIds: toUpdate.editors,
              projectBidId: projectData.bidInfo.id,
              permission: "EDITOR"
            }
          }
        }
      });
      await deleteProjectBidUsers({
          variables: {
            data: {
              userIds: toUpdate.toDelete,
              projectBidId: projectData.bidInfo.id
            }
          },
          onCompleted: bidDataRefetch
        })
    } else {
      await updateProjectViewers({
        variables: {
          data: {
            viewers: {
              userIds: toUpdate.viewers,
              projectId: projectData.id,
              permission: "VIEWER"
            },
            editors: {
              userIds: toUpdate.editors,
              projectId: projectData.id,
              permission: "EDITOR"
            }
          }
        }
      });
      await deleteProjectUsers({
          variables: {
            data: {
              userIds: toUpdate.toDelete,
              projectId: projectData.id
            }
          },
          onCompleted: projectUserRefetch
        })
    }
    setIsPermissionOpen(false);
    setIsLoading(false);
  }

  const isUserOwner = () => {
    // not used for now
    if (isVendor) {
      return projectData.bidInfo.permission === "OWNER";
    }
    return projectData.permission === "OWNER"
  }

  const renderPermissionedUsers = () => {
    return <Stack>
      {
        allProjectUsers && allProjectUsers.map(data => {
          if (data.userId === userData.getUserWithUserId.id) return null;
          return <List style={{display: "flex", flexDirection:"row"}}>
              <ListItem>
                <Typography>
                  {data.name}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="caption">
                  ({data.email})
                </Typography>
              </ListItem>
              {
                data.permission === "OWNER" && <ListItem><Typography>OWNER</Typography></ListItem>
              }
              {
                data.permission !== "OWNER" && <ListItem>
                  <Select autoWidth onChange={(e) => selectPermissionHandler(e, data.userId)} value={data.permission}>
                    <MenuItem value="EDITOR">EDITOR</MenuItem>
                    <MenuItem value="VIEWER">VIEWER</MenuItem>
                  </Select>
                  <Button onClick={() => removePermissionHandler(data.userId, data.permission)}>Remove</Button>
                </ListItem>
              }
            </List>
        })
      }
    </Stack>
  };
  
  // TODO: use isVendor

  return <Container>
    <Container style={{display: "flex", justifyContent:"center"}}>
      <Autocomplete
        sx={{width: 300}}
        freeSolo
        disableClearable
        options={emailsList}
        onChange={selectHandler}
        value={email}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Share with"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
            onChange={shareHandler} 
            value={email}
            variant="standard"
          />

        )}
      />
      <Button 
        variant="contained" 
        style={{marginLeft: "4px"}}
        onClick={addPermissionHandler}
        disabled={isAddButtonDisabled}
      >
        Add
      </Button>
    </Container>
    {renderPermissionedUsers()}
    <DialogActions>
      <Button onClick={savePermissionHandler} variant="contained">Save</Button>
      <Button onClick={() => setIsPermissionOpen(false)} variant="primary">Cancel</Button>
    </DialogActions>
    {isLoading && <CircularProgress color="inherit" />}
  </Container>
}

export default ProjectPermissionModal;