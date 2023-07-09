import React, { FC, PropsWithChildren } from 'react'
import Navigation from '../components/Navigation'

const SigninLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <section>
      <div className="min-h-full">
        <Navigation
          items={[
            { name: 'Home', href: '/', current: true },
            { name: 'Sign In', href: '/signin', current: false },
            { name: 'Sign Up', href: '/signup', current: false },
          ]}
        />
        {children}
      </div> 
    </section>
  )
}

export default SigninLayout