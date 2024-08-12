'use client'

import { createNewEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

const NewEntry = () => {
  const router = useRouter()

  const handleOnClick = async () => {
    const data = await createNewEntry()
    router.push(`/journal/${data.id}`)
  }

  return <Button onClick={handleOnClick}>New Entry</Button>
}

export default NewEntry