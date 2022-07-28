import { gql, useQuery } from "@apollo/client";
import VendorProjectOverview from "./VendorProjectOverview";
import { Typography, Grid } from "@mui/material";
import "./Projects.scss";
import FullScreenLoading from "../Utils/Loading";
import CustomerProjectOverview from "./CustomerProjectOverview";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useGetCustomerProjects, useGetVendorProjects } from "./hooks";


const Projects = () => {
  const {user} = useContext(AuthContext);
  const isVendor = user.isVendor;

  const userId = user.id;
  const { getVendorProjectsData, getVendorProjectsError, getVendorProjectsLoading, getVendorProjectsRefetch } = useGetVendorProjects(userId, !isVendor)
  const { getCustomerProjectsData, getCustomerProjectsError, getCustomerProjectsLoading, getCustomerProjectsRefetch } = useGetCustomerProjects(userId, isVendor);

  if (getVendorProjectsLoading || getCustomerProjectsLoading) {
    return <div className="user-projects-container">
      <FullScreenLoading />
    </div>
  }
  if (getVendorProjectsData) {
      return (
        <div className="user-projects-container">
          <Typography variant="h3">Projects PAGE</Typography>

          <Grid container spacing={2} className="user-projects-inner-container">
            {
              getVendorProjectsData.getVendorProjects.map((project, i) => {
                return <VendorProjectOverview projectData={project} key={i} getVendorProjectsRefetch={getVendorProjectsRefetch}/>
              })
            }
          </Grid>
        </div>
      )
    
  }
  if (getCustomerProjectsData) {
    return (
      <div className="user-projects-container">
        <Typography variant="h3">Projects PAGE</Typography>

        <Grid container spacing={2} className="user-projects-inner-container">
          {
            getCustomerProjectsData.getCustomerProjects.map((project, i) => {
              return <CustomerProjectOverview project={project} getCustomerProjectsRefetch={getCustomerProjectsRefetch}/>
            })
          }
        </Grid>
      </div>
    )
  }
  return null;
};

export default Projects