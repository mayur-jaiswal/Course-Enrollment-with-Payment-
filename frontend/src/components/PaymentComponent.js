import React, { useEffect } from 'react';
import axios from 'axios';

const PaymentComponent = ({ courseId, amount }) => {
  useEffect(() => {
    const createOrder = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/create-order', {
          courseId,
          amount,
        });
        
        const { order } = response.data;
        console.log('Order created successfully:', order);  
        if (order && order.id) {
          const options = {
            key: 'my_key',
            amount: order.amount,
            currency: order.currency,
            name: 'SciAstra Course Enrollment',
            description: 'Pay for course enrollment',
            order_id: order.id,
            handler: function (response) {
              // Handle payment success
              console.log('Payment success:', response);
            },
            prefill: {
              name: 'Mayur Jaiswal',
              email: 'mayurjaiswal@gmail.com',
              contact: '9999999999',
            },
            theme: {
              color: '#F37254',
            },
          };

          const razorpay = new window.Razorpay(options);
          razorpay.open();
        } else {
          console.error('Failed to create order: No order ID');
        }
      } catch (error) {
        console.error('Error creating Razorpay order:', error);
      }
    };

    createOrder();
  }, [courseId, amount]);

  return (
    <div>
      <h3>Course Payment</h3>
      <p>Please proceed with the payment for the selected course.</p>
    </div>
  );
};

export default PaymentComponent;
