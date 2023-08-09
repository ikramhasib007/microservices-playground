import ShowOrder from "@/app/components/ShowOrder";
import { getCurrentUser } from "@/lib/auth/current-user";
import buildClient from "@/lib/build-client"

async function getOrder(orderId: string) {
  try {
    const client = buildClient()
    const { data } = await client.get(`/api/orders/${encodeURI(orderId)}`)
    return data;
  } catch (error) {
    return null
  }
}

export default async function TicketShowPage({ params }: { params: { orderId: string } }) {
  const order = await getOrder(params.orderId)
  const currentUser = await getCurrentUser()
  
  return (
    <ShowOrder currentUser={currentUser} order={order} />
  )
}