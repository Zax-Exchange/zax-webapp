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
import FullScreenLoading from "../../Utils/Loading";
import { ProjectOverviewListItem } from "./CustomerProjectOverview";
import styled from "@emotion/styled";
import { ProjectComponent, useGetCustomerProjectQuery } from "../../../generated/graphql";
import React from "react";

const ProjectDetailListItem = styled(ProjectOverviewListItem)(() => ({
  flexDirection: "column",
  alignItems: "flex-start",
}));
const CustomerProjectDetail = () => {
  const { projectId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useGetCustomerProjectQuery({
    variables: { 
      data: {
        projectId: projectId || "",
        userId: user!.id
      }
     }
  });

  const getComponentName = (componentId: string, components: ProjectComponent[]) => {
    const comp = components.find((comp) => comp.id === componentId);
    if (comp) return comp.name;
  };

  const convertToDate = (timestamp: string) => {
    return new Date(new Date(timestamp)).toISOString().slice(0, 10);
  };

  const backButtonHandler = () => {
    navigate("/projects");
  };

  if (loading) {
    return <FullScreenLoading />;
  }

  if (error) {
    return (
      <Container>
        <Button onClick={() => refetch()}>retry</Button>
      </Container>
    );
  }
  const projectData = data!.getCustomerProject;
  const bids = projectData?.bids;

  if (projectData) {
    return <Container>
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
              {bids && bids.map((bid) => {
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

  }
};

export default CustomerProjectDetail;
