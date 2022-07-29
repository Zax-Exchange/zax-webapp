import { gql, useQuery } from "@apollo/client";
import VendorProjectOverview from "./VendorProjectOverview";
import { Typography, Grid, Container } from "@mui/material";
import "./Projects.scss";
import FullScreenLoading from "../Utils/Loading";
import CustomerProjectOverview from "./CustomerProjectOverview";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useGetCustomerProjects, useGetVendorProjects } from "./hooks";
import ProjectSnackbar from "../Utils/ProjectSnackbar";


const Projects = () => {
  const {user} = useContext(AuthContext);
  const isVendor = user.isVendor;

  const userId = user.id;
  const { getVendorProjectsData, getVendorProjectsError, getVendorProjectsLoading, getVendorProjectsRefetch } = useGetVendorProjects(userId, !isVendor)
  const { getCustomerProjectsData, getCustomerProjectsError, getCustomerProjectsLoading, getCustomerProjectsRefetch } = useGetCustomerProjects(userId, isVendor);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [isProjectPageLoading, setIsProjectPageLoading] = useState(false);
  
  useEffect(() => {}, [])
  if (isProjectPageLoading) {
    return <Container className="user-projects-container">
      <FullScreenLoading />
    </Container>
  }

  // if (getVendorProjectsError || getCustomerProjectsError) {
  //   return <Container className="user-projects-container">
  //     Something went wrong!
  //   </Container>
  // }

  let projectOverview;

  if (getVendorProjectsData) {
    projectOverview = getVendorProjectsData.getVendorProjects.map((project, i) => {
      return <VendorProjectOverview projectData={project} key={i} getVendorProjectsRefetch={getVendorProjectsRefetch}/>
    });

  }
  if (getCustomerProjectsData) {
    projectOverview = getCustomerProjectsData.getCustomerProjects.map((project, i) => {
      return <CustomerProjectOverview 
        project={project} 
        getCustomerProjectsRefetch={getCustomerProjectsRefetch}
        setDeleteSnackbarOpen={setDeleteSnackbarOpen}
        setIsProjectPageLoading={setIsProjectPageLoading}
        setErrorSnackbarOpen={setErrorSnackbarOpen}
      />
    });
  }

  return <Container className="user-projects-container">
    <ProjectSnackbar severity="success" direction="right" message="Project deleted." open={deleteSnackbarOpen} onClose={() => setDeleteSnackbarOpen(false)} />
    <ProjectSnackbar severity="error" direction="right" message="Something went wrong, please try again." open={errorSnackbarOpen} onClose={() => setErrorSnackbarOpen(false)} />
    <Grid container spacing={2} className="user-projects-inner-container">
      {projectOverview}
    </Grid>
  </Container>
};

export default Projects