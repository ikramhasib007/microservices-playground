import Navigation from "../ui/Navigation"

export default function SignupLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <Navigation
        items={[
          { name: 'Home', href: '/', current: true },
          { name: 'Sign In', href: '/signin', current: false },
          { name: 'Sign Up', href: '/signup', current: false },
        ]}
      />
      {children}
    </section>
  )
}