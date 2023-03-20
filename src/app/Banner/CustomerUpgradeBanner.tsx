import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { openLink } from "../Utils/openLink";
import { useIntl } from "react-intl";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { envConfig } from "../Config/EnvConfig";
import { useCreateStripeCustomerInStripeForCustomerMutation } from "../gql/create/company/company.generated";
import { CompanyPlanType, StripePaymentIntent } from "../../generated/graphql";
import { AuthContext } from "../../context/AuthContext";
import CustomerCheckout from "../Signup/customer/CustomerCheckout";
import useCustomSnackbar from "../Utils/CustomSnackbar";
import FullScreenLoading from "../Utils/Loading";
import { useGetCompanyPlanQuery } from "../gql/get/company/company.generated";
import { Check, CheckCircle, Info } from "@mui/icons-material";

const stripePromise = loadStripe(envConfig.stripePublishableKey);

const CustomerUpgradeBanner = () => {
  const intl = useIntl();
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  // TODO
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  const [
    createStripeCustomerInStripe,
    {
      loading: createStripeCustomerInStripeLoading,
      error: createStripeCustomerInStripeError,
    },
  ] = useCreateStripeCustomerInStripeForCustomerMutation();

  const { data: companyPlanData, refetch: companyPlanRefetch } =
    useGetCompanyPlanQuery({
      variables: {
        data: {
          companyId: user!.companyId,
        },
      },
      fetchPolicy: "no-cache",
    });

  const isFreePlan =
    companyPlanData &&
    (!companyPlanData.getCompanyPlan ||
      (companyPlanData.getCompanyPlan &&
        companyPlanData.getCompanyPlan.planType === CompanyPlanType.Free));

  const [stripePaymentIntent, setStripePaymentIntent] = useState({
    customerId: "",
    subscriptionId: "",
    clientSecret: "",
  } as StripePaymentIntent);

  useEffect(() => {
    if (createStripeCustomerInStripeError) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [createStripeCustomerInStripeError]);

  useEffect(() => {
    if (
      stripePaymentIntent.clientSecret &&
      stripePaymentIntent.subscriptionId &&
      stripePaymentIntent.customerId
    ) {
      setCheckoutOpen(true);
    }
  }, [stripePaymentIntent]);

  const createPaymentIntent = async () => {
    if (
      !stripePaymentIntent.clientSecret ||
      !stripePaymentIntent.subscriptionId ||
      !stripePaymentIntent.customerId
    ) {
      const { data } = await createStripeCustomerInStripe({
        variables: {
          data: {
            companyId: user!.companyId,
            priceId:
              process.env.NODE_ENV! === "production"
                ? "price_1MnY2yEZqkVG9UR3fNKtMR6n"
                : "price_1MmnCoEZqkVG9UR39D7Fu8kF",
          },
        },
        fetchPolicy: "no-cache",
      });
      setStripePaymentIntent({
        ...data!.createStripeCustomerInStripeForCustomer,
      });
    } else {
      setCheckoutOpen(true);
    }
  };

  return (
    <>
      {createStripeCustomerInStripeLoading && <FullScreenLoading />}
      {isFreePlan && (
        <Box
          sx={{
            borderRadius: "4px",
            display: "flex",
            backgroundColor: "#e4e9fa",
            p: 2,
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex", mr: 1, alignItems: "center" }}>
              <Info fontSize="small" color="primary" />
            </Box>
            <Typography variant="caption">
              {intl.formatMessage({ id: "app.customer.upgradeBanner.text" })}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
            <Button onClick={createPaymentIntent} variant="outlined">
              {intl.formatMessage({ id: "app.general.upgrade" })}
            </Button>
          </Box>
        </Box>
      )}
      <Dialog
        open={checkoutOpen}
        onClose={() => {
          setCheckoutOpen(false);
        }}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent>
          {!paymentSuccess && (
            <Elements
              stripe={stripePromise}
              options={{ clientSecret: stripePaymentIntent.clientSecret }}
            >
              <Typography
                variant="subtitle2"
                sx={{ marginBottom: 4 }}
                textAlign="left"
                fontSize="1.2em"
              >
                {intl.formatMessage({ id: "app.customer.upgradeToPremium" })}
              </Typography>
              <CustomerCheckout
                stripePaymentIntent={stripePaymentIntent}
                setCheckoutOpen={setCheckoutOpen}
                companyPlanRefetch={() => {
                  companyPlanRefetch();
                }}
                setPaymentSuccess={setPaymentSuccess}
              />
            </Elements>
          )}
          {paymentSuccess && (
            <Box
              sx={{ minHeight: "4rem", display: "flex", alignItems: "center" }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                <CheckCircle color="success" />
              </Box>
              <Typography variant="caption">
                {intl.formatMessage({
                  id: "app.customer.upgradeToPremium.complete",
                })}
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomerUpgradeBanner;
