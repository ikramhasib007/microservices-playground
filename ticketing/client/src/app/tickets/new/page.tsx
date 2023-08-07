import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth/current-user"
import TicketForm from "@/app/components/TicketForm"

export default async function NewTicket() {
  const currentUser = await getCurrentUser()
  if(!currentUser) redirect("/signin")

  return (
    <TicketForm />
  )
}
