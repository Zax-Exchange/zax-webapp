import { useState } from "react";
import Modal from "react-modal";
import VendorProjectDetail from "./VendorProjectDetail";
import Button from '@mui/material/Button';
import { Container, Typography } from "@mui/material";
import { Dialog, DialogContent } from "@mui/material";
import { Card, CardActionArea, CardContent, Grid, Paper } from "@mui/material";
import ProjectPermissionModal from "./ProjectPermissionModal";
import { useNavigate } from "react-router-dom";


const VendorProjectOverview = ({project}) => {
  const navigate = useNavigate();
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isPermissionOpen, setIsPermissionOpen] = useState(false);

  const date = new Date(Date(project.createdAt)).toISOString().slice(0, 10);

  const openVendorProjectDetail = () => {
    navigate("/vendor-project-detail", {
      state: {
        projectId: project.id,
        bidInfo: project.bidInfo
      }
    })
  }

  return <Grid item xs={4} minHeight={300}>
    <Paper variant="elevation" elevation={3}>
      <Container sx={{ minHeight: 240 }}>
        <Typography variant="h6">Project Name: {project.name}</Typography>

        <Typography align="left">Company: {project.companyId}</Typography>
        <Typography align="left">Delivery date: {project.deliveryDate}</Typography>
        <Typography align="left">Delivery city: {project.deliveryCity}</Typography>
        <Typography align="left">Budget: {project.budget}</Typography>
        <Typography align="left">Posted on: {date}</Typography>

        <Button onClick={openVendorProjectDetail} style={{alignSelf: "center"}}>View detail</Button>
        {project.bidInfo.permission !== "VIEWER" && <Button onClick={() => setIsPermissionOpen(true)} style={{alignSelf: "center"}}>Share</Button>}
      </Container>
    </Paper>

    

    <Dialog
      open={isPermissionOpen}
      onClose={() => setIsPermissionOpen(false)}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogContent>
        <ProjectPermissionModal project={project} setIsPermissionOpen={setIsPermissionOpen}/>
      </DialogContent>
    </Dialog>
  </Grid>
}

export default VendorProjectOverview;