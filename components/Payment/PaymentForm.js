import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const stripe = useStripe();
  const elements = useElements();

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission or show a loading indicator.
      return;
    }

    if (paymentMethod === 'creditCard') {
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        console.error('Payment method error:', error);
      } else {
        console.log('Payment method created:', paymentMethod);
        // Process the payment on your server using the paymentMethod.id
      }
    } else if (paymentMethod === 'paypal') {
      // Implement PayPal integration here, typically by redirecting the user to PayPal.
      console.log('Redirecting to PayPal for payment.');
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Select Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            className="block w-full border p-2 rounded-md"
          >
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        {paymentMethod === 'creditCard' && (
          <div>
            <label className="block mb-2 font-medium">Credit Card Details:</label>
            <div className="border p-2 rounded-md">
              <CardElement options={{}} />
            </div>
          </div>
        )}

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
