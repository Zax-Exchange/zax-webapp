import { gql, useQuery } from "@apollo/client";

const GET_USER = gql`
  query getUserWithUserId($userId: String, $paranoid: Boolean) {
    getUserWithUserId(userId: $userId) {
      id
      name
      email
      companyId
      isActive
    }
  }
`;

export const useUserData = (userId: string) => {
  return useQuery(GET_USER, {
    variables: {
      userId,
    },
  });
};