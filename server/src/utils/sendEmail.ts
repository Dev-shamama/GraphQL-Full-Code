import nodeMailer from "nodemailer";
import config from "../config/config";

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

const sendEmail = async (options: EmailOptions): Promise<void> => {
  // Ensure environment variables are properly typed and non-nullable
  const transporter = nodeMailer.createTransport({
    service: config.SMTP_SERVICE as string,
    host: config.SMTP_HOST as string,
    port: Number(config.SMTP_PORT),
    auth: {
      user: config.SMTP_MAIL as string,
      pass: config.SMTP_PASSWORD as string,
    },
  });

  const mailOptions = {
    from: config.SMTP_MAIL as string, // Fixed typo 'form' -> 'from'
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // Type-safe async/await with void return type
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
