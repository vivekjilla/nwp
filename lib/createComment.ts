import type { NextApiRequest, NextApiResponse } from 'next'
import type { Comment } from '../interfaces'
import { nanoid } from 'nanoid'
import { container } from './cosmos'

export default async function createComments(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { blog_id, text, user_name } = req.body

  if (!blog_id || !text || !user_name ) {
    return res.status(400).json({ message: 'Missing parameter.' })
  }


  try {

    const comment: Comment = {
      id: nanoid(),
      created_at: Date.now(),
      blog_id,
      text,
      user_name,
    }

    container.items.create(comment);
    return res.status(200).json(comment)
  } catch (_) {
    return res.status(400).json({ message: 'Unexpected error occurred.' })
  }
}
