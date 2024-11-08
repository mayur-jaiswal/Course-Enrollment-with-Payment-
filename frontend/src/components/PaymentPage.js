import React, { useState, useEffect } from 'react';
import { createOrder, verifyPayment } from '../services/api';

const PaymentPage = () => {
  const [orderId, setOrderId] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [amount, setAmount] = useState(100); 

  useEffect(() => {
    const initializePayment = async () => {
      try {
        const order = await createOrder(amount);
        setOrderId(order.orderId);
        startPayment(order.orderId);
      } catch (error) {
        console.error('Error initializing payment:', error);
      }
    };

    initializePayment();
  }, [amount]);

  const startPayment = (orderId) => {
    const options = {
      key: 'my_key', 
      amount: amount * 100, 
      currency: 'INR',
      name: 'Your Company',
      description: 'Course Enrollment',
      order_id: orderId,
      handler: async function (response) {
        const paymentDetails = {
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
        };
        await verifyPayment(paymentDetails);
      },
      prefill: {
        name: 'Mayur Jaiswal',
        email: 'mayurjaiswal@gmail.com',
        contact: '9876543210',
      },
      theme: {
        color: '#F37254',
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const verifyPayment = async (paymentDetails) => {
    try {
      const response = await verifyPayment(paymentDetails);
      if (response.success) {
        alert('Payment Successful!');
      } else {
        alert('Payment Verification Failed');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      alert('Payment Verification Failed');
    }
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <p>Amount: ₹{amount}</p>
      <button onClick={() => startPayment(orderId)}>Pay Now</button>
    </div>
  );
};

export default PaymentPage;