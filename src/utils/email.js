import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, content) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    transporter.sendMail({
      from: process.env.EMAIL_SENDER,
      text: content,
      to,
      subject,
    });
  } catch (error) {
    throw new Error(`Failed Sending email: ${error}`);
  }
};

export default sendEmail;
