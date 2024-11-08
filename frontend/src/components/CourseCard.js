import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');

  const handleEnrollClick = async () => {
    try {
      const response = await axios.post('http://localhost:5000/send-otp', { course_id: course.id });
      if (response.data.message) {
        setOtpSent(true);
        setShowOTPModal(true);
        setMessage('OTP sent to your email.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setMessage('Error sending OTP.');
    }
  };
  const navigate=useNavigate()
  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/verify-otp', { course_id: course.id, otp });
      if (response.data.success) {
        setMessage('OTP verified. Enrollment successful!');
        setShowOTPModal(false);
        
        navigate('/payment')
      } else {
        setMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage('Error verifying OTP.');
    }
  };  

  return (
    <div className="course-card">
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <p><strong>Price: ₹{course.price}</strong></p>
      {course.discount > 0 && (
        <p><strong>Discount: ₹{course.discount}</strong> </p>
      )}
      <button onClick={handleEnrollClick}>Enroll Now</button>

      {showOTPModal && (
        <div className="otp-modal">
          <h4>Enter OTP</h4>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
          <button onClick={() => setShowOTPModal(false)}>Cancel</button>
          <p>{message}</p>
        </div>
      )}
      {!showOTPModal && <p>{message}</p>}
    </div>
  );
};

export default CourseCard;
