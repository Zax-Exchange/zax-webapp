import { gql, useLazyQuery } from "@apollo/client";

const CHECK_COMPANY_NAME = gql`
  query checkCompanyName($name: String) {
    checkCompanyName(name: $name)
  }
`;

export const useCheckCompanyName = () => {
  const [
    checkCompanyName,
    {
      data: checkCompanyNameData,
      loading: checkCompanyNameLoading,
      error: checkCompanyNameError,
    },
  ] = useLazyQuery<{checkCompanyName: boolean}>(CHECK_COMPANY_NAME);

  return {
    checkCompanyName,
    checkCompanyNameData,
    checkCompanyNameLoading,
    checkCompanyNameError,
  };
};

const CHECK_USER_EMAIL = gql`
  query checkUserEmail($email: String) {
    checkUserEmail(email: $email)
  }
`;

export const useCheckUserEmail = () => {
  const [
    checkUserEmail,
    {
      data: checkUserEmailData,
      error: checkUserEmailError,
      loading: checkUserEmailLoading,
    },
  ] = useLazyQuery(CHECK_USER_EMAIL);

  return {
    checkUserEmail,
    checkUserEmailData,
    checkUserEmailLoading,
    checkUserEmailError,
  };
};