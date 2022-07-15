import { useState } from "react";
import Modal from "react-modal";
import UserProjectDetail from "./UserProjectDetail";
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import { Dialog, DialogContent } from "@mui/material";
import { Card, CardActionArea, CardContent, Grid } from "@mui/material";
const UserProjectOverview = ({projectData}) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  }

  const afterOpenModal = () => {
    
  }

  const closeModal = () => {
    setIsOpen(false);
  }

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

            <Button onClick={openModal} style={{alignSelf: "center"}}>View detail</Button>
          </CardContent>
        </CardActionArea>
        <Dialog
          open={isOpen}
          onClose={closeModal}
        >
          <DialogContent>
            <UserProjectDetail projectId={projectData.id} bidInfo={projectData.bidInfo} closeModal={closeModal}/>
          </DialogContent>
        </Dialog>
      </Card>
    </Grid>
  }
  return null;
}

export default UserProjectOverview;