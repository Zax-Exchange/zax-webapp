import {
  Grid,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  IconButton,
  Fade,
  Button,
  Drawer,
  Divider,
  Box,
  Dialog,
  DialogContent,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import VendorBidOverview from "./VendorBidOverview";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useGetCustomerProject } from "../../hooks/projectHooks";
import FullScreenLoading from "../../Utils/Loading";
import Conversation from "../Conversation";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

const drawerWidth = 240;

const ProjectDetailContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

const CustomerProjectDetail = () => {
  const theme = useTheme();
  console.log(theme);
  const t = theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  });
  console.log(t);
  const { projectId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    getCustomerProjectData,
    getCustomerProjectError,
    getCustomerProjectLoading,
    getCustomerProjectRefetch,
  } = useGetCustomerProject({ userId: user.id, projectId });

  const [conversationOpen, setConversationOpen] = useState(false);
  const getComponentName = (componentId, components) => {
    return components.find((comp) => comp.id === componentId).name;
  };

  const convertToDate = (timestamp) => {
    return new Date(Date(timestamp)).toISOString().slice(0, 10);
  };

  const backButtonHandler = () => {
    navigate("/projects");
  };

  if (getCustomerProjectLoading) {
    return <FullScreenLoading />;
  }

  if (getCustomerProjectError) {
    return (
      <Container>
        <Button onClick={getCustomerProjectRefetch}>retry</Button>
      </Container>
    );
  }

  const projectData = getCustomerProjectData.getCustomerProject;
  const { bids } = projectData;
  return (
    <Container open={conversationOpen}>
      <Container disableGutters style={{ textAlign: "left" }}>
        <IconButton onClick={backButtonHandler}>
          <KeyboardBackspaceIcon />
        </IconButton>
      </Container>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Container>
            <Typography variant="h6">Vendor Bids</Typography>
          </Container>
          <List sx={{ maxHeight: 500 }}>
            {bids.map((bid) => {
              return (
                <>
                  <ListItem>
                    <VendorBidOverview
                      bid={bid}
                      projectComponents={projectData.components}
                      setConversationOpen={setConversationOpen}
                    />
                  </ListItem>
                </>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={8}>
          <Container>
            <Typography variant="h6">Project Detail</Typography>
          </Container>
          <Paper>
            <List>
              <ListItem>
                <Typography>Project Name: {projectData.name}</Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  Delivery Date: {projectData.deliveryDate}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  Delivery Address: {projectData.deliveryAddress}
                </Typography>
              </ListItem>

              <ListItem>
                <Typography>Design: {projectData.design}</Typography>
              </ListItem>
              <ListItem>
                <Typography>Budget: {projectData.budget}</Typography>
              </ListItem>
              <ListItem>
                <Typography>Status: {projectData.status}</Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  Posted on: {convertToDate(projectData.createdAt)}
                </Typography>
              </ListItem>
            </List>
          </Paper>
          {projectData.components.map((comp) => {
            return (
              <Paper style={{ marginTop: "8px" }}>
                <List>
                  <ListItem>
                    <Typography>Name: {comp.name}</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      Materials: {comp.materials.join(",")}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>Dimension: {comp.dimension}</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>Post process: {comp.postProcess}</Typography>
                  </ListItem>
                </List>
              </Paper>
            );
          })}
        </Grid>
      </Grid>

      <Dialog
        open={conversationOpen}
        onClose={() => setConversationOpen(false)}
        maxWidth="xl"
        fullWidth={true}
      >
        <DialogContent>
          <Conversation
            setConversationOpen={setConversationOpen}
            conversationOpen={conversationOpen}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default CustomerProjectDetail;
