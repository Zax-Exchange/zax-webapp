import { Box, Stack, TextField, Typography, Container, Button, Autocomplete, FormControl, Chip, Input, Select, MenuItem } from "@mui/material";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { countries } from "../constants/countries";
import FullScreenLoading from "../Utils/Loading";
import { useCreateCompany, useCreateStripeCustomer, useCreateSubscription, useGetAllPlans } from "../hooks/signupHooks";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from "./Checkout";


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST);
const CUSTOMER_INDIVIDUAL_MONTHLY_PRICE_ID = "price_1LSBTMEZqkVG9UR3HZhwZEsT"

const CustomerSignup = () => {
  const { user } = useContext(AuthContext);
  const {
    createCompany,
    createCompanyLoading,
    createCompanyError,
    createCompanySuccess
  } = useCreateCompany(false);

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
  const { getAllPlansData } = useGetAllPlans();

  const [currentPage, setCurrentPage] = useState(0);
  const [stripeData, setStripeData] = useState({
    customerId: "",
    subscriptionId: "",
    clientSecret: ""
  });

  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    logo: null,
    phone: "",
    fax: "",
    country: "",
    isActive: true,
    isVendor: false,
    isVerified: false,
    companyUrl: "",
    planId: "",
    userEmail: ""
  });


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

  const createCompanyHandler = async () => {
    await createCompany({
      variables: {
        data: {
          ...values,
          planId: values.planId
        }
      }
    })
  };

  const nextPage = async () => {
    if (currentPage === 0) {
      // need to create stripe customer using email
      try {
        const { data } = await createStripeCustomer({
          variables: {
            email: values.userEmail
          }
        })

        setStripeData({
          ...stripeData,
          customerId: data.createStripeCustomer
        })
        setCurrentPage(currentPage + 1);
      } catch (error) {
        console.error(error)
      }
    } else if (currentPage === 2) {
      try {
        const { data } = await createSubscription({
          variables: {
            priceId: CUSTOMER_INDIVIDUAL_MONTHLY_PRICE_ID,
            customerId: stripeData.customerId
          }
        })
        setStripeData({
          ...stripeData,
          subscriptionId: data.createSubscription.subscriptionId,
          clientSecret: data.createSubscription.clientSecret
        })
        setCurrentPage(currentPage + 1);
      } catch (error) {
        console.error(error)
      }
    }
    else {
      setCurrentPage(currentPage + 1);
    }
  }

  const previousPage = () => setCurrentPage(currentPage - 1);

  const renderNavigationButtons = (isValidInput) => {
    const backButton = <Button key="back" variant="primary" onClick={previousPage}>Back</Button>;
    const nextButton = <Button key="next" variant="contained" onClick={nextPage} disabled={!isValidInput}>Next</Button>;
    const submitButton = <Button key="submit" variant="contained" onClick={createCompanyHandler}>Submit</Button>;

    let buttons = [];
    if (currentPage === 0) {
      buttons = [nextButton]
    } else if (currentPage < 3) {
      buttons = [backButton, nextButton]
    } else {
      buttons = [backButton, submitButton]
    }
    return <Container disableGutters sx={{display: "flex", justifyContent:"flex-end", gap: 4}}>
      {buttons}
    </Container>
  }

  const renderCountryDropdown = () => {
    return (
      <Autocomplete
        id="country-select"
        sx={{ width: 300 }}
        options={countries}
        autoHighlight
        getOptionLabel={(option) => option.label}
        onChange={(e,v) => countryOnChange(v)}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt=""
            />
            {option.label} ({option.code}) +{option.phone}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Company location"
            name="country"
            value={values.country}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      />
    );
  }

  const validateInputs = (fields) => {
    for (let field of fields) {
      if (Array.isArray(values[field]) && values[field].length === 0) return false;
      if (!values[field]) return false;
    }
    return true;
  }


  const renderCompanySignupFlow = () => {
    if (currentPage === 0) {
      // TODO: use email validator
      return <>
        <Typography variant="h6" sx={{marginBottom: 4}}>Let's start with your email</Typography>
        <Stack spacing={2} textAlign="right">
          <TextField label="Email" type="email" placeholder="Email" name="userEmail" value={values.userEmail} onChange={onChange}></TextField>

          {renderNavigationButtons(true)}
        </Stack>
      </>
    } else if (currentPage === 1) {
      return <>
        <Typography variant="h6" sx={{marginBottom: 4}}>Enter your company information</Typography>
        <Stack spacing={2} textAlign="right">
          <TextField label="Company name" type="text" placeholder="Company name" name="name" value={values.name} onChange={onChange}></TextField>
          <TextField label="Company phone number" inputProps={{pattern: "[0-9]*"}} type="tel" placeholder="Company phone number" name="phone" value={values.phone} onChange={onChange}></TextField>
          <TextField label="Company fax" inputProps={{pattern: "[0-9]*"}} type="tel" placeholder="Comapny fax" name="fax" value={values.fax} onChange={onChange}></TextField>
          <TextField label="Company website url" type="url" placeholder="Company website url" name="companyUrl" value={values.companyUrl} onChange={onChange}></TextField>
          {renderCountryDropdown()}

          {renderNavigationButtons(validateInputs(["name", "phone", "country"]))}
        </Stack>
      </>
    } else if (currentPage === 2) {
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
    } else if (currentPage === 3) {
      return <Elements stripe={stripePromise} options={{ clientSecret: stripeData.clientSecret }}>
        <Checkout 
          setCurrentPage={setCurrentPage}
        />
      </Elements>
    }
    else {
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
            {values.planId && <Typography>Selected plan: {getAllPlansData.getAllPlans.find(plan => plan.id === values.planId).name}</Typography>}
          </Stack>
        </Container>
        {renderNavigationButtons()}
      </>
    }
  }

  if (user) {
    navigate("/") 
    return;
  }

  if (createCompanyLoading || createStripeCustomerLoading || createSubscriptionLoading) {
    return <FullScreenLoading />
  }

  if (createCompanyError || createStripeCustomerError || createSubscriptionError) {
    return <Container maxWidth="md">
        Something went wrong. Please try again later.
    </Container>
  }

  if (createCompanySuccess) {
    return <Container maxWidth="md">
        Company created successfully! Please check your email and create your account!
    </Container>
  }

  return <Container maxWidth="md">
      {renderCompanySignupFlow()}
  </Container>

}


export default CustomerSignup;