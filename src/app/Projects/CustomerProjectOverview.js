import { useState } from "react";
import { 
  Grid,
  Paper,
  Container,
  Typography,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Menu,
  MenuItem,
  DialogActions,
 } from "@mui/material";
import ProjectPermissionModal from "./ProjectPermissionModal";
import { useNavigate } from "react-router-dom";
import MoreIcon from '@mui/icons-material/MoreHoriz';
import DeleteProjectModal from "./DeleteProjectModal";

const CustomerProjectOverview = ({ project, getCustomerProjectsRefetch }) => {
  const navigate = useNavigate();
  const [permissionModalOpen, setPermissionModalOpen] = useState(false);
  const [projectMenuAnchor, setProjectMenuAnchor] = useState(null);
  const [deleteProjectModalOpen, setDeleteProjectModalOpen] = useState(false);
  const projectMenuOpen = !!projectMenuAnchor;
  const date = new Date(parseInt(project.createdAt)).toISOString().slice(0, 10);

  const viewDetailHandler = () => {
    navigate("/customer-project-detail", {
      state: {
        project
      }
    })
  };

  const moreOnClick = (e) => {
    setProjectMenuAnchor(e.currentTarget)
  }

  const moreOnClose = () => {
    setProjectMenuAnchor(null);
  }

  const projectMenuOnClick = (e) => {
    if (e.target.innerText === "View detail") {
      viewDetailHandler();
    }
    if (e.target.innerText === "Share") {
      setPermissionModalOpen(true)
    }

    if (e.target.innerText === "Delete") {
      setDeleteProjectModalOpen(true);
    }

    moreOnClose();
  } 

  return <Grid item xs={4} minHeight={300}>
    <Paper variant="elevation" elevation={3} sx={{position: "relative"}}>
      <IconButton
        sx={{position: "absolute", right: "4px" }}
        id="long-button"
        onClick={moreOnClick}
        onClose={moreOnClose}
      >
        <MoreIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={projectMenuAnchor}
        open={projectMenuOpen}
        onClose={moreOnClose}
        
        PaperProps={{
          style: {
            maxHeight: "120px"
          },
        }}
      >
        <MenuItem onClick={projectMenuOnClick}>
          View detail
        </MenuItem>

        <MenuItem onClick={projectMenuOnClick} disabled={project.permission === "VIEWER"}>
          Share
        </MenuItem>

        <MenuItem onClick={projectMenuOnClick} disabled={project.permission === "VIEWER" || project.status !== "OPEN"}>
          Delete
        </MenuItem>

      </Menu>
      <Container sx={{ minHeight: 240 }}>
        <Typography variant="h6" align="left">{project.name}</Typography>

        {/* <Typography align="left">Company: {project.companyId}</Typography> */}
        <Typography align="left">Delivery date: {project.deliveryDate}</Typography>
        <Typography align="left">Delivery country: {project.deliveryCountry}</Typography>
        <Typography align="left">Delivery city: {project.deliveryCity}</Typography>
        <Typography align="left">Budget: {project.budget}</Typography>
        <Typography align="left">Posted on: {date}</Typography>
        <Typography align="left">Status: {project.status}</Typography>

        {/* <Button style={{alignSelf: "center"}} onClick={viewDetailHandler}>View detail</Button> */}
        {/* {project.permission !== "VIEWER" && <Button onClick={() => setPermissionModalOpen(true)} style={{alignSelf: "center"}}>Share</Button>} */}
      </Container>
    </Paper>

    <DeleteProjectModal 
      deleteProjectModalOpen={deleteProjectModalOpen}
      setDeleteProjectModalOpen={setDeleteProjectModalOpen}
      getCustomerProjectsRefetch={getCustomerProjectsRefetch}
      projectId={project.id}
    />

    <Dialog
      open={permissionModalOpen}
      onClose={() => setPermissionModalOpen(false)}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogContent>
        <ProjectPermissionModal projectData={project} setPermissionModalOpen={setPermissionModalOpen}/>
      </DialogContent>
    </Dialog>
    </Grid>
};

export default CustomerProjectOverview;