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
import React from "react";
import {
  LoggedInUser,
  Project,
  ProjectComponent,
} from "../../../generated/graphql";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import { VENDOR_ROUTES } from "../../constants/loggedInRoutes";
import { useCreateProjectBidMutation } from "../../gql/create/project/project.generated";
import { useGetVendorProjectsQuery } from "../../gql/get/vendor/vendor.generated";

const ProjectBidModal = ({
  setProjectBidModalOpen,
  projectId,
  projectData,
}: {
  setProjectBidModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projectId?: string;
  projectData: Project;
}) => {
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const { user }: { user: LoggedInUser | null } = useContext(AuthContext);
  const navigate = useNavigate();

  const [
    createProjectBid,
    { loading: createProjectBidLoading, error: createProjectBidError },
  ] = useCreateProjectBidMutation();

  const { refetch: getVendorProjectsRefetch } = useGetVendorProjectsQuery({
    variables: {
      data: {
        userId: user!.id,
      },
    },
    skip: true,
  });

  const [comments, setComments] = useState("");
  const [componentsQpData, setComponentQpData] = useState<
    Record<string, any[]>
  >({});

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
            projectId: projectId!,
            comments,
            components,
          },
        },
      });
      // getVendorProjectsRefetch();
      setSnackbar({
        severity: "success",
        message: "Bid created.",
      });
      navigate(VENDOR_ROUTES.PROJECTS);
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

  if (!projectId) {
    navigate(-1);
    return null;
  }

  const {
    name: projectName,
    deliveryDate,
    deliveryAddress,
    budget,
    design,
    status,
    components,
  } = projectData;

  return (
    <Container className="project-bid-container">
      {createProjectBidLoading && <FullScreenLoading />}
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
                component={comp as ProjectComponent}
                setComponentQpData={setComponentQpData}
                componentsQpData={componentsQpData}
              />
            );
          })}
        </Grid>

        <Container>
          <Button onClick={submitBid}>Submit</Button>
          <Button onClick={() => setProjectBidModalOpen(false)}>Cancel</Button>
        </Container>
      </Grid>
    </Container>
  );
};

export default ProjectBidModal;
