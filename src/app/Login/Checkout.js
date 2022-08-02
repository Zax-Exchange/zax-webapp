import { Button, Typography } from '@mui/material';
import { Elements,useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullScreenLoading from '../Utils/Loading';



const Checkout = ({
  setCurrentPage
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return <FullScreenLoading />
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
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      setCurrentPage(4)
    }
  };

  return (
    <>
      <Typography>Complete your payment profile</Typography>
      <PaymentElement />
      <Button onClick={() => setCurrentPage(2)}>Back</Button>
      <Button onClick={handleSubmit}>Next</Button>
      {errorMessage && <Typography>There were errors processing your payment information.</Typography>}
    </>
  );
}

export default Checkout;