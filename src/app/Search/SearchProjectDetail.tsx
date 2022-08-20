import { gql, useQuery } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchProjectDetail.scss";
import {
  Dialog,
  Container,
  Typography,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Paper,
  Link,
} from "@mui/material";
import ProjectBidModal from "../Projects/vendor/ProjectBidModal";
import { useState } from "react";
import { useGetProjectDetail } from "../hooks/projectHooks";
import FullScreenLoading from "../Utils/Loading";
import CustomSnackbar from "../Utils/CustomSnackbar";

const SearchProjectDetail = () => {
  const { state } = useLocation();

  const {
    getProjectDetailData,
    getProjectDetailError,
    getProjectDetailLoading,
  } = useGetProjectDetail(state.projectId);

  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    severity: "",
    message: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {};

  const closeModal = () => {
    setIsOpen(false);
  };

  const bidProjectHandler = () => {
    setIsOpen(true);
    // navigate("/project-bid", {state: {projectId: state.projectId}});
  };
  const backHandler = () => {
    navigate(-1);
  };

  const renderProjectDetail = () => {
    const {
      name: projectName,
      deliveryDate,
      deliveryAddress,
      budget,
      design,
      status,
      components,
    } = getProjectDetailData.getProjectDetail;

    return (
      <Container>
        <Typography>Project Detail</Typography>
        <Paper
          variant="outlined"
          style={{ padding: "12px", marginBottom: "8px" }}
        >
          <Container style={{ width: "60%" }}>
            <Container
              className="project-info-container"
              style={{ textAlign: "left" }}
            >
              <Typography>name: {projectName}</Typography>
              <Typography>deliveryDate: {deliveryDate}</Typography>
              <Typography>deliveryAddress: {deliveryAddress}</Typography>
              <Typography>budget: {budget}</Typography>
              {design && (
                <Typography>
                  Design:{" "}
                  <Link href={design.url} target="_blank" rel="noopener">
                    {design.fileName}
                  </Link>
                </Typography>
              )}
              <Typography>status: {status}</Typography>
            </Container>
          </Container>
        </Paper>

        <Typography>Components Detail</Typography>

        {components.map((comp, i) => {
          const { name, materials, dimension, postProcess } = comp;
          return (
            <Paper style={{ padding: "12px", marginBottom: "8px" }}>
              <Container style={{ width: "60%" }}>
                <Container
                  className="component-detail-container"
                  key={i}
                  style={{ textAlign: "left" }}
                >
                  <Typography>name: {name}</Typography>
                  <Typography>materials: {materials.join(",")}</Typography>
                  <Typography>dimension: {dimension}</Typography>
                  <Typography>post process: {postProcess}</Typography>
                </Container>
              </Container>
            </Paper>
          );
        })}
      </Container>
    );
  };

  if (getProjectDetailLoading) {
    return <FullScreenLoading />;
  }

  if (getProjectDetailData && getProjectDetailData.getProjectDetail) {
    return (
      <Container className="project-detail-container">
        <CustomSnackbar
          open={snackbarOpen}
          severity={snackbar.severity}
          message={snackbar.message}
          direction="right"
          onClose={() => setSnackbarOpen(false)}
        />
        {renderProjectDetail()}

        <Button onClick={bidProjectHandler}>Bid Project</Button>
        <Button onClick={backHandler}>Back</Button>

        <Dialog
          open={modalIsOpen}
          onClose={closeModal}
          fullWidth={true}
          maxWidth="md"
        >
          <ProjectBidModal
            projectId={state.projectId}
            setIsOpen={setIsOpen}
            setSnackbar={setSnackbar}
            setSnackbarOpen={setSnackbarOpen}
          />
        </Dialog>
      </Container>
    );
  }
  return null;
};

export default SearchProjectDetail;
