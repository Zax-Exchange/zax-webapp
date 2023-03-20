import { Box, Button, Container } from "@mui/material";
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { StripePaymentIntent } from "../../../generated/graphql";
import { useCreateCustomerMutation } from "../../gql/create/customer/customer.generated";

import useCustomSnackbar from "../../Utils/CustomSnackbar";
import { CustomerSignupData, CustomerSignupPage } from "./CustomerSignup";
import mixpanel from "mixpanel-browser";
import { LoadingButton } from "@mui/lab";
import { useUpdateCustomerUpgradeToPaidPlanMutation } from "../../gql/update/subscription/subscription.generated";
import { AuthContext } from "../../../context/AuthContext";

const CustomerCheckout = ({
  // setCurrentPage,
  // setIsLoading,
  // companyData,
  stripePaymentIntent,
  setCheckoutOpen,
  companyPlanRefetch,
  setPaymentSuccess,
}: {
  // setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  // setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  // companyData: CustomerSignupData;
  stripePaymentIntent: StripePaymentIntent;
  setCheckoutOpen: React.Dispatch<React.SetStateAction<boolean>>;
  companyPlanRefetch: () => void;
  setPaymentSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useContext(AuthContext);

  const intl = useIntl();
  const stripe = useStripe();
  const elements = useElements();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  const [createCustomerMutation] = useCreateCustomerMutation();

  const [isLoading, setIsLoading] = useState(false);

  const [
    updateCustomerPlan,
    { loading: updateCustomerPlanLoading, error: updateCustomerPlanError },
  ] = useUpdateCustomerUpgradeToPaidPlanMutation();

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (stripe && elements) {
      setIsLoading(false);
    }
  }, [stripe, elements]);

  // useEffect(() => {
  //   if (paymentSuccess) {
  //     createCustomer();
  //   }
  // }, [paymentSuccess]);

  // const createCustomer = async () => {
  //   if (paymentSuccess) {
  //     try {
  //       setIsLoading(true);
  //       await createCustomerMutation({
  //         variables: {
  //           data: {
  //             ...companyData,
  //             stripeCustomerInfo: {
  //               subscriptionId: stripePaymentIntent.subscriptionId,
  //               customerId: stripePaymentIntent.customerId,
  //             },
  //           },
  //         },
  //         fetchPolicy: "no-cache",
  //       });
  //       mixpanel.track("sign up", {
  //         isVendor: false,
  //       });
  //       setCurrentPage(CustomerSignupPage.SUCCESS_PAGE);
  //     } catch (error) {
  //       setSnackbar({
  //         severity: "error",
  //         message: intl.formatMessage({ id: "app.general.network.error" }),
  //       });
  //       setSnackbarOpen(true);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  // };

  const finishPayment = async () => {
    try {
      // TODO: review this to make it more robust (should guarantee company and payment are both successful)
      setIsLoading(true);
      if (stripe && elements) {
        const { error } = await stripe.confirmPayment({
          elements,
          redirect: "if_required",
        });

        if (error) {
          throw error;
        } else {
          await updateCustomerPlan({
            variables: {
              data: {
                companyId: user!.companyId,
              },
            },
          });
          companyPlanRefetch();
          setPaymentSuccess(true);
        }
      }
      //  else if (paymentSuccess) {
      //   await createCustomer();
      // }
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
      {/* <AddressElement
        options={{
          mode: "billing",
        }}
      />
      <Box mt={4}>
      </Box> */}
      <PaymentElement />
      <Container
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 4,
        }}
      >
        {/* <Button
          variant="outlined"
          onClick={() => setCurrentPage(CustomerSignupPage.REVIEW_PAGE)}
        >
          {intl.formatMessage({ id: "app.general.back" })}
        </Button> */}
        <LoadingButton
          loading={isLoading}
          variant="contained"
          onClick={finishPayment}
        >
          {intl.formatMessage({ id: "app.signup.finishAndPay" })}
        </LoadingButton>
      </Container>
    </>
  );
};

export default CustomerCheckout;
