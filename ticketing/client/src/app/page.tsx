import { getCurrentUser } from "@/lib/auth/current-user";
import Navigation from "./ui/Navigation";
import TicketList from "./components/TicketList";
import buildClient from "@/lib/build-client";

async function getTickets() {
  try {
    const client = buildClient();
    const { data } = await client.get("/api/tickets")
    return data;
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const currentUser = await getCurrentUser()
  const tickets = await getTickets()

  return (
    <>
      <Navigation currentUser={currentUser} />

      <main className="-mt-24 pb-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="sr-only">Page title</h1>
          {/* Main 3 column grid */}
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              <section aria-labelledby="section-1-title">
                <h2 className="sr-only" id="section-1-title">
                  Section title
                </h2>
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-6">
                    {/* Your content */}
                    {currentUser ?
                      <TicketList tickets={tickets} />
                      :
                      <span>Please login first...</span>
                    }
                  </div>
                </div>
              </section>
            </div>

            {/* Right column */}
            <div className="grid grid-cols-1 gap-4">
              <section aria-labelledby="section-2-title">
                <h2 className="sr-only" id="section-2-title">
                  Section title
                </h2>
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-6">{/* Your content */}</div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}