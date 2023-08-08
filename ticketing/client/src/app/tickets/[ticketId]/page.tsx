import ShowTicket from "@/app/components/ShowTicket";
import buildClient from "@/lib/build-client"

async function getTicket(ticketId: string) {
  try {
    const client = buildClient()
    const { data } = await client.get(`/api/tickets/${ticketId}`)
    return data;
  } catch (error) {
    return null
  }
}

export default async function TicketShowPage({ params }: { params: { ticketId: string } }) {
  const ticket = await getTicket(params.ticketId)
  
  return (
    <ShowTicket ticket={ticket} />
  )
}