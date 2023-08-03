import { NextApiRequest, NextApiResponse } from 'next';

import { getOrCreateUser, updateToken } from '@/services/users';

const live = async (req: NextApiRequest, res: NextApiResponse) => {
  const { wallet, token } = req.body;
  try {
    await getOrCreateUser(wallet);
    await updateToken(wallet, token);
    res.status(200).send('Email sent successfully.');
  } catch (error) {
    res.status(400).send('Email not sent.');
  }
};

export default live;
