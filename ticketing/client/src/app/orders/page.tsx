import buildClient from '@/lib/build-client';
import React from 'react'
import OrderList from '../components/OrderList';

async function getOrders(): Promise<Order[]|null> {
  try {
    const client = buildClient()
    const { data } = await client.get(`/api/orders`)
    return data;
  } catch (error) {
    return null
  }
}

export default async function OrdersPage() {
  const orders = await getOrders()

  return (
    <>
      {orders?.length ? <OrderList orders={orders} /> : null}
    </>
  )
}
