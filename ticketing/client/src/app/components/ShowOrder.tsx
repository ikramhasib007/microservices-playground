"use client";

import useRequest from '@/hooks/use-request'
import React from 'react'

const ShowTicket: React.FC<{ order: any }> = ({ order }) => {
  const { doRequest, errors } = useRequest()

  async function onPayNow() {
    const data = await doRequest({
      url: "/api/payments",
      method: "post",
      body: {
        token: "",
        orderId: order.id
      },
      onSuccess: (payment: any) => console.log(payment)
    })
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Ticket: {order.ticket!.title}</h1>
          <p className="mt-2 text-sm text-gray-700">
            Price: ${order.ticket.price}
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={onPayNow}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Pay now
          </button>
        </div>
      </div>
      {errors}
    </div>
  )
}

export default ShowTicket