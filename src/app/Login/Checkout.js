import { Button, Typography } from '@mui/material';
import { Elements,useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateCompanyPlanSubscriptionInfo } from '../hooks/signupHooks';
import FullScreenLoading from '../Utils/Loading';

import { CustomerSignupPage } from './CustomerSignup';

const Checkout = ({
  setCurrentPage,
  createCompanyHandler,
  subscriptionId,
  setSnackbar,
  setSnackbarOpen,
  companyCreated,
  setCompanyCreated,
  createCompanyLoading
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    updateCompanyPlanSubscriptionInfo,
    updateCompanyPlanSubscriptionInfoData,
    updateCompanyPlanSubscriptionInfoError,
    updateCompanyPlanSubscriptionInfoLoading
  } = useUpdateCompanyPlanSubscriptionInfo();
  
  const handleSubmit = async (event) => {
    
    if (!companyCreated) {
      try {
        await createCompanyHandler();
      
        setCompanyCreated(true);
      } catch (error) {
        setSnackbar({
          severity: "error",
          message: "Something went wrong. Please try again later."
        });
        setSnackbarOpen(true);
      }
    }

    if (stripe && elements) {
      setIsLoading(true);
      const { error } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required'
      });
      setIsLoading(false);

      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)
        setSnackbar({
          severity: "error",
          message: error.message
        });
        setSnackbarOpen(true);
      } else {
          // if payment succeeds, should update company_plans subsciprtion start/end fields
        await updateCompanyPlanSubscriptionInfo({
          variables: {
            subscriptionId
          }
        })
        setCurrentPage(CustomerSignupPage.SUCCESS_PAGE)
      }
    }
    
  };

  return (
    <>
      {(!stripe || !elements || createCompanyLoading || isLoading || updateCompanyPlanSubscriptionInfoLoading) && <FullScreenLoading />}
      <Typography >Complete Payment Information</Typography>
      <PaymentElement />
      <Button onClick={() => setCurrentPage(CustomerSignupPage.REVIEW_PAGE)}>Back</Button>
      <Button onClick={handleSubmit}>Confirm Payment</Button>
    </>
  );
}

export default Checkout;