import '@/styles/globals.css'
import { classNames } from '@/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Microservices playground',
  description: 'Microservices playground - author - Ikram Ud Daula',
}

/**
 * Service endpoints naming convention
 * http(s)://[service-name].[namespace-name].svc.cluster.local
 * SERVICE NAME: ingress-nginx-controller // k get services -n ingress-nginx
 * NAMESPACE: ingress-nginx
 * http://ingress-nginx-controller.ingress-nginx.svc.cluster.local
 */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html dir="ltr" lang="en" className="h-full antialiased bg-gray-100 text-gray-900 scroll-smooth">
      <body suppressHydrationWarning={true} className={classNames("min-h-screen h-full text-base tracking-normal", inter.className)}>
        
        {children}

        <footer>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
              <span className="block sm:inline">&copy; 2021 Your Company, Inc.</span>{' '}
              <span className="block sm:inline">All rights reserved.</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
