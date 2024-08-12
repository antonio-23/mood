'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Tabs, TabsList, TabsTrigger } from './ui/tabs'

export default function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <Tabs defaultValue="system">
      <TabsList className="rounded-full border">
        <TabsTrigger
          value="light"
          onClick={() => setTheme('light')}
          className="rounded-full"
        >
          <Sun className="h-[1.2rem] w-[1.4rem] md:h-[1rem] md:w-[1rem]" />
        </TabsTrigger>
        <TabsTrigger
          value="system"
          onClick={() => setTheme('system')}
          className="rounded-full"
        >
          <Monitor className="h-[1.2rem] w-[1.4rem] md:h-[1rem] md:w-[1rem]" />
        </TabsTrigger>
        <TabsTrigger
          value="dark"
          onClick={() => setTheme('dark')}
          className="rounded-full"
        >
          <Moon className="h-[1.2rem] w-[1.4rem] md:h-[1rem] md:w-[1rem]" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
