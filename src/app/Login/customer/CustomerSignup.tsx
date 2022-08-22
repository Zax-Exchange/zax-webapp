import {
  Stack,
  Typography,
  Container,
  Button,
  Paper,
  Fade,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { useState } from "react";
import FullScreenLoading from "../../Utils/Loading";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CustomSnackbar from "../../Utils/CustomSnackbar";
import CustomerPlanSelection from "./CustomerPlanSelection";
import EmailPage from "../EmailPage";
import CompanyInfo from "../CompanyInfo";
import CustomerCompanyReview from "./CustomerCompanyReview";
import "./CustomerSignup.scss";
import CheckoutSuccess from "../CheckoutSuccess";
import { validate } from "email-validator";
import { isValidAlphanumeric, isValidInt } from "../../Utils/inputValidators";

import React from "react";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import { Plan, useCreateCustomerSubscriptionMutation, useCreateStripeCustomerMutation, useGetAllPlansQuery } from "../../../generated/graphql";
import CustomerCheckout from "./CustomerCheckout";

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST!
);

export interface CustomerSignupData {
  name: string;
  contactEmail: string;
  logo: string | null;
  phone: string;
  fax: string;
  country: string;
  isActive: boolean;
  isVendor: boolean;
  isVerified: boolean;
  companyUrl: string;
  planId: string;
  userEmail: string;
}

export const CustomerSignupPage = {
  EMAIL_PAGE: "EMAIL_PAGE",
  COMPANY_INFO_PAGE: "COMPANY_INFO_PAGE",
  PLAN_SELECTION_PAGE: "PLAN_SELECTION_PAGE",
  REVIEW_PAGE: "REVIEW_PAGE",
  PAYMENT_PAGE: "PAYMENT_PAGE",
  SUCCESS_PAGE: "SUCCESS_PAGE",
};

export type SubscriptionInfo = {
  price: string | number;
  priceId: string;
  billingFrequency: string;
};

export type StripeData = {
  customerId: string;
  subscriptionId: string;
  clientSecret: string;
};

export type Country = {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
};
const CustomerSignup = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [createStripeCustomerMutation, { data: createStripeCustomerData, loading: createStripeCustomerLoading, error: createStripeCustomerError }] = useCreateStripeCustomerMutation();

  const [createCustomerSubscriptionMutation, { data: createSubscriptionData, loading: createSubscriptionLoading, error: createSubscriptionError }] = useCreateCustomerSubscriptionMutation();

  const { data: getAllPlansData } = useGetAllPlansQuery({
    variables: {
       isVendor: false
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [shouldDisableNext, setShouldDisableNext] = useState(true);

  const { setSnackbar, setSnackbarOpen, CustomSnackbar } = useCustomSnackbar();
  const [subscriptionInfo, setSubscriptionInfo] = useState({
    price: "",
    priceId: "",
    billingFrequency: "",
  } as SubscriptionInfo);

  const [currentPage, setCurrentPage] = useState(CustomerSignupPage.EMAIL_PAGE);
  const [stripeData, setStripeData] = useState({
    customerId: "",
    subscriptionId: "",
    clientSecret: "",
  } as StripeData);

  const [previousPlanIds, setPreviousPlanIds] = useState<string[]>([]);

  const [values, setValues] = useState({
    name: "",
    contactEmail: "",
    logo: null,
    phone: "",
    fax: "",
    country: "",
    isActive: false,
    isVendor: false,
    isVerified: false,
    companyUrl: "",
    planId: "",
    userEmail: "",
  } as CustomerSignupData);

  useEffect(() => {
    if (createStripeCustomerData) {
      setStripeData({
        ...stripeData,
        customerId: createStripeCustomerData.createStripeCustomer,
      });
    }
  }, [createStripeCustomerData]);

  useEffect(() => {
    if (isValidStripeData() && !shouldRerunMutation()) {
      return;
    }
    if (createSubscriptionData) {
      setStripeData({
        ...stripeData,
        subscriptionId:
        createSubscriptionData
            .createCustomerSubscription.subscriptionId,
        clientSecret:
        createSubscriptionData
            .createCustomerSubscription.clientSecret,
      });
      setCurrentPage(CustomerSignupPage.PAYMENT_PAGE);
      setPreviousPlanIds([...previousPlanIds, values.planId]);
    }
  }, [createSubscriptionData]);

  const shouldRerunMutation = () => {
    return !previousPlanIds.includes(values.planId);
  };

  const isValidStripeData = () => {
    for (let key in stripeData) {
      if (!stripeData[key as keyof StripeData]) return false;
    }
    return true;
  };
  const selectPlan = (planId: string) => {
    setValues({
      ...values,
      planId,
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let isAllowed = true;

    switch (e.target.name) {
      case "phone":
      case "fax":
        isAllowed = isValidInt(val);
        break;
      case "name":
        isAllowed = isValidAlphanumeric(val);
        break;
      default:
        break;
    }
    if (isAllowed) {
      setValues({
        ...values,
        [e.target.name]: val,
      });
    }
  };

  const countryOnChange = (countryObj: Country | null) => {
    setValues({
      ...values,
      country: countryObj ? countryObj.label : "",
    });
  };

  const nextPage = async () => {
    if (currentPage === CustomerSignupPage.EMAIL_PAGE) {
      setCurrentPage(CustomerSignupPage.COMPANY_INFO_PAGE);
    } else if (currentPage === CustomerSignupPage.COMPANY_INFO_PAGE) {
      setCurrentPage(CustomerSignupPage.PLAN_SELECTION_PAGE);
    } else if (currentPage === CustomerSignupPage.PLAN_SELECTION_PAGE) {
      setCurrentPage(CustomerSignupPage.REVIEW_PAGE);
    } else if (currentPage === CustomerSignupPage.REVIEW_PAGE) {
      if (createSubscriptionData && !shouldRerunMutation()) {
        setCurrentPage(CustomerSignupPage.PAYMENT_PAGE);
        return;
      }
      try {
        const { data } = await createStripeCustomerMutation({
          variables: {
            email: values.userEmail,
          },
        });
        await createCustomerSubscriptionMutation({
          variables: {
            priceId: subscriptionInfo.priceId,
            stripeCustomerId: data!.createStripeCustomer,
          },
        });
      } catch (error: any) {
        setSnackbar({
          severity: "error",
          message: error.message,
        });
        setSnackbarOpen(true);
      }
    }
  };

  const previousPage = () => {
    switch (currentPage) {
      case CustomerSignupPage.EMAIL_PAGE:
        navigate(-1);
        break;
      case CustomerSignupPage.COMPANY_INFO_PAGE:
        setCurrentPage(CustomerSignupPage.EMAIL_PAGE);
        break;
      case CustomerSignupPage.PLAN_SELECTION_PAGE:
        setCurrentPage(CustomerSignupPage.COMPANY_INFO_PAGE);
        break;
      case CustomerSignupPage.REVIEW_PAGE:
        setSubscriptionInfo({
          price: "",
          priceId: "",
          billingFrequency: "",
        });
        setCurrentPage(CustomerSignupPage.PLAN_SELECTION_PAGE);
        break;
      case CustomerSignupPage.PAYMENT_PAGE:
        setCurrentPage(CustomerSignupPage.REVIEW_PAGE);
        break;
      default:
        return;
    }
  };

  const renderNavigationButtons = (isValidInput: boolean) => {
    const backButton = (
      <Button key="back" variant="outlined" onClick={previousPage}>
        Back
      </Button>
    );
    const nextButton = (
      <Button
        key="next"
        variant="contained"
        onClick={nextPage}
        disabled={!isValidInput || shouldDisableNext}
      >
        Next
      </Button>
    );

    let buttons: JSX.Element[] = [];
    if (currentPage === CustomerSignupPage.EMAIL_PAGE) {
      buttons = [nextButton];
    } else if (currentPage === CustomerSignupPage.PLAN_SELECTION_PAGE) {
      buttons = [backButton];
    } else if (currentPage !== CustomerSignupPage.PAYMENT_PAGE) {
      buttons = [backButton, nextButton];
    }

    return (
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
        {buttons}
      </Container>
    );
  };

  const validateInputs = (fields: string[]) => {
    for (let field of fields) {
      const value = values[field as keyof CustomerSignupData];

      if (!value) return false;
    }
    return true;
  };

  const renderCompanySignupFlow = () => {
    if (currentPage === CustomerSignupPage.EMAIL_PAGE) {
      // TODO: use email validator
      return (
        <Fade in={true} mountOnEnter unmountOnExit>
          <div>
            <EmailPage
              onChange={onChange}
              userEmail={values.userEmail}
              // setSnackbar={setSnackbar}
              // setSnackbarOpen={setSnackbarOpen}
              setShouldDisableNext={setShouldDisableNext}
            />
            {renderNavigationButtons(validate(values.userEmail))}
          </div>
        </Fade>
      );
    } else if (currentPage === CustomerSignupPage.COMPANY_INFO_PAGE) {
      return (
        <Fade in={true} mountOnEnter unmountOnExit appear>
          <div>
            <CompanyInfo
              values={values}
              onChange={onChange}
              countryOnChange={countryOnChange}
              setShouldDisableNext={setShouldDisableNext}
            />
            {renderNavigationButtons(
              validateInputs(["name", "phone", "country"]) &&
                validate(values.contactEmail)
            )}
          </div>
        </Fade>
      );
    } else if (currentPage === CustomerSignupPage.PLAN_SELECTION_PAGE) {
      return (
        <Fade in={true} mountOnEnter unmountOnExit appear>
          <div>
            <Typography variant="h6" sx={{ marginBottom: 4 }} textAlign="left">
              Pick a plan for your company
            </Typography>
            <Stack direction="row" justifyContent="space-around">
              {getAllPlansData &&
                getAllPlansData.getAllPlans &&
                getAllPlansData!.getAllPlans!.map((planData) => {
                  return (
                    <CustomerPlanSelection
                      planData={planData}
                      selectPlan={selectPlan}
                      setSubscriptionInfo={setSubscriptionInfo}
                      nextPage={nextPage}
                    />
                  );
                })}
            </Stack>
            {renderNavigationButtons(true)}
          </div>
        </Fade>
      );
      // TODO: add  && meta.error === undefined to renderNavigationButtons
    } else if (currentPage === CustomerSignupPage.REVIEW_PAGE) {
      return (
        <>
          {getAllPlansData && <CustomerCompanyReview
            values={values}
            getAllPlansData={getAllPlansData}
            subscriptionInfo={subscriptionInfo}
          />}
          {renderNavigationButtons(true)}
        </>
      );
    } else if (currentPage === CustomerSignupPage.PAYMENT_PAGE) {
      return (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: stripeData.clientSecret }}
        >
          <Typography
            variant="subtitle2"
            sx={{ marginBottom: 4 }}
            textAlign="left"
            fontSize="1.2em"
          >
            Complete Payment Information
          </Typography>
          <CustomerCheckout
            setCurrentPage={setCurrentPage}
            companyData={values}
            subscriptionId={stripeData.subscriptionId}
            // setSnackbar={setSnackbar}
            // setSnackbarOpen={setSnackbarOpen}
            setIsLoading={setIsLoading}
          />
        </Elements>
      );
    } else if (currentPage === CustomerSignupPage.SUCCESS_PAGE) {
      return <CheckoutSuccess />;
    }
  };

  if (user) {
    navigate("/");
    return null;
  }

  return (
    <Container maxWidth="lg">
      {(createStripeCustomerLoading ||
        createSubscriptionLoading ||
        isLoading) && <FullScreenLoading />}
      <Paper sx={{ padding: 8, position: "relative" }}>
        {CustomSnackbar}
        {renderCompanySignupFlow()}
      </Paper>
    </Container>
  );
};

export default CustomerSignup;
