"use client";

import useRequest from '@/hooks/use-request'
import { useRouter } from 'next/navigation';
import React from 'react'

const ShowTicket: React.FC<{ ticket: Ticket }> = ({ ticket }) => {
  const router = useRouter()
  const { doRequest, errors } = useRequest()

  async function onPurchase() {
    const data = await doRequest({
      url: "/api/orders",
      method: "post",
      body: {
        ticketId: ticket.id
      },
      onSuccess: (order: Order) => router.push(`/orders/${order.id}`)
    })
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">{ticket.title}</h1>
          <p className="mt-2 text-sm text-gray-700">
            ${ticket.price}
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={onPurchase}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Purchase now
          </button>
        </div>
      </div>
      {errors}
    </div>
  )
}

export default ShowTicket