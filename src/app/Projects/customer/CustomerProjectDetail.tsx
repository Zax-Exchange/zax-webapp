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
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import FullScreenLoading from "../../Utils/Loading";
import { ProjectOverviewListItem } from "./CustomerProjectOverview";
import styled from "@emotion/styled";
import { ProjectBid, ProjectComponent } from "../../../generated/graphql";
import React from "react";
import { CUSTOMER_ROUTES } from "../../constants/loggedInRoutes";
import { useGetCustomerProjectQuery } from "../../gql/get/customer/customer.generated";
import useCustomSnackbar from "../../Utils/CustomSnackbar";

const ProjectDetailListItem = styled(ProjectOverviewListItem)(() => ({
  flexDirection: "column",
  alignItems: "flex-start",
}));
const CustomerProjectDetail = () => {
  const { projectId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const { data, loading, error, refetch } = useGetCustomerProjectQuery({
    variables: {
      data: {
        projectId: projectId || "",
        userId: user!.id,
      },
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (error) {
      setSnackbar({
        message: "Could not load your project. Please try again later.",
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [error]);
  const getComponentName = (
    componentId: string,
    components: ProjectComponent[]
  ) => {
    const comp = components.find((comp) => comp.id === componentId);
    if (comp) return comp.name;
  };

  const convertToDate = (timestamp: string) => {
    return new Date(parseInt(timestamp, 10)).toISOString().slice(0, 10);
  };

  const backButtonHandler = () => {
    navigate(CUSTOMER_ROUTES.PROJECTS);
  };

  if (loading) {
    return <FullScreenLoading />;
  }

  if (error) {
    return (
      <Container>
        <Typography variant="subtitle2">
          Cannot load your project at this time.
        </Typography>
      </Container>
    );
  }

  const projectData = data?.getCustomerProject;
  const bids = projectData?.bids;
  console.log(projectData);
  if (projectData) {
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
              {bids &&
                bids.map((bid) => {
                  return (
                    <>
                      <ListItem>
                        <VendorBidOverview
                          bid={bid as ProjectBid}
                          projectComponents={
                            projectData.components as ProjectComponent[]
                          }
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
            <Paper sx={{ padding: 3 }} elevation={1}>
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
                  <Typography variant="caption">
                    {projectData.budget}
                  </Typography>
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
                <Paper sx={{ marginTop: 1, padding: 3 }} elevation={1}>
                  <List>
                    <ProjectDetailListItem>
                      <Typography variant="subtitle2">Name</Typography>
                      <Typography variant="caption">{comp.name}</Typography>
                    </ProjectDetailListItem>
                    <ProjectDetailListItem>
                      <Typography variant="subtitle2">Product</Typography>
                      <Typography variant="caption">
                        {comp.componentSpec.productName}
                      </Typography>
                    </ProjectDetailListItem>
                    <ProjectDetailListItem>
                      <Typography variant="subtitle2">Dimension</Typography>
                      <Typography variant="caption">
                        {comp.componentSpec.dimension}
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
  }
  return null;
};

export default CustomerProjectDetail;
