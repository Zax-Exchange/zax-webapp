import { gql, useMutation } from "@apollo/client";

const UPDATE_USER_PASSWORD = gql`
  mutation updateUserPassword($data: UpdateUserPasswordInput) {
    updateUserPassword(data: $data)
  }
`;

export const useUpdateUserPassword = () => {
  const [updateUserPassword, { error: updateUserPasswordError, loading: updateUserPasswordLoading, data: updateUserPasswordData}] = useMutation(UPDATE_USER_PASSWORD);

  return {
    updateUserPassword,
    updateUserPasswordData,
    updateUserPasswordError,
    updateUserPasswordLoading
  }
}

const DEACTIVATE_USER = gql`
  mutation deactivateUser($email: String) {
    deactivateUser(email: $email)
  }
`;

export const useDeactivateUser = () => {
  const [deactivateUser, { error: deactivateUserError, loading: deactivateUserLoading, data: deactivateUserData }] = useMutation(DEACTIVATE_USER);

  return {
    deactivateUser,
    deactivateUserData,
    deactivateUserError,
    deactivateUserLoading
  }
}