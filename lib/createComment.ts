import type { NextApiRequest, NextApiResponse } from 'next'
import type { Comment } from '../interfaces'
import { nanoid } from 'nanoid'

export default async function createComments(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { blog_id, text, user_name } = req.body
  const { authorization } = req.headers

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

    // write data
    //await redis.lpush(url, JSON.stringify(comment))

    return res.status(200).json(comment)
  } catch (_) {
    return res.status(400).json({ message: 'Unexpected error occurred.' })
  }
}
