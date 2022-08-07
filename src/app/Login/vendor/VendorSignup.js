import { Box, Stack, TextField, Typography, Container, Button, MenuItem, Paper } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { useState } from "react";
import "./VendorSignup.scss";
import FullScreenLoading from "../../Utils/Loading";
import { useCreateStripeCustomer, useCreateSubscription } from "../../hooks/signupHooks";
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


export const VendorSignupPage = {
  EMAIL_PAGE: "EMAIL_PAGE",
  COMPANY_INFO_PAGE: "COMPANY_INFO_PAGE",
  VENDOR_INFO_PAGE: "VENDOR_INFO_PAGE",
  PLAN_SELECTION_PAGE: "PLAN_SELECTION_PAGE",
  REVIEW_PAGE: "REVIEW_PAGE",
  PAYMENT_PAGE: "PAYMENT_PAGE",
  SUCCESS_PAGE: "SUCCESS_PAGE"
}

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST);

const VendorSignup = () => {
  const { user } = useContext(AuthContext);
  
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

  const { getAllPlansData } = useGetAllPlans(true);

  const [currentPage, setCurrentPage] = useState(VendorSignupPage.EMAIL_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldDisableNext, setShouldDisableNext] = useState(true);

  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    logo: null,
    phone: "",
    fax: "",
    country: "",
    isActive: true,
    isVendor: true,
    isVerified: false,
    leadTime: "",
    locations: [],
    moq: "",
    materials: [],
    companyUrl: "",
    planId: "",
    userEmail: ""
  });

  const [snackbar, setSnackbar] = useState({
    message: "",
    severity: "",
  });
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [subscriptionInfo, setSubscriptionInfo] = useState({
    price: "",
    priceId: "",
    billingFrequency: ""
  });

  const [stripeData, setStripeData] = useState({
    customerId: "",
    subscriptionId: "",
    clientSecret: ""
  });

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
      setCurrentPage(VendorSignupPage.REVIEW_PAGE);
    }
  }, [createSubscriptionData]);

  useEffect(() => {
    if (subscriptionInfo.priceId) {
      nextPage();
    }
  }, [subscriptionInfo]);

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
    if (currentPage === VendorSignupPage.EMAIL_PAGE) {
      setCurrentPage(VendorSignupPage.COMPANY_INFO_PAGE);
    } else if (currentPage === VendorSignupPage.COMPANY_INFO_PAGE) {
      setCurrentPage(VendorSignupPage.VENDOR_INFO_PAGE);
    } else if (currentPage === VendorSignupPage.VENDOR_INFO_PAGE) {
      setCurrentPage(VendorSignupPage.PLAN_SELECTION_PAGE);
    }
    else if (currentPage === VendorSignupPage.PLAN_SELECTION_PAGE) {
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
    } else if (currentPage === VendorSignupPage.REVIEW_PAGE) {
      setCurrentPage(VendorSignupPage.PAYMENT_PAGE);
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
      case VendorSignupPage.PLAN_SELECTION_PAGE:
        setCurrentPage(VendorSignupPage.COMPANY_INFO_PAGE);
        break;
      case VendorSignupPage.REVIEW_PAGE:
        setSubscriptionInfo({
          price: "",
          priceId: "",
          billingFrequency: ""
        })
        setCurrentPage(VendorSignupPage.PLAN_SELECTION_PAGE);
        break;
      case VendorSignupPage.PAYMENT_PAGE:
        setCurrentPage(VendorSignupPage.REVIEW_PAGE);
        break;
    }
  }

  const renderNavigationButtons = (isValidInput) => {
    const backButton = <Button variant="primary" onClick={previousPage}>Back</Button>;
    const nextButton = <Button variant="contained" onClick={nextPage} disabled={!isValidInput || shouldDisableNext}>Next</Button>;

    let buttons = [];
    if (currentPage === VendorSignupPage.EMAIL_PAGE) {
      buttons = [nextButton]
    } else if (currentPage === VendorSignupPage.PLAN_SELECTION_PAGE) {
      buttons = [backButton]
    } else {
      buttons = [backButton, nextButton]
    }
    return <Container disableGutters sx={{display: "flex", justifyContent:"flex-end", gap: 4}}>
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
    if (currentPage === VendorSignupPage.EMAIL_PAGE) {
      // TODO: use email validator
      return <>
        <EmailPage 
          onChange={onChange}
          userEmail={values.userEmail}
          setSnackbar={setSnackbar}
          setSnackbarOpen={setSnackbarOpen}
          setShouldDisableNext={setShouldDisableNext}
        />
        {renderNavigationButtons(validate(values.userEmail))}
      </>
    } else if (currentPage === VendorSignupPage.COMPANY_INFO_PAGE) {
      return <>
          <CompanyInfo 
            values={values}
            onChange={onChange}
            countryOnChange={countryOnChange}
            setShouldDisableNext={setShouldDisableNext}
          />
          {renderNavigationButtons(validateInputs(["name", "phone", "country"]))}
      </>
    } else if (currentPage === VendorSignupPage.VENDOR_INFO_PAGE) {
      return <>
        <VendorInfo 
          values={values}
          setValues={setValues}
          onChange={onChange}
        />
        {renderNavigationButtons(validateInputs(["leadTime", "moq", "materials", "locations"]))}
      </>
    } else if (currentPage === VendorSignupPage.PLAN_SELECTION_PAGE) {
      return <>
        <Typography variant="h6" sx={{marginBottom: 4}}>Pick a plan for your company</Typography>

        <Stack spacing={2} textAlign="right">
          <TextField select onChange={onChange} sx={{textAlign: "left"}} label="Select a plan" name="planId">
            {
              getAllPlansData && getAllPlansData.getAllPlans.map(plan => {
                return <MenuItem value={plan.id}>{plan.name}</MenuItem>
              })
            }
          </TextField>
          
          
          {renderNavigationButtons(validateInputs(["planId"]))}
        </Stack>
      </>
      // TODO: add  && meta.error === undefined to renderNavigationButtons
    } else if (currentPage === VendorSignupPage.REVIEW_PAGE){
      return <>
        <Typography variant="h6" sx={{marginBottom: 4}}>Now let's review your company information</Typography>
        <Container maxWidth="sm">
          <Stack spacing={2} textAlign="left">
            <Typography>Your email: {values.userEmail}</Typography>
            <Typography>Company name: {values.name}</Typography>
            <Typography>Company phone: {values.phone}</Typography>
            {values.companyUrl && <Typography>Company url: {values.companyUrl}</Typography>}
            {values.fax && <Typography>Company fax: {values.fax}</Typography>}
            <Typography>Company country: {values.country}</Typography>
            <Typography>Typical lead time: {values.leadTime}</Typography>
            <Typography>Factory locations: {values.locations.join(",")}</Typography>
            <Typography>Minimum order quantity: {values.moq}</Typography>
            <Typography>Product materials: {values.materials.join(",")}</Typography>
            {values.planId && <Typography>Selected plan: {getAllPlansData.getAllPlans.find(plan => plan.id === values.planId).name}</Typography>}
          </Stack>
        </Container>
        {renderNavigationButtons()}
      </>
    } else if (currentPage === VendorSignupPage.PAYMENT_PAGE) {
      return <Elements stripe={stripePromise} options={{ clientSecret: stripeData.clientSecret }}>
        <Typography variant="subtitle2" sx={{marginBottom: 4}} textAlign="left" fontSize="1.2em">Complete Payment Information</Typography>
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
    } else if (currentPage === VendorSignupPage.SUCCESS_PAGE) {
      return <CheckoutSuccess />
    }
  }

  if (user) {
    navigate("/") 
    return;
  }

  return <Container maxWidth="md">
    {(createStripeCustomerLoading || createSubscriptionLoading || isLoading) && <FullScreenLoading />}
    <Paper sx={{padding: 8, position: "relative"}}>
      <CustomSnackbar severity={snackbar.severity} direction="right" message={snackbar.message} open={snackbarOpen} onClose={() => setSnackbarOpen(false)} />  
      {renderCompanySignupFlow()}
    </Paper>
  </Container>

}


export default VendorSignup;