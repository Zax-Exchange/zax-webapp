import {
  Stack,
  Typography,
  Container,
  Button,
  Paper,
  Fade,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FullScreenLoading from "../../Utils/Loading";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
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
import CustomerCheckout from "./CustomerCheckout";
import { useCreateStripeCustomerInStripeForCustomerMutation } from "../../gql/create/company/company.generated";
import { useGetAllPlansQuery } from "../../gql/get/company/company.generated";
import JoinOrCreateCompany from "../JoinOrCreateCompany";
import JoinCompany from "../JoinCompany";
import { StripePaymentIntent } from "../../../generated/graphql";
import { useIntl } from "react-intl";
import { envConfig as config } from "../../Config/EnvConfig";
import { GENERAL_ROUTES } from "../../constants/loggedInRoutes";
import { LOGGED_OUT_ROUTES } from "../../constants/loggedOutRoutes";
import { useCreateCustomerMutation } from "../../gql/create/customer/customer.generated";
import mixpanel from "mixpanel-browser";

const stripePromise = loadStripe(config.stripePublishableKey);

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
  JOIN: "JOIN",
  // JOIN_OR_CREATE: "JOIN_OR_CREATE",
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

export type Country = {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
};

const CustomerSignup = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const CUSTOMER_SIGNUP_STEPS = [
    intl.formatMessage({
      id: "app.signup.step.email",
    }),
    intl.formatMessage({
      id: "app.signup.step.companyInfo",
    }),
    // intl.formatMessage({
    //   id: "app.signup.step.selectPlan",
    // }),
    intl.formatMessage({
      id: "app.signup.step.review",
    }),
    // intl.formatMessage({
    //   id: "app.signup.step.payment",
    // }),
  ];

  const [
    createStripeCustomerInStripe,
    { loading: createStripeCustomerInStripeLoading },
  ] = useCreateStripeCustomerInStripeForCustomerMutation();
  const [activeStep, setActiveStep] = useState(0);

  const { data: getAllPlansData } = useGetAllPlansQuery({
    variables: {
      data: {
        isVendor: false,
      },
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [shouldDisableNext, setShouldDisableNext] = useState(true);
  const [createCustomerMutation, { loading: createCustomerLoading }] =
    useCreateCustomerMutation();

  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [subscriptionInfo, setSubscriptionInfo] = useState({
    price: "",
    priceId: "",
    billingFrequency: "",
  } as SubscriptionInfo);

  const [currentPage, setCurrentPage] = useState(CustomerSignupPage.EMAIL_PAGE);
  const [stripePaymentIntent, setStripePaymentIntent] = useState({
    customerId: "",
    subscriptionId: "",
    clientSecret: "",
  } as StripePaymentIntent);

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
    companyUrl: "https://",
    planId: "",
    userEmail: "",
  } as CustomerSignupData);

  useEffect(() => {
    switch (currentPage) {
      case CustomerSignupPage.EMAIL_PAGE:
        setActiveStep(0);
        break;
      case CustomerSignupPage.COMPANY_INFO_PAGE:
        setActiveStep(1);
        break;
      // case CustomerSignupPage.PLAN_SELECTION_PAGE:
      //   setActiveStep(2);
      //   break;
      case CustomerSignupPage.REVIEW_PAGE:
        setActiveStep(2);
        break;
      // case CustomerSignupPage.PAYMENT_PAGE:
      //   setActiveStep(4);
      //   break;
    }
  }, [currentPage]);
  const shouldShowStepper = () => {
    if (
      // currentPage === CustomerSignupPage.JOIN_OR_CREATE ||
      currentPage === CustomerSignupPage.JOIN ||
      currentPage === CustomerSignupPage.SUCCESS_PAGE
    )
      return false;
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
        isAllowed = val !== " ";
        break;
      case "companyUrl":
        if (val.substring(0, 8) !== "https://") {
          isAllowed = false;
        } else {
          isAllowed = true;
        }
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
    // if (currentPage === CustomerSignupPage.JOIN_OR_CREATE) {
    //   setCurrentPage(CustomerSignupPage.EMAIL_PAGE);
    // } else

    if (currentPage === CustomerSignupPage.EMAIL_PAGE) {
      setCurrentPage(CustomerSignupPage.COMPANY_INFO_PAGE);
    } else if (currentPage === CustomerSignupPage.COMPANY_INFO_PAGE) {
      setValues({
        ...values,
        name: values.name.replace(/\s+/g, " ").trim(),
      });
      setCurrentPage(CustomerSignupPage.REVIEW_PAGE);
    }
    // else if (currentPage === CustomerSignupPage.PLAN_SELECTION_PAGE) {
    //   setCurrentPage(CustomerSignupPage.REVIEW_PAGE);
    // }
    else if (currentPage === CustomerSignupPage.REVIEW_PAGE) {
      try {
        await createCustomerMutation({
          variables: {
            data: {
              ...values,
              companyUrl:
                values.companyUrl === "https://" ? "" : values.companyUrl,
              stripeCustomerInfo: {
                subscriptionId: "",
                customerId: "",
              },
            },
          },
          fetchPolicy: "no-cache",
        });
        mixpanel.track("sign up", {
          isVendor: false,
        });
        setCurrentPage(CustomerSignupPage.SUCCESS_PAGE);
      } catch (error) {
        setSnackbar({
          severity: "error",
          message: intl.formatMessage({ id: "app.general.network.error" }),
        });
        setSnackbarOpen(true);
      }
      // try {
      //   const { data } = await createStripeCustomerInStripe({
      //     variables: {
      //       data: {
      //         email: values.userEmail,
      //         priceId: subscriptionInfo.priceId,
      //       },
      //     },
      //   });
      //   setStripePaymentIntent({
      //     ...data!.createStripeCustomerInStripeForCustomer,
      //   });
      //   setCurrentPage(CustomerSignupPage.PAYMENT_PAGE);
      // } catch (error: any) {
      // setSnackbar({
      //   severity: "error",
      //   message: error.message,
      // });
      // setSnackbarOpen(true);
      // }
    }
  };

  const previousPage = () => {
    switch (currentPage) {
      // case CustomerSignupPage.JOIN_OR_CREATE:
      //   navigate(-1);
      //   break;
      // case CustomerSignupPage.JOIN:
      //   setCurrentPage(CustomerSignupPage.JOIN_OR_CREATE);
      //   break;
      case CustomerSignupPage.EMAIL_PAGE:
        navigate(LOGGED_OUT_ROUTES.LOGIN);
        break;
      case CustomerSignupPage.COMPANY_INFO_PAGE:
        setCurrentPage(CustomerSignupPage.EMAIL_PAGE);
        break;
      // case CustomerSignupPage.PLAN_SELECTION_PAGE:
      //   setCurrentPage(CustomerSignupPage.COMPANY_INFO_PAGE);
      //   break;
      case CustomerSignupPage.REVIEW_PAGE:
        // setSubscriptionInfo({
        //   price: "",
        //   priceId: "",
        //   billingFrequency: "",
        // });
        setCurrentPage(CustomerSignupPage.COMPANY_INFO_PAGE);
        break;
      // case CustomerSignupPage.PAYMENT_PAGE:
      //   setCurrentPage(CustomerSignupPage.REVIEW_PAGE);
      //   break;
      default:
        return;
    }
  };

  const renderNavigationButtons = (isValidInput: boolean) => {
    const backButton = (
      <Button key="back" variant="outlined" onClick={previousPage}>
        {intl.formatMessage({ id: "app.general.back" })}
      </Button>
    );
    const nextButton = (
      <Button
        key="next"
        variant="contained"
        onClick={nextPage}
        disabled={!isValidInput || shouldDisableNext}
      >
        {intl.formatMessage({ id: "app.general.next" })}
      </Button>
    );

    let buttons: JSX.Element[] = [];
    // if (
    //   currentPage === CustomerSignupPage.JOIN_OR_CREATE ||
    //   currentPage === CustomerSignupPage.JOIN
    // ) {
    //   buttons = [backButton];
    // } else
    // if (currentPage === CustomerSignupPage.EMAIL_PAGE) {
    //   buttons = [backButton, nextButton];
    // } else if (currentPage === CustomerSignupPage.PLAN_SELECTION_PAGE) {
    //   buttons = [backButton];
    // } else if (currentPage !== CustomerSignupPage.PAYMENT_PAGE) {
    // }
    buttons = [backButton, nextButton];

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
    // if (currentPage === CustomerSignupPage.JOIN_OR_CREATE) {
    //   return (
    //     <Fade in={true} mountOnEnter unmountOnExit>
    //       <div>
    //         <JoinOrCreateCompany setCurrentPage={setCurrentPage} />
    //         {renderNavigationButtons(true)}
    //       </div>
    //     </Fade>
    //   );
    // } else if (currentPage === CustomerSignupPage.JOIN) {
    //   return (
    //     <Fade in={true} mountOnEnter unmountOnExit>
    //       <div>
    //         <JoinCompany />
    //         {renderNavigationButtons(true)}
    //       </div>
    //     </Fade>
    //   );
    // } else
    if (currentPage === CustomerSignupPage.EMAIL_PAGE) {
      return (
        <Fade in={true} mountOnEnter unmountOnExit>
          <div>
            <EmailPage
              onChange={onChange}
              userEmail={values.userEmail}
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
    }
    // else if (currentPage === CustomerSignupPage.PLAN_SELECTION_PAGE) {
    //   return (
    //     <Fade in={true} mountOnEnter unmountOnExit appear>
    //       <div>
    //         <Typography variant="h6" sx={{ marginBottom: 4 }} textAlign="left">
    //           {intl.formatMessage({ id: "app.signup.pickAPlan" })}
    //         </Typography>
    //         <Stack direction="row" justifyContent="space-around">
    //           {getAllPlansData &&
    //             getAllPlansData.getAllPlans &&
    //             getAllPlansData!.getAllPlans!.map((planData) => {
    //               return (
    //                 <CustomerPlanSelection
    //                   planData={planData}
    //                   selectPlan={selectPlan}
    //                   setSubscriptionInfo={setSubscriptionInfo}
    //                   nextPage={nextPage}
    //                 />
    //               );
    //             })}
    //         </Stack>
    //         {renderNavigationButtons(true)}
    //       </div>
    //     </Fade>
    //   );
    //   // TODO: add  && meta.error === undefined to renderNavigationButtons
    // }
    else if (currentPage === CustomerSignupPage.REVIEW_PAGE) {
      return (
        <>
          {getAllPlansData && (
            <CustomerCompanyReview
              values={values}
              getAllPlansData={getAllPlansData}
              subscriptionInfo={subscriptionInfo}
            />
          )}
          {renderNavigationButtons(true)}
        </>
      );
    }
    //  else if (currentPage === CustomerSignupPage.PAYMENT_PAGE) {
    //   return (
    // <Elements
    //   stripe={stripePromise}
    //   options={{ clientSecret: stripePaymentIntent.clientSecret }}
    // >
    //   <Typography
    //     variant="subtitle2"
    //     sx={{ marginBottom: 4 }}
    //     textAlign="left"
    //     fontSize="1.2em"
    //   >
    //     {intl.formatMessage({ id: "app.signup.completePayment" })}
    //   </Typography>
    //   <CustomerCheckout
    //     setCurrentPage={setCurrentPage}
    //     companyData={values}
    //     stripePaymentIntent={stripePaymentIntent}
    //     setIsLoading={setIsLoading}
    //   />
    // </Elements>
    //   );
    // }
    else if (currentPage === CustomerSignupPage.SUCCESS_PAGE) {
      return <CheckoutSuccess />;
    }
  };

  return (
    <Container maxWidth="lg">
      {shouldShowStepper() && (
        <Stepper activeStep={activeStep} sx={{ mb: 2 }}>
          {CUSTOMER_SIGNUP_STEPS.map((label, index) => {
            return (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      )}
      {(createStripeCustomerInStripeLoading ||
        isLoading ||
        createCustomerLoading) && <FullScreenLoading />}
      <Paper sx={{ padding: 8, position: "relative" }}>
        {renderCompanySignupFlow()}
      </Paper>
    </Container>
  );
};

export default CustomerSignup;
