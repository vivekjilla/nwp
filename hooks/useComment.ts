import type { Comment } from '../interfaces'
import React, { useState, useEffect } from 'react'
import useSWR from 'swr'

export default function useComments() {
  const [text, setText] = useState('')
  const [blog_id, setBlogId] = useState<string | null>(null)

  const { data: comments, mutate } = useSWR<Comment[]>(
    '/api/comment',
    (url: string) => {
      const query = new URLSearchParams({ blog_id })
      const queryUrl = `${url}?${query.toString()}`

      return fetch(queryUrl).then((res) => res.json())
    },
    { fallbackData: [] }
  )

  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const blog_id = pathParts[pathParts.length - 1]
    console.log(blog_id)
    setBlogId(blog_id)
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const user_name = "hello"
    try {
      await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ blog_id, text, user_name }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setText('')
      await mutate()
    } catch (err) {
      console.log(err)
    }
  }

  return { text, setText, comments, onSubmit }
}
