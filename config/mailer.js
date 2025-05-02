const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '34901ed3f337ec',
    pass: '8112e174758890',
  },
});

const sendMail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: '"MyApp" <no-reply@myapp.com>',
      to,
      subject,
      text,
      html,
    });

    console.log('Email sent: %s', info.messageId);
  } catch (err) {
    console.error('Error sending email:', err);
    throw err;
  }
};

module.exports = sendMail;
