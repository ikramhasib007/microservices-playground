import ShowOrder from "@/app/components/ShowOrder";
import buildClient from "@/lib/build-client"

async function getOrder(orderId: string) {
  try {
    const client = buildClient()
    const { data } = await client.get(`/api/orders/${orderId}`)
    return data;
  } catch (error) {
    return null
  }
}

export default async function TicketShowPage({ params }: { params: { orderId: string } }) {
  const order = await getOrder(params.orderId)
  
  return (
    <ShowOrder order={order} />
  )
}