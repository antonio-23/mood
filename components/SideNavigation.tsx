'use client'

import { navLinks } from '@/components/nav-links'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

export default function SideNavigation() {
  const pathName = usePathname()

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/">
            <span className="text-xl">MOOD</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navLinks.map((link) => (
              <Link
                href={link.href}
                key={link.name}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${link.href === pathName ? 'text-primary' : 'text-muted-foreground'} transition-all hover:text-primary`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
