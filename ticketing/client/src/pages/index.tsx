import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import RootLayout from '@/Layouts/layout';
import Navigation from '@/components/Navigation';
import buildClient from '@/libs/build-client';

/**
 * Service endpoints naming convention
 * http(s)://[service-name].[namespace-name].svc.cluster.local
 * SERVICE NAME: ingress-nginx-controller // k get services -n ingress-nginx
 * NAMESPACE: ingress-nginx
 * http://ingress-nginx-controller.ingress-nginx.svc.cluster.local
 */

type HomePageProps = {
  currentUser: object|null;
}
 
export default function Home({
  currentUser,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  
  console.log('[Client] currentUser: ', currentUser);

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
                    {/* Your content */}
                    {currentUser ?
                      <span>Wellcome! You are signin...!</span>
                      :
                      <span>Wellcome! Please login first...!</span>
                    }
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

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (ctx) => {
  const client = buildClient(ctx);
  
  let currentUser = null;
  try {
    // kubectl get svc -A
    const { data } = await client.get("/api/users/current-user")
    console.log('[getServerSideProps] currentUser: ', data);
    currentUser = data
  } catch (error: any) {
    console.log('[getServerSideProps] error: ', error.message);
  }
  return { props: { currentUser } }
}