import Navigation from '@/app/components/Navigation'

export default function Nav() {
  return (
    <>
      <Navigation
        items={[
          { name: 'Home', href: '/', current: true },
          { name: 'Sign Out', href: '/signup', current: false },
        ]}
      />
    </>
  )
}
