const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, 
  key_secret: process.env.RAZORPAY_KEY_SECRET, 
});

exports.createOrder = async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100, 
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString('hex'),
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      orderId: order.id,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ success: false, message: 'Failed to create Razorpay order' });
  }
};

exports.verifyPayment = (req, res) => {
  const { paymentId, orderId, signature } = req.body;

  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(orderId + '|' + paymentId)
    .digest('hex');

  if (generatedSignature === signature) {
    res.json({ success: true, message: 'Payment verified successfully!' });
  } else {
    res.status(400).json({ success: false, message: 'Payment verification failed' });
  }
};
