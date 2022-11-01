import type { Comment } from '../../interfaces'
import distanceToNow from '../../lib/dateRelative'
import TimeDisplay from './timedisplay'

type CommentListProps = {
  comments?: Comment[]
}

export default function CommentList({ comments }: CommentListProps) {

  return (
    <div className="space-y-6 mt-10">
      {comments &&
        comments.map((comment) => {
          return (
            <div key={comment.created_at} className="flex space-x-4">
              <div className="flex-grow">
                <div className="flex space-x-2">
                  <b>{comment.user_name}</b>
                  <time className="text-gray-400">
                    <TimeDisplay time={comment.created_at}/>
                  </time>
                </div>

                <div>{comment.text}</div>
              </div>
            </div>
          )
        })}
    </div>
  )
}
