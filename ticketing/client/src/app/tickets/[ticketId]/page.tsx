import ShowTicket from "@/app/components/ShowTicket";
import buildClient from "@/lib/build-client"

async function getTicket(ticketId: string): Promise<Ticket|null> {
  try {
    const client = buildClient()
    const { data } = await client.get(`/api/tickets/${encodeURI(ticketId)}`)
    return data;
  } catch (error) {
    return null
  }
}

export default async function TicketShowPage({ params }: { params: { ticketId: string } }) {
  const ticket = await getTicket(params.ticketId)
  
  return (
    <>
      {ticket ? <ShowTicket ticket={ticket} /> : 'No tickets'}
    </>
  )
}