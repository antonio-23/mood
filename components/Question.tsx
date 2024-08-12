import { askQuestion } from '@/utils/api'
import { Loader2, Search } from 'lucide-react'
import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'
import { Input } from './ui/input'

export default function Question() {
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState()

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    const answer = await askQuestion(value)
    setResponse(answer)
    setValue('')
    setIsLoading(false)
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          {isLoading ? (
            <Loader2 className="absolute left-2.5 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />
          ) : (
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          )}

          <Input
            type="search"
            placeholder="Ask a question"
            onChange={onChange}
            value={value}
            disabled={isLoading}
            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
          />
        </div>
      </form>

      {response && (
        <AlertDialog defaultOpen={true}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Your answer</AlertDialogTitle>
              <AlertDialogDescription className="line-clamp-6">
                {response}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setResponse(null)}>
                Cancel
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}
