import Header from '@/components/Header'
import SideNavigation from '@/components/SideNavigation'
import Spinner from '@/components/Spinner'
import { Suspense } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideNavigation />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Suspense fallback={<Spinner />}>{children}</Suspense>
        </main>
      </div>
    </div>
  )
}
