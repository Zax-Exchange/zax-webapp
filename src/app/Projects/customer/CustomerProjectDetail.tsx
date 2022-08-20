import {
  Grid,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  IconButton,
  Button,
  Link,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import VendorBidOverview from "./VendorBidOverview";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useGetCustomerProject } from "../../hooks/projectHooks";
import FullScreenLoading from "../../Utils/Loading";
import { ProjectOverviewListItem } from "./CustomerProjectOverview";
import styled from "@emotion/styled";

const ProjectDetailListItem = styled(ProjectOverviewListItem)(() => ({
  flexDirection: "column",
  alignItems: "flex-start",
}));
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
                </>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={8}>
          <Container>
            <Typography variant="h6">Project Detail</Typography>
          </Container>
          <Paper sx={{ padding: 3 }}>
            <List>
              <ProjectDetailListItem>
                <Typography variant="subtitle2">Project Name</Typography>
                <Typography variant="caption">{projectData.name}</Typography>
              </ProjectDetailListItem>
              {/* <ProjectDetailListItem>
                <Typography variant="subtitle2">Posted By</Typography>
                <Typography variant="caption">{projectData.userId}</Typography>
              </ProjectDetailListItem> */}
              <ProjectDetailListItem>
                <Typography variant="subtitle2">Delivery Date</Typography>
                <Typography variant="caption">
                  {projectData.deliveryDate}
                </Typography>
              </ProjectDetailListItem>
              <ProjectDetailListItem>
                <Typography variant="subtitle2">Delivery Address</Typography>
                <Typography variant="caption">
                  {projectData.deliveryAddress}
                </Typography>
              </ProjectDetailListItem>

              {projectData.design && (
                <ProjectDetailListItem>
                  <Typography variant="subtitle2">Design</Typography>

                  <Link
                    href={projectData.design.url}
                    target="_blank"
                    rel="noopener"
                  >
                    {projectData.design.fileName}
                  </Link>
                </ProjectDetailListItem>
              )}
              <ProjectDetailListItem>
                <Typography variant="subtitle2">Budget</Typography>
                <Typography variant="caption">{projectData.budget}</Typography>
              </ProjectDetailListItem>
              <ProjectDetailListItem>
                <Typography variant="subtitle2">Posted on</Typography>
                <Typography variant="caption">
                  {convertToDate(projectData.createdAt)}
                </Typography>
              </ProjectDetailListItem>
            </List>
          </Paper>
          {projectData.components.map((comp) => {
            return (
              <Paper sx={{ marginTop: 1, padding: 3 }}>
                <List>
                  <ProjectDetailListItem>
                    <Typography variant="subtitle2">Name</Typography>
                    <Typography variant="caption">{comp.name}</Typography>
                  </ProjectDetailListItem>

                  <ProjectDetailListItem>
                    <Typography variant="subtitle2">Materials</Typography>
                    <Typography variant="caption">
                      {comp.materials.join(",")}
                    </Typography>
                  </ProjectDetailListItem>

                  <ProjectDetailListItem>
                    <Typography variant="subtitle2">Dimension</Typography>
                    <Typography variant="caption">{comp.dimension}</Typography>
                  </ProjectDetailListItem>

                  <ProjectDetailListItem>
                    <Typography variant="subtitle2">Post process</Typography>
                    <Typography variant="caption">
                      {comp.postProcess}
                    </Typography>
                  </ProjectDetailListItem>
                </List>
              </Paper>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CustomerProjectDetail;
