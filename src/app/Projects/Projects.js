import { gql, useQuery } from "@apollo/client";
import UserProjectOverview from "./UserProjectOverview";
import { Typography, Grid } from "@mui/material";
import "./Projects.scss";
import FullScreenLoading from "../Utils/Loading";

export const GET_VENDOR_PROJECTS = gql`
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

export const useVendorProjects = (userId, skip) => {
  return useQuery(GET_VENDOR_PROJECTS, {
    variables: {
      userId,
    },
    fetchPolicy: "no-cache",
    skip
  })
}

export const GET_CUSTOMER_PROJECTS = gql`
  query GetCustomerProjects($userId: Int) {
    getCustomerProjects(userId: $userId) {
      id
      userId
      companyId
      name
      deliveryDate
      deliveryCountry
      deliveryCity
      design
      budget
      status
      permission
      createdAt
      updatedAt
      components {
        id
        projectId
        name
        materials
        dimension
        postProcess
      }

      bids {
        id
        userId
        components {
          id
          projectBidId
          projectComponentId
          quantityPrices {
            quantity
            price
          }
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const useCustomerProjects = (userId, skip) => {
  return useQuery(GET_CUSTOMER_PROJECTS, {
    variables: {
      userId,
    },
    fetchPolicy: "no-cache",
    skip
  })
}

const Projects = () => {
  const userId = parseInt(sessionStorage.getItem("userId"), 10);
  const {error, loading, data: vendorProjects} = useVendorProjects(userId, true)
  const {data: customerProjects} = useCustomerProjects(userId, false);

  if (loading) {
    return <div className="user-projects-container">
      <FullScreenLoading />
    </div>
  }
  if (vendorProjects) {
    

      return (
        <div className="user-projects-container">
          <Typography variant="h3">Projects PAGE</Typography>

          <Grid container spacing={2} className="user-projects-inner-container">
            {
              vendorProjects.getVendorProjects.map((project, i) => {
                return <UserProjectOverview projectData={project} key={i}/>
              })
            }
          </Grid>
        </div>
      )
    
  }
  if (customerProjects) {
    console.log(customerProjects)
  }
  return null;
};

export default Projects