import { getCurrentUser } from "@/lib/auth/current-user"
import Navigation from "../ui/Navigation"

export default async function OrderLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <section>
      <Navigation currentUser={currentUser} />
      <main className="-mt-24 pb-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="sr-only">Orders</h1>
          {/* Main 3 column grid */}
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              <section aria-labelledby="section-1-title">
                <h2 className="sr-only" id="section-1-title">
                  New Order
                </h2>
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-6">
                    {/* Your content */}
                    {children}
                  </div>
                </div>
              </section>
            </div>

          </div>
        </div>
      </main>
    </section>
  )
}