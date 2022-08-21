import { gql, useMutation } from "@apollo/client";
import { UpdateVendorInput } from "../types/vendor/updateVendorTypes";


const UPDATE_VENDOR_DATA = gql`
  mutation updateVendor($data: UpdateVendorInput) {
    updateVendor(data: $data)
  }
`;

export const useUpdateVendorData = () => {
  const [
    updateVendorData,
    {
      error: updateVendorDataError,
      loading: updateVendorDataLoading,
      data: updateVendorDataData,
    },
  ] = useMutation<{ updateVendor: boolean}, UpdateVendorInput>(UPDATE_VENDOR_DATA);

  return {
    updateVendorData,
    updateVendorDataError,
    updateVendorDataLoading,
    updateVendorDataData,
  };
};