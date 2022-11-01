import type { NextApiRequest, NextApiResponse } from 'next'
import type { Comment } from '../interfaces'
import { container } from './cosmos'

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
      const queryspec = {
        query: "SELECT * from c where c.blog_id == @blog_id",
        parameters: [{
          name: "@blog_id",
          value: blog_id
        }]
      };
        
    const { resources } = await container.items.query(queryspec).fetchAll();

    // string data to object
    const comments = resources.map((c) => {
      const comment: Comment = JSON.parse(c)
      return comment
    })

    return res.status(200).json(comments)
  } catch (_) {
    return res.status(400).json({ message: 'Unexpected error occurred.' })
  }
}
