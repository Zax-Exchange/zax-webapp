import { Button, Container, Typography } from "@mui/material";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useUpdateCompanyPlanSubscriptionInfo,
  useUpdateCompanyStatus,
} from "../hooks/companyHooks";
import { useCreateCompany } from "../hooks/signupHooks";
import FullScreenLoading from "../Utils/Loading";

import { CustomerSignupPage } from "./customer/CustomerSignup";

const Checkout = ({
  setCurrentPage,
  companyData,
  subscriptionId,
  setSnackbar,
  setSnackbarOpen,
  isVendor,
  setIsLoading,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [updateCompanyPlanSuccess, setUpdateCompanyPlanSuccess] =
    useState(false);
  const [updateCompanyStatusSuccess, setUpdateCompanyStatusSuccess] =
    useState(false);

  // this is a flag to trigger useEffect in case user needs to retry
  const [submitClicked, setSubmitClicked] = useState(0);

  const {
    createCompany,
    createCompanyLoading,
    createCompanyError,
    createCompanyData,
  } = useCreateCompany(isVendor);

  const { updateCompanyPlanSubscriptionInfo } =
    useUpdateCompanyPlanSubscriptionInfo();

  const { updateCompanyStatus } = useUpdateCompanyStatus();

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
          await updateCompanyPlanSubscriptionInfo({
            variables: {
              subscriptionId,
            },
          });
          setUpdateCompanyPlanSuccess(true);
        }

        if (updateCompanyPlanSuccess && !updateCompanyStatusSuccess) {
          if (
            createCompanyData &&
            (createCompanyData.createVendor || createCompanyData.createCustomer)
          ) {
            let companyId;
            if (isVendor) {
              companyId = createCompanyData.createVendor;
            } else {
              companyId = createCompanyData.createCustomer;
            }
            await updateCompanyStatus({
              variables: {
                companyId,
                isActive: true,
              },
            });
          }
          setUpdateCompanyStatusSuccess(true);
          setCurrentPage(CustomerSignupPage.SUCCESS_PAGE);
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

  const handleSubmit = async (event) => {
    try {
      // TODO: review this to make it more robust (should guarantee company and payment are both successful)
      setIsLoading(true);
      if (!createCompanyData) {
        await createCompany({
          variables: {
            data: {
              ...companyData,
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
    } catch (error) {
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
      {(!stripe || !elements || createCompanyLoading) && <FullScreenLoading />}
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
          variant="primary"
          onClick={() => setCurrentPage(CustomerSignupPage.REVIEW_PAGE)}
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

export default Checkout;
