// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import { createTicket } from '@/services/tickets';
import { getOrCreateUser } from '@/services/users';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  const user = await getOrCreateUser(data.wallet);
  if (!user) {
    res.status(403).json({ name: 'Bambang' });
    return;
  }
  await createTicket({ ...data, user: user.id });
  res.status(200).json({ action: 'success' });
}
