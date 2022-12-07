import { Button, Container, Typography } from "@mui/material";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateVendorMutation } from "../../gql/create/vendor/vendor.generated";
import {
  useUpdateCompanyPlanSubscriptionInfoMutation,
  useUpdateCompanyStatusMutation,
} from "../../gql/update/company/company.generated";

import useCustomSnackbar from "../../Utils/CustomSnackbar";
import FullScreenLoading from "../../Utils/Loading";
import { VendorSignupData, VendorSignupPage } from "./VendorSignup";

const VendorCheckout = ({
  setCurrentPage,
  companyData,
  subscriptionId,
  setIsLoading,
}: {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  companyData: VendorSignupData;
  subscriptionId: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [updateCompanyPlanSuccess, setUpdateCompanyPlanSuccess] =
    useState(false);
  const [updateCompanyStatusSuccess, setUpdateCompanyStatusSuccess] =
    useState(false);

  // this is a flag to trigger useEffect in case user needs to retry
  const [submitClicked, setSubmitClicked] = useState(0);

  const [
    createVendorMutation,
    {
      data: createVendorData,
      loading: createVendorLoading,
      error: createVendorError,
    },
  ] = useCreateVendorMutation();

  const [updateCompanyPlanSubscriptionInfoMutation] =
    useUpdateCompanyPlanSubscriptionInfoMutation();

  const [updateCompanyStatusMutation] = useUpdateCompanyStatusMutation();

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (stripe && elements) {
      setIsLoading(false);
    }
  }, [stripe, elements]);

  useEffect(() => {
    const submit = async () => {
      setIsLoading(true);
      try {
        if (paymentSuccess && !updateCompanyPlanSuccess) {
          await updateCompanyPlanSubscriptionInfoMutation({
            variables: {
              data: {
                subscriptionId,
              },
            },
          });
          setUpdateCompanyPlanSuccess(true);
        }

        if (updateCompanyPlanSuccess && !updateCompanyStatusSuccess) {
          if (createVendorData && createVendorData.createVendor) {
            const companyId = createVendorData.createVendor;

            await updateCompanyStatusMutation({
              variables: {
                data: {
                  companyId,
                  isActive: true,
                },
              },
            });
          }
          setUpdateCompanyStatusSuccess(true);
          setCurrentPage(VendorSignupPage.SUCCESS_PAGE);
        }
      } catch (error) {
        setSnackbar({
          severity: "error",
          message: "Something went wrong. Please try again later.",
        });
        setSnackbarOpen(true);
      }

      setIsLoading(false);
    };
    if (submitClicked > 1) {
    }
    submit();
  }, [
    submitClicked,
    paymentSuccess,
    updateCompanyPlanSuccess,
    updateCompanyStatusSuccess,
  ]);

  const handleSubmit = async () => {
    try {
      // TODO: review this to make it more robust (should guarantee company and payment are both successful)
      setIsLoading(true);
      if (!createVendorData) {
        await createVendorMutation({
          variables: {
            data: {
              ...companyData,
              leadTime: parseInt(companyData.leadTime as string),
            },
          },
        });
      }
      if (stripe && elements && !paymentSuccess) {
        const { error } = await stripe.confirmPayment({
          elements,
          redirect: "if_required",
        });

        if (error) {
          throw error;
        } else {
          setPaymentSuccess(true);
        }
      }
    } catch (error: any) {
      let message = "Something went wrong. Please try again later.";
      if (error.type === "card_error") {
        message = error.message;
      }
      setSnackbar({
        severity: "error",
        message,
      });
      setSnackbarOpen(true);
    }
    setSubmitClicked((count) => count + 1);
  };

  return (
    <>
      {(!stripe || !elements || createVendorLoading) && <FullScreenLoading />}
      <PaymentElement />

      <Container
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 4,
          position: "absolute",
          right: 24,
          bottom: 12,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => setCurrentPage(VendorSignupPage.REVIEW_PAGE)}
        >
          Back
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Finish and Pay
        </Button>
      </Container>
    </>
  );
};

export default VendorCheckout;
