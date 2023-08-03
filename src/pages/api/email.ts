import sgMail from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';

const sendgridApiKey: string = process.env.NEXT_PUBLIC_SENDGRID_API_KEY ?? '';

const sendEmailHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  sgMail.setApiKey(sendgridApiKey);

  const { to, message, subject } = req.body;

  const content = {
    to: to,
    from: 'noreply@nation.io',
    subject: subject,
    text: message,
    html: `<p>${message}</p>`,
  };

  try {
    await sgMail.send(content);
    res.status(200).send('Email sent successfully.');
  } catch (error) {
    res.status(400).send('Email not sent.');
  }
};

export default sendEmailHandler;
