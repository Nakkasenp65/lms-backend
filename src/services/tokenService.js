import 

const sendVerificationEmail = async () => {

  const verificationToken = generateToken.getVerificationToken(user);

  const mailContent = `${process.env.FRONTEND_URL}users/verify-email?token=${verificationToken}`;
  sendEmail(email, 'Email Verification Test', mailContent);
} 

export default {sendVerificationEmail};