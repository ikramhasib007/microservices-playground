import Navigation from "../ui/Navigation"

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <Navigation
        items={[
          { name: 'Home', href: '/', current: true },
          { name: 'Sign Out', href: '/signout', current: false },
        ]}
      />
      {children}
    </section>
  )
}