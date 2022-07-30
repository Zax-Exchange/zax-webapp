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
import { useContext, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../../context/AuthContext";
import { useDeleteProjectBidPermission, useDeleteProjectPermission, useGetAllCompanyUsers, useGetProjectBidUsers, useGetProjectUsers, useUpdateProjectBidPermission, useUpdateProjectPermission } from "./permissionHooks";

const ProjectPermissionModal = ({ 
  projectData, 
  setPermissionModalOpen,
  renderSnackbar,
  setDeleteSnackbarOpen 
}) => {
  const { user: loggedInUser } = useContext(AuthContext);
  const isVendor = loggedInUser.isVendor;
  const [email, setEmail] = useState("");

  const [allProjectUsers, setAllProjectUsers] = useState([]);

  const [emailsList, setEmailsList] = useState([]);

  const [toUpdate, setToUpdate] = useState({
    "viewers": [],
    "editors": [],
    "toDelete": []
  });

  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);
  
  const {
    updateProjectPermission,
    updateProjectPermissionError,
    updateProjectPermissionData,
    updateProjectPermissionLoading
  } = useUpdateProjectPermission();

  const {
    updateProjectBidPermission,
    updateProjectBidPermissionData,
    updateProjectBidPermissionError,
    updateProjectBidPermissionLoading
  } = useUpdateProjectBidPermission();

  const {
    deleteProjectPermission,
    deleteProjectPermissionData,
    deleteProjectPermissionError,
    deleteProjectPermissionLoading
  } = useDeleteProjectPermission();

  const {
    deleteProjectBidPermission,
    deleteProjectBidPermissionData,
    deleteProjectBidPermissionError,
    deleteProjectBidPermissionLoading
  } = useDeleteProjectBidPermission();

  const {
    getProjectBidUsersData,
    getProjectBidUsersRefetch
  } = useGetProjectBidUsers(setAllProjectUsers, projectData.bidInfo, isVendor);

  const {
    getProjectUsersData,
    getProjectUsersRefetch
  } = useGetProjectUsers(setAllProjectUsers, projectData.id, isVendor);
  const { getAllCompanyUsersData } = useGetAllCompanyUsers(loggedInUser.companyId);



  useEffect(() => {
    const isDisabled = getAllCompanyUsersData && !getAllCompanyUsersData.getAllUsersWithinCompany.find(user => user.email === email);
    setIsAddButtonDisabled(isDisabled)
  }, [email]);

  // this sets the email list for input dropdown
  useEffect(() => {
    const userEmails = [];
    if (allProjectUsers && getAllCompanyUsersData) {
      if (isVendor) {
        getAllCompanyUsersData.getAllUsersWithinCompany.forEach((data) => {
            if (!allProjectUsers.find(user => user.email === data.email)) {
              userEmails.push(data.email);
            }
          
        });
      } else {
        getAllCompanyUsersData.getAllUsersWithinCompany.forEach((data) => {
          if (!allProjectUsers.find(user => user.email === data.email)) {
            userEmails.push(data.email);
          }
        });
      }
      setEmailsList(userEmails);
    }
  }, [allProjectUsers, getAllCompanyUsersData]);

  const shareHandler = (e) => {
    setEmail(e.target.value)
  };

  const selectHandler = (e) => {
    setEmail(e.target.innerHTML)
  }
  const getUser = (email) => {
    return getAllCompanyUsersData.getAllUsersWithinCompany.find((user) => user.email === email);
  }

  const addPermissionHandler = () => {
    const user = getUser(email);

    // update data that'll be sent to server
    updateViewersEditorsList(user.id, "VIEWER");

    // update data for display purpose
    setAllProjectUsers([...allProjectUsers, {
      name: user.name,
      email: user.email,
      userId: user.id,
      permission: "VIEWER"
    }]);

    setEmail("");
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
      return getProjectBidUsersData.getProjectBidUsers.findIndex(user => user.userId === userId) >= 0;
    } else {
      return getProjectUsersData.getProjectUsers.findIndex(user => user.userId === userId) >= 0;
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
    try {
      if (isVendor) {
        await updateProjectBidPermission({
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
        await deleteProjectBidPermission({
            variables: {
              data: {
                userIds: toUpdate.toDelete,
                projectBidId: projectData.bidInfo.id
              }
            }
          })
        getProjectBidUsersRefetch()
      } else {
        await updateProjectPermission({
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
        await deleteProjectPermission({
            variables: {
              data: {
                userIds: toUpdate.toDelete,
                projectId: projectData.id
              }
            }
        })
        getProjectUsersRefetch()
      }
      
      renderSnackbar(true, "test", "success", () => {})
    } catch (error) {
      
    } finally {
      setPermissionModalOpen(false);
    }
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
          if (data.userId === loggedInUser.id) return null;
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
  
  const isLoading = updateProjectPermissionLoading || updateProjectBidPermissionLoading || deleteProjectPermissionLoading || deleteProjectBidPermissionLoading;
  // TODO: use isVendor
  return <Container>
    {isLoading && <CircularProgress />}

      {
        !isLoading && <>
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
            <Button onClick={() => setPermissionModalOpen(false)} variant="primary">Cancel</Button>
          </DialogActions>
        </>
      }
    
  </Container>
}

export default ProjectPermissionModal;