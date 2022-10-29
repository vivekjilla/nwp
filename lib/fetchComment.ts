import type { NextApiRequest, NextApiResponse } from 'next'
import type { Comment } from '../interfaces'

export default async function fetchComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { blog_id }: { blog_id?: string } = req.query

  if (!blog_id) {
    return res.status(400).json({ message: 'Missing parameter.' })
  }


  try {
    // get data
    const rawComments = []//await redis.lrange(url, 0, -1)

    // string data to object
    const comments = rawComments.map((c) => {
      const comment: Comment = JSON.parse(c)
      return comment
    })

    return res.status(200).json(comments)
  } catch (_) {
    return res.status(400).json({ message: 'Unexpected error occurred.' })
  }
}
