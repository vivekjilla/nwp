import CommentForm from './form'
import CommentList from './list'
import useComments from '../../hooks/useComment'
import type { Comment } from '../../interfaces'
type CommentProps = {
  init_comments?: Comment[]
}
export default function Comment({
  init_comments,
}: CommentProps) {
  const { text, setText, name, setName, comments, onSubmit } = useComments()

  let final_comments = init_comments ? init_comments.concat(comments): comments;
  if (final_comments){
    final_comments = final_comments.filter((item, index) => { return (final_comments.indexOf(item) == index) })
  }
  return (
    <div className="mt-20">
      <CommentForm onSubmit={onSubmit} text={text} setText={setText} name={name} setName={setName}/>
      <CommentList comments={final_comments} />
    </div>
  )
}
