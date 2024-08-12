import { buttonVariants } from '@/components/ui/button'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'

export default function Home() {
  const { userId } = auth()
  let href = userId ? '/journal' : 'new-user'

  return (
    <main className="flex h-full w-full items-center justify-center p-10 md:p-0">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-5xl md:text-6xl">
          The best Jurnal app, period.
        </h1>
        <p className="mb-4 text-xl text-muted-foreground md:text-2xl">
          This is the best app for tracking your mood through out your life. All
          you have to do is be honest.
        </p>
        <Link href={href} className={buttonVariants({ variant: 'default' })}>
          get started
        </Link>
      </div>
    </main>
  )
}
