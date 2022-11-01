type CommentFormProps = {
  text: string
  setText: Function
  name: string
  setName: Function
  onSubmit: (e: React.FormEvent) => Promise<void>
}

export default function CommentForm({
  text,
  setText,
  name,
  setName,
  onSubmit,
}: CommentFormProps) {

  return (
    <form onSubmit={onSubmit}>
      <input
        className="flex max-h-40 p-3 rounded mb-4 bg-gray-200 text-gray-900 placeholder-gray-500"
        placeholder={`What is your name?`        }
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <textarea
        className="flex w-full max-h-40 p-3 rounded resize-y bg-gray-200 text-gray-900 placeholder-gray-500"
        rows={2}
        placeholder={`What are your thoughts?`        }
        onChange={(e) => setText(e.target.value)}
        value={text}
      />

      <div className="flex items-center mt-4">
        <div className="flex items-center space-x-6">
          <button className="py-2 px-4 rounded bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700">
            Send
          </button>
        </div>
      </div>
    </form>
  )
}
