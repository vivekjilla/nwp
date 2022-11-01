import CommentForm from './form'
import CommentList from './list'
import useComments from '../../hooks/useComment'
import type { Comment } from '../../interfaces'
import { useEffect } from 'react'
type CommentProps = {
  init_comments?: Comment[]
}
export default function Comment({
  init_comments,
}: CommentProps) {
  const { text, setText, name, setName, comments, setComments, onSubmit } = useComments()
  useEffect(() => {
    setComments(init_comments);
  }, [init_comments]);
  return (
    <div className="mt-20">
      <CommentForm onSubmit={onSubmit} text={text} setText={setText} name={name} setName={setName}/>
      <CommentList comments={comments} />
    </div>
  )
}
