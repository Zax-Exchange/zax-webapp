import {
  Box,
  Stack,
  TextField,
  Typography,
  Container,
  Button,
  MenuItem,
  Paper,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { useState } from "react";
import "./VendorSignup.scss";
import FullScreenLoading from "../../Utils/Loading";
import {
  useCreateStripeCustomer,
  useCreateSubscription,
} from "../../hooks/signupHooks";
import { useGetAllPlans } from "../../hooks/planHooks";
import EmailPage from "../EmailPage";
import CompanyInfo from "../CompanyInfo";
import { loadStripe } from "@stripe/stripe-js";
import VendorInfo from "./VendorInfo";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "../Checkout";
import CheckoutSuccess from "../CheckoutSuccess";
import CustomSnackbar from "../../Utils/CustomSnackbar";
import { validate } from "email-validator";
import VendorPlanSelection from "./VendorPlanSelection";
import VendorCompanyReview from "./VendorCompanyReview";

export const VendorSignupPage = {
  EMAIL_PAGE: "EMAIL_PAGE",
  COMPANY_INFO_PAGE: "COMPANY_INFO_PAGE",
  VENDOR_INFO_PAGE: "VENDOR_INFO_PAGE",
  COMPANY_SIZE_PAGE: "COMPANY_SIZE_PAGE",
  PLAN_SELECTION_PAGE: "PLAN_SELECTION_PAGE",
  REVIEW_PAGE: "REVIEW_PAGE",
  PAYMENT_PAGE: "PAYMENT_PAGE",
  SUCCESS_PAGE: "SUCCESS_PAGE",
};

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST
);

const VendorSignup = () => {
  const { user } = useContext(AuthContext);

  const {
    createStripeCustomer,
    createStripeCustomerData,
    createStripeCustomerLoading,
    createStripeCustomerError,
  } = useCreateStripeCustomer();

  const {
    createSubscription,
    createSubscriptionLoading,
    createSubscriptionError,
    createSubscriptionData,
  } = useCreateSubscription(true);

  const { getAllPlansData } = useGetAllPlans(true);

  const [currentPage, setCurrentPage] = useState(VendorSignupPage.EMAIL_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldDisableNext, setShouldDisableNext] = useState(true);
  const [companySize, setCompanySize] = useState("");

  // determines whether createSubscription should run
  const [previousPlanIds, setPreviousPlanIds] = useState([]);

  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    logo: null,
    phone: "",
    fax: "",
    country: "",
    isActive: false,
    isVendor: true,
    isVerified: false,
    leadTime: "",
    locations: [],
    moq: "",
    materials: [],
    companyUrl: "",
    planId: "",
    userEmail: "",
  });
  const [moqDetail, setMoqDetail] = useState({
    min: "",
    max: "",
  });

  const [snackbar, setSnackbar] = useState({
    message: "",
    severity: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [subscriptionInfo, setSubscriptionInfo] = useState({
    subscriptionPriceId: "",
    perUserPriceId: "",
    billingFrequency: "",
  });

  const [stripeData, setStripeData] = useState({
    customerId: "",
    subscriptionId: "",
    clientSecret: "",
  });

  // set stripeData.customerId once createStripeCustomer succeeds
  useEffect(() => {
    if (createStripeCustomerData) {
      setStripeData({
        ...stripeData,
        customerId: createStripeCustomerData.createStripeCustomer,
      });
    }
  }, [createStripeCustomerData]);

  // set stripeData.subscriptionId/clientSecret once createSubscription succeeds and proceed to payment page
  useEffect(() => {
    // don't run if we already have valid stripe data so back button can work correctly from payment page
    if (isValidStripeData() && !shouldRerunMutation()) {
      return;
    }
    if (createSubscriptionData) {
      setStripeData({
        ...stripeData,
        subscriptionId:
          createSubscriptionData.createVendorSubscription.subscriptionId,
        clientSecret:
          createSubscriptionData.createVendorSubscription.clientSecret,
      });
      setCurrentPage(VendorSignupPage.PAYMENT_PAGE);
      setPreviousPlanIds([...previousPlanIds, values.planId]);
    }
  }, [createSubscriptionData]);

  const shouldRerunMutation = () => {
    return !previousPlanIds.includes(values.planId);
  };
  const isValidStripeData = () => {
    for (let key in stripeData) {
      if (!stripeData[key]) return false;
    }
    return true;
  };
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

  const onChange = (e) => {
    const intOnlyRegEx = /^[0-9\b]+$/;
    let val = e.target.value;
    let isAllowed = true;

    switch (e.target.name) {
      case "phone":
      case "fax":
        isAllowed = intOnlyRegEx.test(val);
        break;
      case "leadTime":
        const month = parseInt(val, 10);
        isAllowed = intOnlyRegEx.test(val) && month > 0 && month <= 18;
        break;
      default:
        break;
    }
    if (isAllowed || val === "") {
      if (e.target.name === "leadTime") val = parseInt(val, 10);
      setValues({
        ...values,
        [e.target.name]: val,
      });
    }
  };

  const countryOnChange = (countryObj) => {
    setValues({
      ...values,
      country: countryObj ? countryObj.label : "",
    });
  };

  const companySizeOnClick = (e) => {
    setCompanySize(e.currentTarget.dataset.name);
    nextPage();
  };

  const selectPlan = (planId) => {
    setValues({
      ...values,
      planId,
    });
  };

  // used for determining if we should disable next button
  const validateInputs = (fields) => {
    for (let field of fields) {
      if (field === "moq") {
        if (moqDetail.min === "" || moqDetail.max === "") return false;

        if (parseInt(moqDetail.min, 10) > parseInt(moqDetail.max, 10))
          return false;
        continue;
      }
      if (Array.isArray(values[field]) && values[field].length === 0)
        return false;
      if (!values[field]) return false;
    }
    return true;
  };

  const nextPage = async () => {
    if (currentPage === VendorSignupPage.EMAIL_PAGE) {
      setCurrentPage(VendorSignupPage.COMPANY_INFO_PAGE);
    } else if (currentPage === VendorSignupPage.COMPANY_INFO_PAGE) {
      setCurrentPage(VendorSignupPage.VENDOR_INFO_PAGE);
    } else if (currentPage === VendorSignupPage.VENDOR_INFO_PAGE) {
      setValues({
        ...values,
        moq: [moqDetail.min, moqDetail.max].join("-"),
      });
      setCurrentPage(VendorSignupPage.COMPANY_SIZE_PAGE);
    } else if (currentPage === VendorSignupPage.COMPANY_SIZE_PAGE) {
      setCurrentPage(VendorSignupPage.PLAN_SELECTION_PAGE);
    } else if (currentPage === VendorSignupPage.PLAN_SELECTION_PAGE) {
      setCurrentPage(VendorSignupPage.REVIEW_PAGE);
    } else if (currentPage === VendorSignupPage.REVIEW_PAGE) {
      if (createSubscriptionData && !shouldRerunMutation()) {
        // if subscription created already and theres no change to email & selected plan, go to next page directly
        setCurrentPage(VendorSignupPage.PAYMENT_PAGE);
        return;
      }
      try {
        const { data } = await createStripeCustomer({
          variables: {
            email: values.userEmail,
          },
        });

        await createSubscription({
          variables: {
            data: {
              stripeCustomerId: data.createStripeCustomer,
              subscriptionPriceId: subscriptionInfo.subscriptionPriceId,
              perUserPriceId: subscriptionInfo.perUserPriceId,
            },
          },
        });
      } catch (error) {
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
      case VendorSignupPage.EMAIL_PAGE:
        navigate(-1);
        break;
      case VendorSignupPage.COMPANY_INFO_PAGE:
        setCurrentPage(VendorSignupPage.EMAIL_PAGE);
        break;
      case VendorSignupPage.VENDOR_INFO_PAGE:
        setCurrentPage(VendorSignupPage.COMPANY_INFO_PAGE);
        break;
      case VendorSignupPage.COMPANY_SIZE_PAGE:
        setCurrentPage(VendorSignupPage.VENDOR_INFO_PAGE);
        break;
      case VendorSignupPage.PLAN_SELECTION_PAGE:
        setCurrentPage(VendorSignupPage.COMPANY_SIZE_PAGE);
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

  const renderNavigationButtons = (isValidInput) => {
    const backButton = (
      <Button variant="primary" onClick={previousPage}>
        Back
      </Button>
    );
    const nextButton = (
      <Button
        variant="contained"
        onClick={nextPage}
        disabled={!isValidInput || shouldDisableNext}
      >
        Next
      </Button>
    );

    let buttons = [];
    if (currentPage === VendorSignupPage.EMAIL_PAGE) {
      buttons = [nextButton];
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
    if (currentPage === VendorSignupPage.EMAIL_PAGE) {
      return (
        <>
          <EmailPage
            onChange={onChange}
            userEmail={values.userEmail}
            setSnackbar={setSnackbar}
            setSnackbarOpen={setSnackbarOpen}
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
            validateInputs(["name", "phone", "country"])
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
            setMoqDetail={setMoqDetail}
            moqDetail={moqDetail}
          />
          {renderNavigationButtons(
            validateInputs(["leadTime", "moq", "materials", "locations"])
          )}
        </>
      );
    } else if (currentPage === VendorSignupPage.COMPANY_SIZE_PAGE) {
      return (
        <>
          <Typography variant="h6">Choose your company size</Typography>

          <Stack direction="row" spacing={2} justifyContent="space-around">
            <Card>
              <CardActionArea data-name="XS" onClick={companySizeOnClick}>
                <CardContent>
                  <Typography variant="subtitle2">XS</Typography>
                  <Typography variant="caption">1 - 25 FTE</Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card>
              <CardActionArea data-name="S" onClick={companySizeOnClick}>
                <CardContent>
                  <Typography variant="subtitle2">Small</Typography>
                  <Typography variant="caption">26 - 99 FTE</Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card>
              <CardActionArea data-name="M" onClick={companySizeOnClick}>
                <CardContent>
                  <Typography variant="subtitle2">Medium</Typography>
                  <Typography variant="caption">100 - 999 FTE</Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card>
              <CardActionArea data-name="L" onClick={companySizeOnClick}>
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
        const plans = getAllPlansData.getAllPlans.filter(
          (p) => p.companySize === companySize
        );
        return (
          <>
            <Typography variant="h6" sx={{ marginBottom: 4 }}>
              Pick a plan for your company
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
          <VendorCompanyReview
            values={values}
            getAllPlansData={getAllPlansData}
            subscriptionInfo={subscriptionInfo}
          />
          {renderNavigationButtons(true)}
        </>
      );
    } else if (currentPage === VendorSignupPage.PAYMENT_PAGE) {
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
          <Checkout
            setCurrentPage={setCurrentPage}
            companyData={values}
            subscriptionId={stripeData.subscriptionId}
            setSnackbar={setSnackbar}
            setSnackbarOpen={setSnackbarOpen}
            isVendor={true}
            setIsLoading={setIsLoading}
          />
        </Elements>
      );
    } else if (currentPage === VendorSignupPage.SUCCESS_PAGE) {
      return <CheckoutSuccess />;
    }
  };

  if (user) {
    navigate("/");
    return;
  }

  return (
    <Container maxWidth="lg">
      {(createStripeCustomerLoading ||
        createSubscriptionLoading ||
        isLoading) && <FullScreenLoading />}
      <Paper sx={{ padding: 8, position: "relative" }}>
        <CustomSnackbar
          severity={snackbar.severity}
          direction="right"
          message={snackbar.message}
          open={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
        />
        {renderCompanySignupFlow()}
      </Paper>
    </Container>
  );
};

export default VendorSignup;
