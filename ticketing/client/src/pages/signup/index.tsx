import { FormEvent, useState } from "react"
import useRequest from "@/hooks/use-request"
import { useRouter } from "next/router"
import Navigation from "@/components/Navigation"
import RootLayout from "@/Layouts/layout"

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { doRequest, errors } = useRequest()


  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data = doRequest({
      url: "/api/users/signup",
      method: "post",
      body: { email, password },
      onSuccess: () => router.push("/")
    })
    console.log('response: ', data);
  }

  return (
    <RootLayout>
      <Navigation
        items={[
          { name: 'Home', href: '/', current: true },
          { name: 'Sign In', href: '/signin', current: false },
          { name: 'Sign Up', href: '/signup', current: false },
        ]}
      />

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

                    <form onSubmit={onSubmit} className="px-6 sm:px-12">
                      <div className="space-y-12">

                        <div className="border-b border-gray-900/10 pb-12">
                          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            
                            <div className="sm:col-span-4">
                              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                              </label>
                              <div className="mt-2">
                                <input
                                  id="email"
                                  name="email"
                                  type="email"
                                  value={email}
                                  onChange={e => setEmail(e.target.value)}
                                  autoComplete="email"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-4">
                              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="password"
                                  id="password"
                                  value={password}
                                  onChange={e => setPassword(e.target.value)}
                                  autoComplete="current-password"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Save
                        </button>
                      </div>
                    </form>

                    {errors}

                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </RootLayout>
  )
}