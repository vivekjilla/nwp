import type { Comment } from '../interfaces'
import React, { useState, useEffect } from 'react'
import useSWR from 'swr'

export default function useComments() {
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [comments, setComments] = useState([])
  const [blog_id, setBlogId] = useState<string | null>(null)
  /*
  const { data: comments, mutate } = useSWR<Comment[]>(
    blog_id,
    async (blog_id: string) => {
      console.log("bid in swr: " + blog_id)
      const query = new URLSearchParams({ blog_id })
      const queryUrl = `/api/comment?${query.toString()}`

      const res = await fetch(queryUrl)
      return res.status == 200 ? res.json() : []
    },
    { fallbackData: init_comments }
  )
*/
  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const blog_id = pathParts[pathParts.length - 1]
    if (blog_id) {
      setBlogId(blog_id)
    }
  })

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const user_name = name
    try {
      const res = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ blog_id, text, user_name }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setText('')
      setName('')
      //await mutate()
      //console.log(res)
      if(res.status == 200){
        const new_comment = await res.json()
        console.log("new_comment : "+ new_comment)
        setComments([new_comment, ...comments])
      }
    } catch (err) {
      console.log(err)
    }
  }

  return { text, setText, name, setName, comments, setComments, onSubmit }
}
