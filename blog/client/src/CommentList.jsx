import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

export default function CommentList({ postId }) {
  console.log('postId: ', postId);
  const [comments, setComments] = useState({})
  console.log('comments: ', comments);

  const fetchCommentsByPostId = useCallback(
    async () => {
      try {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
        console.log('res: ', res);
        setComments(res.data)
      } catch (error) {
        console.log('error: ', error);
      }
    },
    [postId]
  )

  useEffect(() => {
    fetchCommentsByPostId()
  }, [fetchCommentsByPostId])

  return (
    <div className='px-6'>
      <p className='text-gray-500'>
        <span className='bold'>{Object.values(comments).length}</span> comments
      </p>
      <ul className=''>
        {Object.values(comments).map((comment) => <li>{comment.content}</li>)}
      </ul>
    </div>
  )
}