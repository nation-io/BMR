// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import { updateUser } from '@/services/users';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  const id = await updateUser(data.wallet, data.email);
  if (!id) {
    res.status(403).json({ error: 'user doesnt exists' });
    return;
  }
  res.status(200).json({ id: id });
}
