import { Button, Typography } from '@mui/material';
import { Elements,useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullScreenLoading from '../Utils/Loading';

import { CustomerSignupPage } from './CustomerSignup';

const Checkout = ({
  setCurrentPage,
  createCompanyHandler
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    if (!stripe || !elements) {
      return;
    }
    const {error} = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      redirect: 'if_required'
    });


    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
      console.error(error)
    } else {
      await createCompanyHandler();
      setCurrentPage(CustomerSignupPage.SUCCESS_PAGE)
    }
  };

  console.log({stripe, elements})
  return (
    <>
      {(!stripe || !elements) && <FullScreenLoading />}
      <Typography >Complete Payment Information</Typography>
      <PaymentElement />
      <Button onClick={() => setCurrentPage(CustomerSignupPage.REVIEW_PAGE)}>Back</Button>
      <Button onClick={handleSubmit}>Confirm Payment</Button>
      {errorMessage && <Typography>There were errors processing your payment information.</Typography>}
    </>
  );
}

export default Checkout;