import React from 'react'

export default function CommentList({ comments }) {

  return (
    <div className='px-6'>
      <p className='text-gray-500'>
        <span className='bold'>{Object.values(comments).length}</span> comments
      </p>
      <ul className=''>
        {Object.values(comments).map((comment, i) => <li key={`${i}`}>
          {comment.status === 'pending' ? 'This comment is awaiting moderation...' : comment.status === 'rejected' ? 'This comment has been rejected' : comment.content}
        </li>)}
      </ul>
    </div>
  )
}