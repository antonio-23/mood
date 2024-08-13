'use client'

import { createNewEntry } from '@/utils/api'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from './ui/button'

const NewEntry = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleOnClick = async () => {
    setIsLoading(true)
    const data = await createNewEntry()
    router.push(`/journal/${data.id}`)
    setIsLoading(false)
  }

  return (
    <Button disabled={isLoading} onClick={handleOnClick}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}New Entry
    </Button>
  )
}

export default NewEntry
