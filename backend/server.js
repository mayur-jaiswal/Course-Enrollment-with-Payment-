const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

const fixedEmail = 'jaiswalmayur67@gmail.com';
const otpStorage = {}; 

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'pass',
  database: 'sciastradb'
});

// Function to generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ratetheat@gmail.com',
    pass: 'password', 
  },
});

app.post('/send-otp', async (req, res) => {
  const { course_id } = req.body;
  const otp = generateOTP();

  try {
    const mailOptions = {
      from: 'Sender <ratetheat@gmail.com>',
      to: fixedEmail,
      subject: 'Your OTP',
      text: `Your OTP for course enrollment is: ${otp}`
    };

    await transporter.sendMail(mailOptions);

    otpStorage[course_id] = otp;

    res.json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

app.post('/verify-otp', async (req, res) => {
  const { course_id, otp } = req.body;

  if (otpStorage[course_id] && otpStorage[course_id] === otp) {
    res.json({ success: true, message: 'OTP verified. Enrollment successful!' });
  } else {
    console.log("OTP verification failed: Incorrect OTP or course ID.");
    res.status(401).json({ success: false, message: 'Invalid OTP' });
  }
});

app.get('/api/courses', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM courses');
    res.json(results);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});
app.post('/api/payment-success', async (req, res) => {
  const { payment_id, order_id, signature } = req.body;

  const razorpay = new Razorpay({
    key_id: 'my_key',
    key_secret: 'secret',
  });

  try {
    const body = order_id + "|" + payment_id;
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', razorpay.key_secret);
    hmac.update(body);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === signature) {
      res.json({ success: true, message: 'Payment verified successfully!' });
    } else {
      res.status(400).json({ error: 'Payment verification failed' });
    }
  } catch (error) {
    console.error('Payment verification failed:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
