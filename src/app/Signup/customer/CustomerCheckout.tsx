import { Button, Container } from "@mui/material";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import React from "react";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { StripePaymentIntent } from "../../../generated/graphql";
import { useCreateCustomerMutation } from "../../gql/create/customer/customer.generated";

import useCustomSnackbar from "../../Utils/CustomSnackbar";
import { CustomerSignupData, CustomerSignupPage } from "./CustomerSignup";

const CustomerCheckout = ({
  setCurrentPage,
  setIsLoading,
  companyData,
  stripePaymentIntent,
}: {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  companyData: CustomerSignupData;
  stripePaymentIntent: StripePaymentIntent;
}) => {
  const intl = useIntl();
  const stripe = useStripe();
  const elements = useElements();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [createCustomerMutation] = useCreateCustomerMutation();

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (stripe && elements) {
      setIsLoading(false);
    }
  }, [stripe, elements]);

  useEffect(() => {
    if (paymentSuccess) {
      createCustomer();
    }
  }, [paymentSuccess]);

  const createCustomer = async () => {
    if (paymentSuccess) {
      try {
        setIsLoading(true);
        await createCustomerMutation({
          variables: {
            data: {
              ...companyData,
              stripeCustomerInfo: {
                subscriptionId: stripePaymentIntent.subscriptionId,
                customerId: stripePaymentIntent.customerId,
              },
            },
          },
          fetchPolicy: "no-cache",
        });
        setCurrentPage(CustomerSignupPage.SUCCESS_PAGE);
      } catch (error) {
        setSnackbar({
          severity: "error",
          message: intl.formatMessage({ id: "app.general.network.error" }),
        });
        setSnackbarOpen(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const finishPayment = async () => {
    try {
      // TODO: review this to make it more robust (should guarantee company and payment are both successful)
      setIsLoading(true);
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
      } else if (paymentSuccess) {
        await createCustomer();
      }
    } catch (error: any) {
      let message = intl.formatMessage({ id: "app.general.network.error" });
      if (error.type === "card_error") {
        message = error.message;
      }
      setSnackbar({
        severity: "error",
        message,
      });
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
          onClick={() => setCurrentPage(CustomerSignupPage.REVIEW_PAGE)}
        >
          {intl.formatMessage({ id: "app.general.back" })}
        </Button>
        <Button variant="contained" onClick={finishPayment}>
          {intl.formatMessage({ id: "app.signup.finishAndPay" })}
        </Button>
      </Container>
    </>
  );
};

export default CustomerCheckout;
