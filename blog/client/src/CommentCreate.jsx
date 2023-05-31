import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'

export default function CommentCreate({ postId }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: ""
    }
  })

  async function onSubmit(data) {
    console.log('data: ', data);
    try {
      await axios.post(`http://localhost:4001/posts/${postId}/comments`, data)
      reset()
    } catch (error) {
      console.log('error: ', error);
    }
  }
  

  return (
    <div className='bg-white px-6 lg:px-8'>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-6 max-w-xl" noValidate>
        <div className="grid grid-cols-3 gap-x-8 gap-y-6">
          <div className="col-span-2">
            <label htmlFor="content" className="sr-only">
              Comment content
            </label>
            <div className="">
              <input
                type="text"
                {...register("content", { required: true })}
                id="content"
                placeholder='Write a comment...'
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="col-span-1">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Comment
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}