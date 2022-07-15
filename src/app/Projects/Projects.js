import { gql, useQuery } from "@apollo/client";
import UserProjectOverview from "./UserProjectOverview";
import "./Projects.scss";

const GET_VENDOR_PROJECTS = gql`
  query getVendorProjects($userId: Int) {
    getVendorProjects(userId: $userId) {
      bidInfo {
        id
        permission
        components {
          quantityPrices {
            quantity
            price
          }
          createdAt
        }
      }
      components {
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
          <div>Projects PAGE</div>

          {
            data.getVendorProjects.map((project) => {
              return <UserProjectOverview projectData={project}/>
            })
          }
        </div>
      )
    }
  }
  return null;
};

export default Projects