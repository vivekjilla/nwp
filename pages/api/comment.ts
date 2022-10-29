import type { NextApiRequest, NextApiResponse } from 'next'
import fetchComment from '../../lib/fetchComment'
import createComments from '../../lib/createComment'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return fetchComment(req, res)
    case 'POST':
      return createComments(req, res)
    default:
      return res.status(400).json({ message: 'Invalid method.' })
  }
}
