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