import { getCurrentUser } from "@/lib/auth/current-user"
import Navigation from "../ui/Navigation"

export default async function SignupLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <section>
      <Navigation currentUser={currentUser} />
      {children}
    </section>
  )
}