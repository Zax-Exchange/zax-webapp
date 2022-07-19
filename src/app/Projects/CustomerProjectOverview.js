import { useState } from "react";
import { 
  Grid,
  Paper,
  Container,
  Typography,
  Button,
  Dialog,
  DialogContent
 } from "@mui/material";
import ProjectPermissionModal from "./ProjectPermissionModal";
import { useNavigate } from "react-router-dom";

const CustomerProjectOverview = ({ project }) => {
  const navigate = useNavigate();
  const [isPermissionOpen, setIsPermissionOpen] = useState(false);

  const date = new Date(Date(project.createdAt)).toISOString().slice(0, 10);

  const viewDetailHandler = () => {
    navigate("/customer-project-detail", {
      state: {
        project
      }
    })
  };

    return <Grid item xs={4} minHeight={300}>
      <Paper variant="elevation" elevation={3}>
        <Container sx={{ minHeight: 240 }}>
          <Typography variant="h6">Project Name: {project.name}</Typography>

          <Typography align="left">Company: {project.companyId}</Typography>
          <Typography align="left">Delivery date: {project.deliveryDate}</Typography>
          <Typography align="left">Delivery city: {project.deliveryCity}</Typography>
          <Typography align="left">Budget: {project.budget}</Typography>
          <Typography align="left">Posted on: {date}</Typography>

          <Button style={{alignSelf: "center"}} onClick={viewDetailHandler}>View detail</Button>
          {project.permission !== "VIEWER" && <Button onClick={() => setIsPermissionOpen(true)} style={{alignSelf: "center"}}>Share</Button>}
        </Container>
      </Paper>

      <Dialog
        open={isPermissionOpen}
        onClose={() => setIsPermissionOpen(false)}
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogContent>
          <ProjectPermissionModal projectData={project} setIsPermissionOpen={setIsPermissionOpen}/>
        </DialogContent>
      </Dialog>
    </Grid>
};

export default CustomerProjectOverview;