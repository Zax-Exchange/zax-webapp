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
import FullScreenLoading from "../Utils/Loading";
import CustomSnackbar from "../Utils/CustomSnackbar";
import { useGetProjectDetail } from "../hooks/get/projectHooks";
import React from "react";
import useCustomSnackbar from "../Utils/CustomSnackbar";

const SearchProjectDetail = () => {
  const { state }: { state: any } = useLocation();
  const { setSnackbar, setSnackbarOpen, CustomSnackbar } = useCustomSnackbar();
  const {
    getProjectDetailData,
    getProjectDetailError,
    getProjectDetailLoading,
  } = useGetProjectDetail(state.projectId);

  const navigate = useNavigate();
  const [projectBidModalOpen, setProjectBidModalOpen] = useState(false);

  const openModal = () => {
    setProjectBidModalOpen(true);
  };

  const afterOpenModal = () => {};

  const closeModal = () => {
    setProjectBidModalOpen(false);
  };

  const bidProjectHandler = () => {
    setProjectBidModalOpen(true);
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
        {CustomSnackbar}
        {renderProjectDetail()}

        <Button onClick={bidProjectHandler}>Bid Project</Button>
        <Button onClick={backHandler}>Back</Button>

        <Dialog
          open={projectBidModalOpen}
          onClose={closeModal}
          fullWidth={true}
          maxWidth="md"
        >
          <ProjectBidModal
            setProjectBidModalOpen={setProjectBidModalOpen}
            projectId={state.projectId}
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