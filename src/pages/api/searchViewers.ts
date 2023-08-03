import { NextApiRequest, NextApiResponse } from 'next';

import { pickUsers } from '@/services/users';

const searchViewers = async (req: NextApiRequest, res: NextApiResponse) => {
  const { amount } = req.body;
  try {
    const users = await pickUsers(amount);
    res.status(200).send(JSON.stringify(users));
  } catch (error) {
    res.status(400).send('Cannot access users.');
  }
};

export default searchViewers;
