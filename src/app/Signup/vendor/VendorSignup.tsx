import {
  Stack,
  Typography,
  Container,
  Button,
  Paper,
  Card,
  CardActionArea,
  CardContent,
  Fade,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { MouseEventHandler, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./VendorSignup.scss";
import FullScreenLoading from "../../Utils/Loading";

import EmailPage from "../EmailPage";
import CompanyInfo from "../CompanyInfo";
import { loadStripe } from "@stripe/stripe-js";
import VendorInfo from "./VendorInfo";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutSuccess from "../CheckoutSuccess";
import { validate } from "email-validator";
import VendorPlanSelection from "./VendorPlanSelection";
import VendorCompanyReview from "./VendorCompanyReview";
import { isValidInt } from "../../Utils/inputValidators";
import { Country } from "../customer/CustomerSignup";
import React from "react";
import VendorCheckout from "./VendorCheckout";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import { useGetAllPlansQuery } from "../../gql/get/company/company.generated";
import {
  ProductAndMoqInput,
  StripePaymentIntent,
} from "../../../generated/graphql";
import { useIntl } from "react-intl";
import { useCreateStripeCustomerInStripeForVendorMutation } from "../../gql/create/company/company.generated";
import JoinOrCreateCompany from "../JoinOrCreateCompany";
import JoinCompany from "../JoinCompany";
import { envConfig as config } from "../../Config/EnvConfig";

export type VendorSignupData = {
  name: string;
  contactEmail: string;
  logo: string | null;
  phone: string;
  fax: string;
  country: string;
  isActive: boolean;
  isVendor: boolean;
  isVerified: boolean;
  leadTime: string;
  locations: string[];
  productsAndMoq: ProductAndMoqInput[];
  companyUrl: string;
  planId: string;
  userEmail: string;
};

export type VendorSubscriptionInfo = {
  subscriptionPriceId: string;
  perUserPriceId: string;
  billingFrequency: string;
};

export type MoqDetail = {
  min: string | number;
  max: string | number;
};

export const VendorSignupPage = {
  JOIN: "JOIN",
  JOIN_OR_CREATE: "JOIN_OR_CREATE",
  EMAIL_PAGE: "EMAIL_PAGE",
  COMPANY_INFO_PAGE: "COMPANY_INFO_PAGE",
  VENDOR_INFO_PAGE: "VENDOR_INFO_PAGE",
  COMPANY_SIZE_PAGE: "COMPANY_SIZE_PAGE",
  PLAN_SELECTION_PAGE: "PLAN_SELECTION_PAGE",
  REVIEW_PAGE: "REVIEW_PAGE",
  PAYMENT_PAGE: "PAYMENT_PAGE",
  SUCCESS_PAGE: "SUCCESS_PAGE",
};

const stripePromise = loadStripe(config.stripePublishableKey);

const VendorSignup = () => {
  const intl = useIntl();
  const VENDOR_SIGNUP_STEPS = [
    intl.formatMessage({
      id: "app.signup.step.email",
    }),
    intl.formatMessage({
      id: "app.signup.step.companyInfo",
    }),
    intl.formatMessage({
      id: "app.signup.vendor.step.vendorInfo",
    }),
    intl.formatMessage({
      id: "app.signup.step.selectPlan",
    }),
    intl.formatMessage({
      id: "app.signup.step.review",
    }),
    intl.formatMessage({
      id: "app.signup.step.payment",
    }),
  ];
  const [
    createStripeCustomerMutation,
    { data: createStripeCustomerData, loading: createStripeCustomerLoading },
  ] = useCreateStripeCustomerInStripeForVendorMutation();

  const { data: getAllPlansData } = useGetAllPlansQuery({
    variables: {
      data: {
        isVendor: true,
      },
    },
  });

  const [currentPage, setCurrentPage] = useState(
    VendorSignupPage.JOIN_OR_CREATE
  );
  const [isLoading, setIsLoading] = useState(false);
  const [shouldDisableNext, setShouldDisableNext] = useState(true);

  // TODO: review pricing model and determine whether we need it or not
  const [companySize, setCompanySize] = useState("M");

  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    contactEmail: "",
    logo: null,
    phone: "",
    fax: "",
    country: "",
    isActive: false,
    isVendor: true,
    isVerified: false,
    leadTime: "",
    locations: [],
    productsAndMoq: [{ product: "", moq: "" }],
    companyUrl: "",
    planId: "",
    userEmail: "",
  } as VendorSignupData);

  const [stripePaymentIntent, setStripePaymentIntent] = useState({
    customerId: "",
    subscriptionId: "",
    clientSecret: "",
  } as StripePaymentIntent);

  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [activeStep, setActiveStep] = useState(0);

  const [subscriptionInfo, setSubscriptionInfo] = useState({
    subscriptionPriceId: "",
    perUserPriceId: "",
    billingFrequency: "",
  } as VendorSubscriptionInfo);

  useEffect(() => {
    switch (currentPage) {
      case VendorSignupPage.EMAIL_PAGE:
        setActiveStep(0);
        break;
      case VendorSignupPage.COMPANY_INFO_PAGE:
        setActiveStep(1);
        break;
      case VendorSignupPage.VENDOR_INFO_PAGE:
        setActiveStep(2);
        break;
      case VendorSignupPage.PLAN_SELECTION_PAGE:
        setActiveStep(3);
        break;
      case VendorSignupPage.REVIEW_PAGE:
        setActiveStep(4);
        break;
      case VendorSignupPage.PAYMENT_PAGE:
        setActiveStep(5);
        break;
    }
  }, [currentPage]);
  const shouldShowStepper = () => {
    if (
      currentPage === VendorSignupPage.JOIN_OR_CREATE ||
      currentPage === VendorSignupPage.JOIN ||
      currentPage === VendorSignupPage.SUCCESS_PAGE
    )
      return false;
    return true;
  };

  // set stripePaymentIntent.customerId once createStripeCustomer succeeds
  useEffect(() => {
    if (createStripeCustomerData) {
      setStripePaymentIntent({
        ...createStripeCustomerData.createStripeCustomerInStripeForVendor,
      });
    }
  }, [createStripeCustomerData]);

  // goes to review page once user selects a plan
  // we need this because it's possible for nextPage to render before subscriptionInfo settles
  useEffect(() => {
    if (
      subscriptionInfo.perUserPriceId &&
      subscriptionInfo.subscriptionPriceId
    ) {
      nextPage();
    }
  }, [subscriptionInfo]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val: string = e.target.value;
    let isAllowed = true;
    switch (e.target.name) {
      case "name":
        isAllowed = val !== " ";
        break;
      case "phone":
      case "fax":
        isAllowed = isValidInt(val);
        break;
      case "leadTime":
        isAllowed = isValidInt(val);
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

  const companySizeOnClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (e.currentTarget.dataset.name) {
      setCompanySize(e.currentTarget.dataset.name);
      nextPage();
    }
  };

  const selectPlan = (planId: string) => {
    setValues({
      ...values,
      planId,
    });
  };

  const deleteProductsAndMoq = (ind: number) => {
    setValues((prev) => {
      const allProductsAndMoq = [...prev.productsAndMoq];
      allProductsAndMoq!.splice(ind, 1);
      return {
        ...prev,
        productsAndMoq: allProductsAndMoq,
      };
    });
  };

  const addProductsAndMoq = () => {
    const prevProductsAndMoq = [...values.productsAndMoq];
    setValues((prev) => {
      return {
        ...prev,
        productsAndMoq: [
          ...prevProductsAndMoq,
          {
            product: "",
            moq: "",
          },
        ],
      };
    });
  };

  // used for determining if we should disable next button
  const validateInputs = (fields: (keyof VendorSignupData)[]) => {
    for (let field of fields) {
      if (field === "productsAndMoq") {
        for (let productAndMoq of values.productsAndMoq) {
          if (productAndMoq.moq === "" || productAndMoq.product === "")
            return false;
        }
        continue;
      }
      const val = values[field as keyof VendorSignupData];
      if (Array.isArray(val) && val.length === 0) return false;
      if (!val) return false;
    }
    return true;
  };

  const nextPage = async () => {
    if (currentPage === VendorSignupPage.JOIN_OR_CREATE) {
      setCurrentPage(VendorSignupPage.EMAIL_PAGE);
    } else if (currentPage === VendorSignupPage.EMAIL_PAGE) {
      setCurrentPage(VendorSignupPage.COMPANY_INFO_PAGE);
    } else if (currentPage === VendorSignupPage.COMPANY_INFO_PAGE) {
      setValues({
        ...values,
        name: values.name.replace(/\s+/g, " ").trim(),
      });
      setCurrentPage(VendorSignupPage.VENDOR_INFO_PAGE);
    } else if (currentPage === VendorSignupPage.VENDOR_INFO_PAGE) {
      setValues({
        ...values,
      });
      setCurrentPage(VendorSignupPage.PLAN_SELECTION_PAGE);
    }
    // else if (currentPage === VendorSignupPage.COMPANY_SIZE_PAGE) {
    //   setCurrentPage(VendorSignupPage.PLAN_SELECTION_PAGE);
    // }
    else if (currentPage === VendorSignupPage.PLAN_SELECTION_PAGE) {
      setCurrentPage(VendorSignupPage.REVIEW_PAGE);
    } else if (currentPage === VendorSignupPage.REVIEW_PAGE) {
      try {
        const { data } = await createStripeCustomerMutation({
          variables: {
            data: {
              email: values.userEmail,
              subscriptionPriceId: subscriptionInfo.subscriptionPriceId,
              perUserPriceId: subscriptionInfo.perUserPriceId,
            },
          },
        });
        setStripePaymentIntent({
          ...data!.createStripeCustomerInStripeForVendor,
        });
        setCurrentPage(VendorSignupPage.PAYMENT_PAGE);
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
      case VendorSignupPage.JOIN_OR_CREATE:
        navigate(-1);
        break;
      case VendorSignupPage.JOIN:
        setCurrentPage(VendorSignupPage.JOIN_OR_CREATE);
        break;
      case VendorSignupPage.EMAIL_PAGE:
        setCurrentPage(VendorSignupPage.JOIN_OR_CREATE);
        break;
      case VendorSignupPage.COMPANY_INFO_PAGE:
        setCurrentPage(VendorSignupPage.EMAIL_PAGE);
        break;
      case VendorSignupPage.VENDOR_INFO_PAGE:
        setCurrentPage(VendorSignupPage.COMPANY_INFO_PAGE);
        break;
      // case VendorSignupPage.COMPANY_SIZE_PAGE:
      //   setCurrentPage(VendorSignupPage.VENDOR_INFO_PAGE);
      //   break;
      case VendorSignupPage.PLAN_SELECTION_PAGE:
        setCurrentPage(VendorSignupPage.VENDOR_INFO_PAGE);
        break;
      case VendorSignupPage.REVIEW_PAGE:
        setCurrentPage(VendorSignupPage.PLAN_SELECTION_PAGE);
        break;
      case VendorSignupPage.PAYMENT_PAGE:
        setCurrentPage(VendorSignupPage.REVIEW_PAGE);
        break;
      default:
        return;
    }
  };

  const renderNavigationButtons = (isValidInput: boolean) => {
    const backButton = (
      <Button variant="outlined" onClick={previousPage}>
        {intl.formatMessage({ id: "app.general.back" })}
      </Button>
    );
    const nextButton = (
      <Button
        variant="contained"
        onClick={nextPage}
        disabled={!isValidInput || shouldDisableNext}
      >
        {intl.formatMessage({ id: "app.general.next" })}
      </Button>
    );

    let buttons = [];
    if (
      currentPage === VendorSignupPage.JOIN_OR_CREATE ||
      currentPage === VendorSignupPage.JOIN
    ) {
      buttons = [backButton];
    } else if (currentPage === VendorSignupPage.EMAIL_PAGE) {
      buttons = [backButton, nextButton];
    } else if (
      currentPage === VendorSignupPage.PLAN_SELECTION_PAGE ||
      currentPage === VendorSignupPage.COMPANY_SIZE_PAGE
    ) {
      buttons = [backButton];
    } else {
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

  const renderCompanySignupFlow = () => {
    if (currentPage === VendorSignupPage.JOIN_OR_CREATE) {
      return (
        <Fade in={true} mountOnEnter unmountOnExit>
          <div>
            <JoinOrCreateCompany setCurrentPage={setCurrentPage} />
            {renderNavigationButtons(true)}
          </div>
        </Fade>
      );
    } else if (currentPage === VendorSignupPage.JOIN) {
      return (
        <Fade in={true} mountOnEnter unmountOnExit>
          <div>
            <JoinCompany />
            {renderNavigationButtons(true)}
          </div>
        </Fade>
      );
    }
    if (currentPage === VendorSignupPage.EMAIL_PAGE) {
      return (
        <>
          <EmailPage
            onChange={onChange}
            userEmail={values.userEmail}
            setShouldDisableNext={setShouldDisableNext}
          />
          {renderNavigationButtons(validate(values.userEmail))}
        </>
      );
    } else if (currentPage === VendorSignupPage.COMPANY_INFO_PAGE) {
      return (
        <>
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
        </>
      );
    } else if (currentPage === VendorSignupPage.VENDOR_INFO_PAGE) {
      return (
        <>
          <VendorInfo
            values={values}
            setValues={setValues}
            onChange={onChange}
            setShouldDisableNext={setShouldDisableNext}
            addProductsAndMoq={addProductsAndMoq}
            deleteProductsAndMoq={deleteProductsAndMoq}
          />
          {renderNavigationButtons(
            validateInputs(["leadTime", "productsAndMoq", "locations"])
          )}
        </>
      );
    } else if (currentPage === VendorSignupPage.COMPANY_SIZE_PAGE) {
      return (
        <>
          <Typography variant="h6">Choose your company size</Typography>

          <Stack direction="row" spacing={2} justifyContent="space-around">
            <Card>
              <CardActionArea
                data-name="XS"
                onClick={companySizeOnClick}
                href=""
              >
                <CardContent>
                  <Typography variant="subtitle2">XS</Typography>
                  <Typography variant="caption">1 - 25 FTE</Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card>
              <CardActionArea
                data-name="S"
                onClick={companySizeOnClick}
                href=""
              >
                <CardContent>
                  <Typography variant="subtitle2">Small</Typography>
                  <Typography variant="caption">26 - 99 FTE</Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card>
              <CardActionArea
                data-name="M"
                onClick={companySizeOnClick}
                href=""
              >
                <CardContent>
                  <Typography variant="subtitle2">Medium</Typography>
                  <Typography variant="caption">100 - 999 FTE</Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card>
              <CardActionArea
                data-name="L"
                onClick={companySizeOnClick}
                href=""
              >
                <CardContent>
                  <Typography variant="subtitle2">Large</Typography>
                  <Typography variant="caption">1000+ FTE</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Stack>
          {renderNavigationButtons(true)}
        </>
      );
    } else if (currentPage === VendorSignupPage.PLAN_SELECTION_PAGE) {
      if (getAllPlansData && getAllPlansData.getAllPlans) {
        const plans = getAllPlansData.getAllPlans;

        return (
          <>
            <Typography variant="h6" sx={{ marginBottom: 4 }}>
              {intl.formatMessage({ id: "app.signup.pickAPlan" })}
            </Typography>
            <Stack direction="row" justifyContent="space-around">
              {plans.map((plan) => (
                <VendorPlanSelection
                  planData={plan}
                  selectPlan={selectPlan}
                  setSubscriptionInfo={setSubscriptionInfo}
                />
              ))}
            </Stack>
            {renderNavigationButtons(true)}
          </>
        );
      }
      return renderNavigationButtons(true);
      // TODO: add  && meta.error === undefined to renderNavigationButtons
    } else if (currentPage === VendorSignupPage.REVIEW_PAGE) {
      return (
        <>
          {getAllPlansData && (
            <VendorCompanyReview
              values={values}
              getAllPlansData={getAllPlansData}
              subscriptionInfo={subscriptionInfo}
            />
          )}
          {renderNavigationButtons(true)}
        </>
      );
    } else if (currentPage === VendorSignupPage.PAYMENT_PAGE) {
      return (
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
            {intl.formatMessage({ id: "app.signup.completePayment" })}
          </Typography>
          <VendorCheckout
            setCurrentPage={setCurrentPage}
            companyData={values}
            stripePaymentIntent={stripePaymentIntent}
            setIsLoading={setIsLoading}
          />
        </Elements>
      );
    } else if (currentPage === VendorSignupPage.SUCCESS_PAGE) {
      return <CheckoutSuccess />;
    }
  };

  return (
    <Container maxWidth="lg">
      {shouldShowStepper() && (
        <Stepper activeStep={activeStep} sx={{ mb: 2 }}>
          {VENDOR_SIGNUP_STEPS.map((label, index) => {
            return (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      )}
      {(createStripeCustomerLoading || isLoading) && <FullScreenLoading />}
      <Paper sx={{ padding: 8, position: "relative" }}>
        {/* <CustomSnackbar
          severity={snackbar.severity}
          direction="right"
          message={snackbar.message}
          open={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
        /> */}
        {renderCompanySignupFlow()}
      </Paper>
    </Container>
  );
};

export default VendorSignup;
