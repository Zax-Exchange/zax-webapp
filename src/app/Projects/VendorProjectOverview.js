import { useState } from "react";
import Modal from "react-modal";
import VendorProjectDetail from "./VendorProjectDetail";
import Button from '@mui/material/Button';
import { Container, Typography } from "@mui/material";
import { Dialog, DialogContent } from "@mui/material";
import { Card, CardActionArea, CardContent, Grid, Paper } from "@mui/material";
import ProjectPermissionModal from "./ProjectPermissionModal";


const VendorProjectOverview = ({projectData}) => {
  
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isPermissionOpen, setIsPermissionOpen] = useState(false);

    const date = new Date(Date(projectData.createdAt)).toISOString().slice(0, 10);

    return <Grid item xs={4} minHeight={300}>
      <Paper variant="elevation" elevation={3}>
        <Container sx={{ minHeight: 240 }}>
          <Typography variant="h6">Project Name: {projectData.name}</Typography>

          <Typography align="left">Company: {projectData.companyId}</Typography>
          <Typography align="left">Delivery date: {projectData.deliveryDate}</Typography>
          <Typography align="left">Delivery city: {projectData.deliveryCity}</Typography>
          <Typography align="left">Budget: {projectData.budget}</Typography>
          <Typography align="left">Posted on: {date}</Typography>

          <Button onClick={() => setIsProjectOpen(true)} style={{alignSelf: "center"}}>View detail</Button>
          {projectData.bidInfo.permission !== "VIEWER" && <Button onClick={() => setIsPermissionOpen(true)} style={{alignSelf: "center"}}>Share</Button>}
        </Container>
      </Paper>

      
      <Dialog
        open={isProjectOpen}
        onClose={() => setIsProjectOpen(false)}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogContent>
          <VendorProjectDetail projectId={projectData.id} bidInfo={projectData.bidInfo} setIsProjectOpen={setIsProjectOpen}/>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isPermissionOpen}
        onClose={() => setIsPermissionOpen(false)}
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogContent>
          <ProjectPermissionModal projectData={projectData} setIsPermissionOpen={setIsPermissionOpen} isVendor={true}/>
        </DialogContent>
      </Dialog>
    </Grid>
}

export default VendorProjectOverview;