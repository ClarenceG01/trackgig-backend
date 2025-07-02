import jwt from 'jsonwebtoken';
export default function generateOtp() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const signedOtp = jwt.sign({ otp }, process.env.JWT_SECRET, { expiresIn:'60m' });
  return { otp, signedOtp };
}