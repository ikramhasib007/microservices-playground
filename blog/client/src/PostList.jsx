import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default function PostList() {
  const [posts, setPosts] = useState({})
  console.log('posts: ', posts);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/posts")
      setPosts(res.data)
    } catch (error) {
      console.log('error: ', error);
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div>
      <div className="isolate bg-white px-6 py-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">Posts</h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the posts in your account including their name, title, email and role.
                </p>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Object.keys(posts).map((postId, i) => (
                      <li key={postId} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                        <div className="flex w-full items-center justify-between space-x-6 p-6">
                          <div className="flex-1 truncate">
                            <div className="flex items-center space-x-3">
                              <h3 className="truncate text-sm font-medium text-gray-900">{posts[postId].title}</h3>
                            </div>
                          </div>
                        </div>
                        <div>
                          <CommentList postId={postId} />
                          <div className="-mt-px flex divide-x divide-gray-200">
                              <CommentCreate postId={postId} />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}