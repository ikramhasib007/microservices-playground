"use client";

import React, { useEffect, useState } from 'react'
import useRequest from '@/hooks/use-request'
import StripeCheckout from 'react-stripe-checkout'
import { useRouter } from 'next/navigation';

type ShowOrderProps = {
  currentUser: SessionUser;
  order: Order;
}

const ShowOrder: React.FC<ShowOrderProps> = ({ order, currentUser }) => {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState<number|string>('')
  const { doRequest, errors } = useRequest()

  async function onPayNow(token: string) {
    const data = await doRequest({
      url: "/api/payments",
      method: "post",
      body: {
        token,
        orderId: order.id
      },
      onSuccess: () => router.push("/orders")
    })
  }

  useEffect(() => {
    function findTimeLeft() {
      const msLeft = new Date(order.expiresAt).getTime() - new Date().getTime()
      setTimeLeft(Math.round(msLeft / 1000))
    }

    findTimeLeft()
    const timerId = setInterval(findTimeLeft, 1000)

    return function cleanup() {
      clearInterval(timerId)
    }
  }, [order.expiresAt])

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Ticket: {order.ticket!.title}</h1>
          <p className="mt-2 text-sm text-gray-700">
            Price: ${order.ticket.price}
          </p>
          
          <p className="mt-2 text-sm text-gray-500">
            {typeof timeLeft === 'number' && timeLeft > 0 ? `Time left to pay: ${timeLeft} seconds` : 'Order expired'}
          </p>

        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <StripeCheckout
            name="Three Comma Co." // the pop-in header title
            description="Big Data Stuff" // the pop-in header subtitle
            image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png" // the pop-in header image (default none)
            token={({ id }) => onPayNow(id)}
            stripeKey='pk_test_51NcC0bIdJ5aXWqjl7kJqsNFOB06kfsfVkRNvgxCXhO9SdRljI4XeioIwYe2UDqgTc5My1RSiTwJcMRvZCYmRzquQ00MloQvjQ8'
            email={currentUser.email}
            amount={order.ticket.price * 100}
            ComponentClass="div"
            currency="USD"
            allowRememberMe
          />
            {/* <button
              type="button"
              onClick={onPayNow}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Pay now
            </button> */}
        </div>
      </div>
      {errors}
    </div>
  )
}

export default ShowOrder