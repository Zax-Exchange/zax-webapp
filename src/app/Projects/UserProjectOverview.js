import { useState } from "react";
import Modal from "react-modal";
import UserProjectDetail from "./UserProjectDetail";
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import { Dialog, DialogContent } from "@mui/material";
import { Card, CardActionArea, CardContent, Grid } from "@mui/material";
import ProjectPermission from "./ProjectPermission";


const UserProjectOverview = ({projectData}) => {
  
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isPermissionOpen, setIsPermissionOpen] = useState(false);


  // TODO: use isVendor
  if (true) {
    const date = new Date(Date(projectData.createdAt)).toISOString().slice(0, 10);

    return <Grid item >
      <Card className="user-project-overview-container" variant="elevation" elevation={2}>
        <CardActionArea>
          <CardContent>
            <Typography variant="h6">Project Name: {projectData.name}</Typography>

            <Typography align="left">Company: {projectData.companyId}</Typography>
            <Typography align="left">Delivery date: {projectData.deliveryDate}</Typography>
            <Typography align="left">Delivery city: {projectData.deliveryCity}</Typography>
            <Typography align="left">Budget: {projectData.budget}</Typography>
            <Typography align="left">Posted on: {date}</Typography>

            <Button onClick={() => setIsProjectOpen(true)} style={{alignSelf: "center"}}>View detail</Button>
            {projectData.bidInfo.permission !== "VIEWER" && <Button onClick={() => setIsPermissionOpen(true)} style={{alignSelf: "center"}}>Share</Button>}
          </CardContent>
        </CardActionArea>
        <Dialog
          open={isProjectOpen}
          onClose={() => setIsProjectOpen(false)}
        >
          <DialogContent>
            <UserProjectDetail projectId={projectData.id} bidInfo={projectData.bidInfo} setIsProjectOpen={setIsProjectOpen}/>
          </DialogContent>
        </Dialog>
        <Dialog
          open={isPermissionOpen}
          onClose={() => setIsPermissionOpen(false)}
        >
          <DialogContent>
            <ProjectPermission projectData={projectData} setIsPermissionOpen={setIsPermissionOpen} isVendor={true}/>
          </DialogContent>
        </Dialog>
      </Card>
    </Grid>
  }
  return null;
}

export default UserProjectOverview;