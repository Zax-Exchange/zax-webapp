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
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import VendorBidOverview from "./VendorBidOverview";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useGetCustomerProject } from "../hooks/projectHooks";
import FullScreenLoading from "../Utils/Loading";

const CustomerProjectDetail = () => {
  const { projectId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    getCustomerProjectData,
    getCustomerProjectError,
    getCustomerProjectLoading,
    getCustomerProjectRefetch,
  } = useGetCustomerProject({ userId: user.id, projectId });

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
    <Fade in={true}>
      <Container>
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
                      />
                    </ListItem>
                    {/* <ListItem>
                      <VendorBidOverview
                        bid={bid}
                        projectComponents={projectData.components}
                      />
                    </ListItem>
                    <ListItem>
                      <VendorBidOverview
                        bid={bid}
                        projectComponents={projectData.components}
                      />
                    </ListItem> */}
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
      </Container>
    </Fade>
  );
};

export default CustomerProjectDetail;
