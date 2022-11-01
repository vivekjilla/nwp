import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllComments } from './api'

export default async function fetchComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { blog_id }: { blog_id?: string } = req.query

  if (!blog_id) {
    return res.status(400).json({ message: 'Missing parameter.' })
  }

  try {
    const comments = await getAllComments(blog_id);
    return res.status(200).json(comments)
  } catch (_) {
    return res.status(400).json({ message: 'Unexpected error occurred.' })
  }
}
