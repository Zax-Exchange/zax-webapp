import { gql, useLazyQuery } from "@apollo/client";

const SEARCH_PROJECTS = gql`
  query searchProjects($searchInput: SearchProjectInput) {
    searchCustomerProjects(searchInput: $searchInput) {
      name
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
      loding: searchProjectsLoading,
    },
  ] = useLazyQuery(SEARCH_PROJECTS);

  return {
    searchProjects,
    searchProjectsData,
    searchProjectsError,
    searchProjectsLoading,
  };
};

const SEARCH_VENDORS = gql`
  query searchVendorCompanies($searchInput: SearchCompanyInput) {
    searchVendorCompanies(searchInput: $searchInput) {
      id
      name
      logo
      country
      isVerified
      locations
      materials
      moq
      leadTime
    }
  }
`;

export const useSearchVendors = () => {
  const [
    searchVendors,
    {
      data: searchVendorsData,
      error: searchVendorsError,
      loading: searchVendorsLoading,
    },
  ] = useLazyQuery(SEARCH_VENDORS);

  return {
    searchVendors,
    searchVendorsData,
    searchVendorsError,
    searchVendorsLoading,
  };
};
