import { gql, useLazyQuery } from "@apollo/client";
import { SearchVendorInput, SearchVendorsData } from "../types/vendor/getVendorTypes";

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
  ] = useLazyQuery<SearchVendorsData, SearchVendorInput>(SEARCH_VENDORS);

  return {
    searchVendors,
    searchVendorsData,
    searchVendorsError,
    searchVendorsLoading,
  };
};