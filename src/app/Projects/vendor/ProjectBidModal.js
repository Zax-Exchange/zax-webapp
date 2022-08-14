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
} from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";
import {
  useGetVendorProjects,
  useCreateProjectBid,
  useGetProjectDetail,
} from "../../hooks/projectHooks";
import FullScreenLoading from "../../Utils/Loading";

const ProjectBidModal = ({
  projectId,
  setIsOpen,
  setSnackbar,
  setSnackbarOpen,
}) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    getProjectDetailData,
    getProjectDetailError,
    getProjectDetailLoading,
  } = useGetProjectDetail(projectId);

  const { createProjectBid, createProjectBidLoading, createProjectBidError } =
    useCreateProjectBid();

  const { getVendorProjectsRefetch } = useGetVendorProjects(user.id);

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
            userId: user.id,
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
      setIsOpen(false);
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

              <ListItem>
                <Typography>design: {design}</Typography>
              </ListItem>
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
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          </Container>
        </Grid>
      </Container>
    );
  }
};

export default ProjectBidModal;
