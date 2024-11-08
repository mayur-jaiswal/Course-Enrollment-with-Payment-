import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

export const getCourses = async () => {
  try {
    const response = await api.get('/courses');
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw new Error('Error fetching courses');
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course by ID:', error);
    throw new Error('Error fetching course by ID');
  }
};

export const createOrder = async (amount) => {
  try {
    const response = await api.post('/payment/create-order', { amount });
    return response.data;
  } catch (error) {
    console.error('Error creating payment order:', error);
    throw new Error('Error creating payment order');
  }
};

export const verifyPayment = async (paymentData) => {
  try {
    const response = await api.post('/payment/verify-payment', paymentData);
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw new Error('Error verifying payment');
  }
};
