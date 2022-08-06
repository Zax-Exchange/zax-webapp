import { Button, Typography } from '@mui/material';
import { Elements,useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateCompanyPlanSubscriptionInfo, useUpdateCompanyStatus } from '../hooks/companyHooks';
import { useCreateCompany } from '../hooks/signupHooks';
import FullScreenLoading from '../Utils/Loading';

import { CustomerSignupPage } from './customer/CustomerSignup';

const Checkout = ({
  setCurrentPage,
  companyData,
  subscriptionId,
  setSnackbar,
  setSnackbarOpen,
  isVendor
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [updateCompanyPlanSuccess, setUpdateCompanyPlanSuccess] = useState(false);
  const [updateCompanyStatusSuccess, setUpdateCompanyStatusSuccess] = useState(false);

  // this is a flag to trigger useEffect in case user needs to retry
  const [submitClicked, setSubmitClicked] = useState(false);

  const {
    createCompany,
    createCompanyLoading,
    createCompanyError,
    createCompanyData
  } = useCreateCompany(isVendor);

  const {
    updateCompanyPlanSubscriptionInfo
  } = useUpdateCompanyPlanSubscriptionInfo();

  const {
    updateCompanyStatus
  } = useUpdateCompanyStatus();

  useEffect(() => {
    if (stripe && elements) {
      setIsLoading(false);
    }
  }, [stripe, elements])
  
  useEffect(() => {
    const submit = async () => {
      setIsLoading(true);
      try {
        if (paymentSuccess && !updateCompanyPlanSuccess) {
          await updateCompanyPlanSubscriptionInfo({
            variables: {
              subscriptionId
            }
          });
          setUpdateCompanyPlanSuccess(true)
        }

        if (updateCompanyPlanSuccess && !updateCompanyStatusSuccess) {
          if (isVendor && createCompanyData && createCompanyData.createVendor) {
            await updateCompanyStatus({
              variables: {
                companyId: createCompanyData.createVendor,
                isActive: true
              }
            });
          } else if (!isVendor && createCompanyData && createCompanyData.createCustomer) {
            await updateCompanyStatus({
              companyId: createCompanyData.createCustomer,
              isActive: true
            });
          }
          setUpdateCompanyStatusSuccess(true);
          setCurrentPage(CustomerSignupPage.SUCCESS_PAGE);
        }
      } catch (error) {
        setSnackbar({
          severity: "error",
          message: "Something went wrong. Please try again later."
        });
        setSnackbarOpen(true);
      }

      setIsLoading(false);
    }
    submit();
  }, [submitClicked, paymentSuccess, updateCompanyPlanSuccess, updateCompanyStatusSuccess]);

  const handleSubmit = async (event) => {
    setSubmitClicked(!submitClicked)
    try {
      setIsLoading(true);
      if (!createCompanyData) {
        await createCompany({
          variables: {
            data: {
              ...companyData
            }
          }
        });
      }
      
      if (stripe && elements && !paymentSuccess) {
        const { error } = await stripe.confirmPayment({
          elements,
          redirect: 'if_required'
        });
        
        if (error) {
          throw error
        } else {
          setPaymentSuccess(true);
        }
      }

    } catch (error) {
      console.log(error)
      let message = "Something went wrong. Please try again later.";
      if (error.type === "card_error") {
        message = error.message
      }
      setSnackbar({
        severity: "error",
        message
      });
      setSnackbarOpen(true);
    }
  };

  console.log(isLoading)
  return (
    <>
      {(!stripe || !elements || createCompanyLoading || isLoading) && <FullScreenLoading />}
      <PaymentElement />
      <Button onClick={() => setCurrentPage(CustomerSignupPage.REVIEW_PAGE)}>Back</Button>
      <Button onClick={handleSubmit}>Finish and Pay</Button>
    </>
  );
}

export default Checkout;