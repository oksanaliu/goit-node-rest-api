import nodemailer from 'nodemailer';

const { UKRNET_USER, UKRNET_PASS, BASE_URL } = process.env;

const transport = nodemailer.createTransport({
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: UKRNET_USER,
    pass: UKRNET_PASS,
  },
});

export async function sendVerificationEmail(to, token) {
  const verifyURL = `${BASE_URL}/api/auth/verify/${token}`;
  const mailOptions = {
    from: UKRNET_USER,
    to,
    subject: 'Verify your email',
    text: `Click here to verify: ${verifyURL}`,
    html: `<p>Click here to verify: <a href="${verifyURL}">${verifyURL}</a></p>`,
  };
  await transport.sendMail(mailOptions);
}
