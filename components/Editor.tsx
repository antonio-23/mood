'use client'

import { updateEntry } from '@/utils/api'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import SpinnerMini from './SpinnerMini'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer'
import { Textarea } from './ui/textarea'

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(entry.analysis)

  const { mood, summary, color, subject, negative } = analysis

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true)
      const data = await updateEntry(entry.id, _value)
      setAnalysis(data.analysis)
      setIsLoading(false)
    },
  })

  const handleSubmit = async () => {
    setIsLoading(true)
    const data = await updateEntry(entry.id, value)
    setAnalysis(data.analysis)
    setIsLoading(false)
  }

  return (
    <div className="grid h-full gap-4 md:grid-cols-[1fr_25rem]">
      <div className="relative">
        <Textarea
          className="hidden md:block md:h-full md:pt-5 md:text-lg"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="md:absolute md:left-0 md:top-0 md:mb-2 md:p-2">
          {isLoading ? (
            <SpinnerMini />
          ) : (
            <div className="md:h-4 md:w-4 md:rounded-full md:bg-green-500"></div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Card style={{ backgroundColor: color }}>
          <CardHeader>
            <CardTitle>Analysis</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Subject</CardTitle>
          </CardHeader>
          <CardContent>{subject}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>{summary}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mood</CardTitle>
          </CardHeader>
          <CardContent>{mood}</CardContent>
        </Card>
      </div>

      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="fixed bottom-[10%] right-4 h-12 w-12 md:hidden"
          >
            <Pencil />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Your day</DrawerTitle>
              <DrawerDescription>
                Write about your day and see the analysis
              </DrawerDescription>
            </DrawerHeader>
            <div className="mx-4">
              <Textarea
                className="text-xl outline-none"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <DrawerFooter>
              <Button onClick={handleSubmit}>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default Editor
