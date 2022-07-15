import { gql, useQuery } from "@apollo/client";
import UserProjectOverview from "./UserProjectOverview";
import { Typography, Grid } from "@mui/material";
import "./Projects.scss";

const GET_VENDOR_PROJECTS = gql`
  query getVendorProjects($userId: Int) {
    getVendorProjects(userId: $userId) {
      bidInfo {
        id
        permission
        components {
          projectComponentId
          quantityPrices {
            quantity
            price
          }
          createdAt
        }
      }
      components {
        id
        name
        materials
        dimension
        postProcess
      }
      id
      userId
      companyId
      name
      deliveryDate
      deliveryCountry
      deliveryCity
      budget
      design
      status
      permission
      createdAt
    }
  }
`;

export const useVendorProjects = (userId) => {
  return useQuery(GET_VENDOR_PROJECTS, {
    variables: {
      userId,
    }
  })
}
const Projects = () => {
  const {error, loading, data} = useVendorProjects(parseInt(sessionStorage.getItem("userId"), 10))
  
  if (data) {
    
    // TODO: use isVendor
    if (true) {

      return (
        <div className="user-projects-container">
          <Typography variant="h3">Projects PAGE</Typography>

          <Grid container spacing={2} className="user-projects-inner-container">
            {
              data.getVendorProjects.map((project) => {
                return <UserProjectOverview projectData={project}/>
              })
            }
          </Grid>
        </div>
      )
    }
  }
  return null;
};

export default Projects