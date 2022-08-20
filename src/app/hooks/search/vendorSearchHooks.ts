import { gql, useLazyQuery } from "@apollo/client";

const SEARCH_PROJECTS = gql`
  query searchProjects($searchInput: SearchProjectInput) {
    searchCustomerProjects(searchInput: $searchInput) {
      name
      companyName
      materials
      id
      companyId
      deliveryDate
      deliveryAddress
      budget
      createdAt
    }
  }
`;

export const useSearchProjects = () => {
  const [
    searchProjects,
    {
      data: searchProjectsData,
      error: searchProjectsError,
      loading: searchProjectsLoading,
    },
  ] = useLazyQuery(SEARCH_PROJECTS);

  return {
    searchProjects,
    searchProjectsData,
    searchProjectsError,
    searchProjectsLoading,
  };
};