import { Box, Stack, TextField, Typography, Container, Button, Autocomplete, FormControl, Chip, Input, Select, MenuItem, Paper } from "@mui/material";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { useState } from "react";
import { countries } from "../../constants/countries";
import FullScreenLoading from "../../Utils/Loading";
import { useCheckCompanyName, useCreateCompany, useCreateStripeCustomer, useCreateSubscription, useGetAllPlans } from "../../hooks/signupHooks";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from "../Checkout";
import CustomSnackbar from "../../Utils/CustomSnackbar";
import CustomerPlanSelection from "./CustomerPlanSelection";
import EmailPage from "../EmailPage";
import CustomerInfo from "./CustomerInfo";
import CustomerCompanyReview from "./CustomerCompanyReview";
import "./CustomerSignup.scss";
import { CSSTransition } from "react-transition-group";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST);


export const CustomerSignupPage = {
  EMAIL_PAGE: "EMAIL_PAGE",
  COMPANY_INFO_PAGE: "COMPANY_INFO_PAGE",
  PAYMENT_PAGE: "PAYMENT_PAGE",
  PLAN_SELECTION_PAGE: "PLAN_SELECTION_PAGE",
  REVIEW_PAGE: "REVIEW_PAGE",
  SUCCESS_PAGE: "SUCCESS_PAGE"
}

const CustomerSignup = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  

  const {
    createStripeCustomer,
    createStripeCustomerData,
    createStripeCustomerLoading,
    createStripeCustomerError
  } = useCreateStripeCustomer();

  const {
    createSubscription,
    createSubscriptionLoading,
    createSubscriptionError,
    createSubscriptionData
  } = useCreateSubscription();

  const { getAllPlansData } = useGetAllPlans(false);
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionInfo, setSubscriptionInfo] = useState({
    price: "",
    priceId: "",
    billingFrequency: ""
  });

  const [currentPage, setCurrentPage] = useState(CustomerSignupPage.EMAIL_PAGE);
  const [stripeData, setStripeData] = useState({
    customerId: "",
    subscriptionId: "",
    clientSecret: ""
  });

  const [values, setValues] = useState({
    name: "",
    logo: null,
    phone: "",
    fax: "",
    country: "",
    isActive: false,
    isVendor: false,
    isVerified: false,
    companyUrl: "",
    planId: "",
    userEmail: ""
  });
  
  const [snackbar, setSnackbar] = useState({
    message: "",
    severity: "",
  });
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (createStripeCustomerData) {
      setStripeData({
          ...stripeData,
          customerId: createStripeCustomerData.createStripeCustomer
        })
    }
  }, [createStripeCustomerData]);

  useEffect(() => {
    if (createSubscriptionData) {
      setStripeData({
        ...stripeData,
        subscriptionId: createSubscriptionData.createSubscription.subscriptionId,
        clientSecret: createSubscriptionData.createSubscription.clientSecret
      })
      setCurrentPage(CustomerSignupPage.REVIEW_PAGE);
    }
  }, [createSubscriptionData]);

  useEffect(() => {
    if (subscriptionInfo.priceId) {
      nextPage();
    }
  }, [subscriptionInfo]);

  const selectPlan = (planId) => {
    setValues({
      ...values,
      planId
    });
  };

  const onChange = (e) => {
    if (e.target.type !== "tel" || e.target.validity.valid) {
      setValues({
        ...values,
        [e.target.name]: e.target.value
      })
    }    
  };

  

  const countryOnChange = (countryObj) => {
    setValues({
      ...values,
      country: countryObj ? countryObj.label : null
    });
  }

  const nextPage = async () => {
    if (currentPage === CustomerSignupPage.EMAIL_PAGE) {
      setCurrentPage(CustomerSignupPage.COMPANY_INFO_PAGE);
    } else if (currentPage === CustomerSignupPage.COMPANY_INFO_PAGE) {
      setCurrentPage(CustomerSignupPage.PLAN_SELECTION_PAGE);
    } else if (currentPage === CustomerSignupPage.PLAN_SELECTION_PAGE) {
      try {
        const { data } = await createStripeCustomer({
          variables: {
            email: values.userEmail
          }
        })
        await createSubscription({
          variables: {
            priceId: subscriptionInfo.priceId,
            customerId: data.createStripeCustomer
          }
        })
      } catch (error) {
        setSnackbar({
          severity: "error",
          message: error.message
        });
        setSnackbarOpen(true);
      }
    } else if (currentPage === CustomerSignupPage.REVIEW_PAGE) {
      setCurrentPage(CustomerSignupPage.PAYMENT_PAGE);
    }
  }

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
          billingFrequency: ""
        })
        setCurrentPage(CustomerSignupPage.PLAN_SELECTION_PAGE);
        break;
      case CustomerSignupPage.PAYMENT_PAGE:
        setCurrentPage(CustomerSignupPage.REVIEW_PAGE);
        break;
    }
  }

  const renderNavigationButtons = (isValidInput) => {
    const backButton = <Button key="back" variant="primary" onClick={previousPage}>Back</Button>;
    const nextButton = <Button key="next" variant="contained" onClick={nextPage} disabled={!isValidInput}>Next</Button>;

    let buttons = [];
    if (currentPage === CustomerSignupPage.EMAIL_PAGE) {
      buttons = [nextButton]
    } else if (currentPage === CustomerSignupPage.PLAN_SELECTION_PAGE) {
      buttons = [backButton]
    } else if (currentPage !== CustomerSignupPage.PAYMENT_PAGE) {
      buttons = [backButton, nextButton]
    }

    return <Container disableGutters sx={{display: "flex", justifyContent:"flex-end", gap: 4, position: "absolute", right: 24, bottom: 12}}>
      {buttons}
    </Container>
  }

  

  const validateInputs = (fields) => {
    for (let field of fields) {
      if (Array.isArray(values[field]) && values[field].length === 0) return false;
      if (!values[field]) return false;
    }
    return true;
  }


  const renderCompanySignupFlow = () => {
    if (currentPage === CustomerSignupPage.EMAIL_PAGE) {
      // TODO: use email validator
      return <CSSTransition
            in={true}
            timeout={500}
            appear={true}
            classNames={{
              appear: 'my-appear',
              appearActive: 'my-active-appear',
              appearDone: 'my-done-appear',
              enter: 'my-enter',
              enterActive: 'my-active-enter',
              enterDone: 'my-done-enter',
              exit: 'my-exit',
              exitActive: 'my-active-exit',
              exitDone: 'my-done-exit',
              }}
            unmountOnExit
          >
      <div>
        <EmailPage 
          onChange={onChange}
          userEmail={values.userEmail}
          setSnackbar={setSnackbar}
          setSnackbarOpen={setSnackbarOpen}
        />
        {renderNavigationButtons(true)}
      </div>
      </CSSTransition>
    } else if (currentPage === CustomerSignupPage.COMPANY_INFO_PAGE) {
      return <CSSTransition
        in={true}
        timeout={500}
        appear={true}
        classNames={{
          appear: 'my-appear',
          appearActive: 'my-active-appear',
          appearDone: 'my-done-appear',
          enter: 'my-enter',
          enterActive: 'my-active-enter',
          enterDone: 'my-done-enter',
          exit: 'my-exit',
          exitActive: 'my-active-exit',
          exitDone: 'my-done-exit',
          }}
        unmountOnExit
      >
      <div>
        <CustomerInfo 
          values={values}
          onChange={onChange}
          countryOnChange={countryOnChange}
        />
        {renderNavigationButtons(validateInputs(["name", "phone", "country"]))}
      </div>
      </CSSTransition>
    } else if (currentPage === CustomerSignupPage.PLAN_SELECTION_PAGE) {
      return <CSSTransition
        in={true}
        timeout={500}
        appear={true}
        classNames={{
          appear: 'my-appear',
          appearActive: 'my-active-appear',
          appearDone: 'my-done-appear',
          enter: 'my-enter',
          enterActive: 'my-active-enter',
          enterDone: 'my-done-enter',
          exit: 'my-exit',
          exitActive: 'my-active-exit',
          exitDone: 'my-done-exit',
          }}
        unmountOnExit
      >
      <div>
        <Typography variant="h6" sx={{marginBottom: 4}} textAlign="left">Pick a plan for your company</Typography>
        <Stack direction="row" justifyContent="space-between">
          {
            getAllPlansData && 
            getAllPlansData.getAllPlans &&
            getAllPlansData.getAllPlans.map(planData => {
              return <CustomerPlanSelection 
                planData={planData}
                selectPlan={selectPlan}
                setSubscriptionInfo={setSubscriptionInfo}
              />
            })
          }
        </Stack>
        {renderNavigationButtons()}
      </div>
      </CSSTransition>
      // TODO: add  && meta.error === undefined to renderNavigationButtons
    } else if (currentPage === CustomerSignupPage.REVIEW_PAGE){
      return <>
        <CustomerCompanyReview 
          values={values}
          getAllPlansData={getAllPlansData}
          subscriptionInfo={subscriptionInfo}
        />
        {renderNavigationButtons(true)}
      </>
    } else if (currentPage === CustomerSignupPage.PAYMENT_PAGE) {
      return <Elements stripe={stripePromise} options={{ clientSecret: stripeData.clientSecret }}>
        <Typography variant="subtitle2" sx={{marginBottom: 4}} textAlign="left" fontSize="1.2em">Complete Payment Information</Typography>
        <Checkout 
          setCurrentPage={setCurrentPage}
          companyData={values}
          subscriptionId={stripeData.subscriptionId}
          setSnackbar={setSnackbar}
          setSnackbarOpen={setSnackbarOpen}
          isVendor={false}
          setIsLoading={setIsLoading}
        />
      </Elements>
    } else if (currentPage === CustomerSignupPage.SUCCESS_PAGE) {
      return <>
        <Typography variant="subtitle2" fontSize="1.2em">You have signed up successfully! Check your email and finish signing up for your account.</Typography>
      </>
    }

  }

  if (user) {
    navigate("/") 
    return;
  }

  return  <Container maxWidth="lg">
        {(createStripeCustomerLoading || createSubscriptionLoading || isLoading) && <FullScreenLoading />}
        <Paper sx={{padding: 8, position: "relative"}}>
          <CustomSnackbar severity={snackbar.severity} direction="right" message={snackbar.message} open={snackbarOpen} onClose={() => setSnackbarOpen(false)} />  
          {renderCompanySignupFlow()}
        </Paper>
      </Container>

}


export default CustomerSignup;