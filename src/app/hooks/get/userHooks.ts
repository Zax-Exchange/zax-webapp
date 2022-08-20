import { gql, useQuery } from "@apollo/client";
import { GetUserData } from "../types/user/userTypes";

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
  return useQuery<GetUserData, { userId: string }>(GET_USER, {
    variables: {
      userId,
    },
  });
};