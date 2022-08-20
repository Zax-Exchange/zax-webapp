import { gql, useMutation } from "@apollo/client";
import { DeactivateUserData, DeactivateUserInput } from "../types/user/deleteUserTypes";

const DEACTIVATE_USER = gql`
  mutation deactivateUser($email: String) {
    deactivateUser(email: $email)
  }
`;

export const useDeactivateUser = () => {
  const [deactivateUser, { error: deactivateUserError, loading: deactivateUserLoading, data: deactivateUserData }] = useMutation<DeactivateUserData, DeactivateUserInput>(DEACTIVATE_USER);

  return {
    deactivateUser,
    deactivateUserData,
    deactivateUserError,
    deactivateUserLoading
  }
}