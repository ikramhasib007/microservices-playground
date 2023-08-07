import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth/current-user"
import SignupForm from "../components/SignupForm"

export default async function SignupPage() {
  const currentUser = await getCurrentUser()

  if(currentUser) redirect("/")
  
  return (
    <>
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
                    {/* Content here */}

                    <SignupForm />

                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}