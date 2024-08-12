import { BookHeart, History, Home } from 'lucide-react'

export const navLinks = [
  {
    name: 'Home',
    href: '/',
    icon: <Home className="h-4 w-4" />,
  },
  {
    name: 'Journal',
    href: '/journal',
    icon: <BookHeart className="h-4 w-4" />,
  },
  {
    name: 'History',
    href: '/history',
    icon: <History className="h-4 w-4" />,
  },
]
