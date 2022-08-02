import { gql, useMutation, useQuery } from "@apollo/client";

const GET_PROJECT_DETAIL = gql`
  query getProjectDetail($projectId: String) {
    getProjectDetail(projectId: $projectId) {
      id
      userId
      companyId
      name
      deliveryDate
      deliveryCountry
      budget
      deliveryCity
      design
      status
      components {
        id
        projectId
        name
        materials
        dimension
        postProcess
      }
      createdAt
    }
  }
`;

export const useGetProjectDetail = (projectId) => {
  const {data: getProjectDetailData, loading: getProjectDetailLoading, error: getProjectDetailError, refetch: getProjectDetailRefetch} = useQuery(GET_PROJECT_DETAIL, {
    variables: {
      projectId
    }
  });

  return {
    getProjectDetailData,
    getProjectDetailError,
    getProjectDetailLoading,
    getProjectDetailRefetch
  }
}

const CREATE_PROJECT_BID = gql`
  mutation CreateProjectBid($data: CreateProjectBidInput) {
    createProjectBid(data: $data)
  }
`;

export const useCreateProjectBid = () => {
  const [createProjectBid, {loading: createProjectBidLoading, error: createProjectBidError, data: createProjectBidData}] = useMutation(CREATE_PROJECT_BID);

  return {
    createProjectBid,
    createProjectBidLoading,
    createProjectBidError,
    createProjectBidData
  }
}