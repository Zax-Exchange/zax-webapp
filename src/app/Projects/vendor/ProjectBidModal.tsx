import { useNavigate } from "react-router-dom";
import ProjectBidComponent from "./ProjectBidComponent";
import { useContext, useState } from "react";
import {
  Container,
  Button,
  Typography,
  List,
  ListItem,
  Grid,
  Link,
  AlertColor,
} from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";

import FullScreenLoading from "../../Utils/Loading";
import { useGetProjectDetail } from "../../hooks/get/projectHooks";
import { useCreateProjectBid } from "../../hooks/create/projectHooks";
import { LoggedInUser } from "../../hooks/types/user/userTypes";
import { useGetVendorProjects } from "../../hooks/get/vendorHooks";
import React from "react";

const ProjectBidModal = ({
  setProjectBidModalOpen,
  projectId,
  setSnackbar,
  setSnackbarOpen,
}: {
  setProjectBidModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
  setSnackbar: React.Dispatch<
    React.SetStateAction<{
      message: string | "";
      severity: AlertColor | undefined;
    }>
  >;
  setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user }: { user: LoggedInUser | null } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    getProjectDetailData,
    getProjectDetailError,
    getProjectDetailLoading,
  } = useGetProjectDetail(projectId);

  const { createProjectBid, createProjectBidLoading, createProjectBidError } =
    useCreateProjectBid();

  const { getVendorProjectsRefetch } = useGetVendorProjects(user!.id, true);

  const [comments, setComments] = useState("");
  const [componentsQpData, setComponentQpData] = useState({});

  if (getProjectDetailLoading) return <FullScreenLoading />;

  const submitBid = async () => {
    const components = [];
    for (let id in componentsQpData) {
      components.push({
        projectComponentId: id,
        quantityPrices: componentsQpData[id],
      });
    }

    try {
      await createProjectBid({
        variables: {
          data: {
            userId: user!.id,
            projectId,
            comments,
            components,
          },
        },
      });
      setSnackbar({
        severity: "success",
        message: "Bid created.",
      });
      setSnackbarOpen(true);
      navigate("/projects");
    } catch (error) {
      setSnackbar({
        severity: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setProjectBidModalOpen(false);
      setSnackbarOpen(true);
    }
  };

  if (getProjectDetailData && getProjectDetailData.getProjectDetail) {
    const {
      name: projectName,
      deliveryDate,
      deliveryAddress,
      budget,
      design,
      status,
      components,
    } = getProjectDetailData.getProjectDetail;

    {
      createProjectBidLoading && <FullScreenLoading />;
    }
    return (
      <Container className="project-bid-container">
        <Grid container>
          <Grid item xs={6}>
            <Typography>Project Detail</Typography>
            <List>
              <ListItem>
                <Typography>name: {projectName}</Typography>
              </ListItem>
              <ListItem>
                <Typography>deliveryDate: {deliveryDate}</Typography>
              </ListItem>
              <ListItem>
                <Typography>deliveryAddress: {deliveryAddress}</Typography>
              </ListItem>
              <ListItem>
                <Typography>budget: {budget}</Typography>
              </ListItem>
              {design && (
                <ListItem>
                  <Typography>
                    Design:{" "}
                    <Link href={design.url} target="_blank" rel="noopener">
                      {design.fileName}
                    </Link>
                  </Typography>
                </ListItem>
              )}
              <ListItem>
                <Typography>status: {status}</Typography>
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={6}>
            <Typography>Components Detail</Typography>

            {components.map((comp) => {
              return (
                <ProjectBidComponent
                  component={comp}
                  setComponentQpData={setComponentQpData}
                  componentsQpData={componentsQpData}
                />
              );
            })}
          </Grid>

          <Container>
            <Button onClick={submitBid}>Submit</Button>
            <Button onClick={() => setProjectBidModalOpen(false)}>
              Cancel
            </Button>
          </Container>
        </Grid>
      </Container>
    );
  }
};

export default ProjectBidModal;
