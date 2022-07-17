import { gql, useQuery } from "@apollo/client";
import VendorProjectOverview from "./VendorProjectOverview";
import { Typography, Grid } from "@mui/material";
import "./Projects.scss";
import FullScreenLoading from "../Utils/Loading";
import CustomerProjectOverview from "./CustomerProjectOverview";

export const GET_VENDOR_PROJECTS = gql`
  query getVendorProjects($userId: Int) {
    getVendorProjects(userId: $userId) {
      bidInfo {
        id
        companyId
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
    fetchPolicy: "cache-and-network",
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
        companyId
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
    fetchPolicy: "cache-and-network",
    skip
  })
}

const Projects = () => {
  const userId = parseInt(sessionStorage.getItem("userId"), 10);
  const {error: vendorProjectsError, loading: vendorProjectsLoading, data: vendorProjects} = useVendorProjects(userId, true)
  const {error:customerProjectsError, loading: customerProjectsLoading, data: customerProjects} = useCustomerProjects(userId, false);
  console.log({userId})

  if (vendorProjectsLoading || customerProjectsLoading) {
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
                return <VendorProjectOverview projectData={project} key={i}/>
              })
            }
          </Grid>
        </div>
      )
    
  }
  if (customerProjects) {
    return (
      <div className="user-projects-container">
        <Typography variant="h3">Projects PAGE</Typography>

        <Grid container spacing={2} className="user-projects-inner-container">
          {
            customerProjects.getCustomerProjects.map((project, i) => {
              return <CustomerProjectOverview project={project}/>
            })
          }
        </Grid>
      </div>
    )
  }
  return null;
};

export default Projects