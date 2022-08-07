import { gql, useQuery } from "@apollo/client";
import VendorProjectOverview from "./VendorProjectOverview";
import { Typography, Grid, Container, Fade } from "@mui/material";
import "./Projects.scss";
import FullScreenLoading from "../Utils/Loading";
import CustomerProjectOverview from "./CustomerProjectOverview";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useGetCustomerProjects, useGetVendorProjects } from "./projectHooks";
import CustomSnackbar from "../Utils/CustomSnackbar";


const Projects = () => {
  const {user} = useContext(AuthContext);
  const isVendor = user.isVendor;

  const userId = user.id;
  const { getVendorProjectsData, getVendorProjectsError, getVendorProjectsLoading, getVendorProjectsRefetch } = useGetVendorProjects(userId, !isVendor)
  const { getCustomerProjectsData, getCustomerProjectsError, getCustomerProjectsLoading, getCustomerProjectsRefetch } = useGetCustomerProjects(userId, isVendor);
  const [isProjectPageLoading, setIsProjectPageLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    message: "",
    severity: "",
  });
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  if (getVendorProjectsLoading || getCustomerProjectsLoading) {
    return <Container className="user-projects-container">
      <FullScreenLoading />
    </Container>
  }

  if (getVendorProjectsError || getCustomerProjectsError) {
    return <Container className="user-projects-container">
      Something went wrong!
    </Container>
  }

  let projectOverview;

  if (getVendorProjectsData) {
    projectOverview = getVendorProjectsData.getVendorProjects.map((project, i) => {
      return <VendorProjectOverview 
        key={i} 
        project={project} 
        getVendorProjectsRefetch={getVendorProjectsRefetch}
        setSnackbar={setSnackbar}
        setSnackbarOpen={setSnackbarOpen}
        setIsProjectPageLoading={setIsProjectPageLoading}
      />
    });

  }
  if (getCustomerProjectsData) {
    projectOverview = getCustomerProjectsData.getCustomerProjects.map((project, i) => {
      return <CustomerProjectOverview 
        key={i}
        project={project} 
        getCustomerProjectsRefetch={getCustomerProjectsRefetch}
        setSnackbar={setSnackbar}
        setSnackbarOpen={setSnackbarOpen}
        setIsProjectPageLoading={setIsProjectPageLoading}
      />
    });
  }

  return <Container className="user-projects-container">
    {isProjectPageLoading && <FullScreenLoading />}
    <CustomSnackbar severity={snackbar.severity} direction="right" message={snackbar.message} open={snackbarOpen} onClose={() => setSnackbarOpen(false)} />
    <Fade in={true}>
      <Grid container spacing={2} className="user-projects-inner-container">
        {projectOverview}
      </Grid>
    </Fade>
  </Container>
};

export default Projects