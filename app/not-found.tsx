import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-8xl font-bold">404</h1>
        <p className="text-lg text-muted-foreground">
          {`Oops! The page you're looking for doesn't exist.`}
        </p>
        <Link
          href="/"
          prefetch={false}
          className={buttonVariants({ variant: 'default' })}
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  )
}
