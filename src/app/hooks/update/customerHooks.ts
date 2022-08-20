import { gql, useMutation } from "@apollo/client";
import { UpdateCustomerInput } from "../types/company/updateCompanyTypes";

const UPDATE_CUSTOMER_DATA = gql`
  mutation updateCustomer($data: UpdateCustomerInput) {
    updateCustomer(data: $data)
  }
`;

export const useUpdateCustomerData = () => {
  const [
    updateCustomerData,
    {
      error: updateCustomerDataError,
      loading: updateCustomerDataLoading,
      data: updateCustomerDataData,
    },
  ] = useMutation<{ updateCustomer: boolean}, UpdateCustomerInput>(UPDATE_CUSTOMER_DATA);

  return {
    updateCustomerData,
    updateCustomerDataError,
    updateCustomerDataLoading,
    updateCustomerDataData,
  };
};