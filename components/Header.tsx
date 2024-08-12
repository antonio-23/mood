'use client'

import { navLinks } from '@/components/nav-links'
import { UserButton } from '@clerk/nextjs'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Question from './Question'
import ThemeToggle from './ThemeToggle'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link href="/">
              <span className="text-xl">MOOD</span>
            </Link>
            {navLinks.map((link) => (
              <Link
                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${link.href === pathname ? 'text-primary' : 'text-muted-foreground'} hover:text-foreground`}
                key={link.name}
                href={link.href}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <ThemeToggle />
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <Question />
      </div>
      <UserButton />
    </header>
  )
}
