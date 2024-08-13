import NewEntry from '@/components/NewEntry'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'

const getEntries = async () => {
  const user = await getUserByClerkID()

  if (!user) {
    console.error('No entries found because user is not found.')
    return []
  }

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  })

  return entries
}

export default async function Page() {
  const entries = await getEntries()

  return (
    <div className="flex flex-col gap-4">
      <div>
        <NewEntry />
      </div>
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Journal</CardTitle>
          <CardDescription>Your journal entries</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead className="hidden sm:table-cell">Mood</TableHead>
                <TableHead className="hidden md:table-cell">Title</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="hidden md:table-cell">
                    <Link key={entry.id} href={`/journal/${entry.id}`}>
                      {new Date(entry.createdAt).toDateString()}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Link key={entry.id} href={`/journal/${entry.id}`}>
                      <Badge className="text-xs" variant="secondary">
                        {entry.analysis?.mood}
                      </Badge>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link key={entry.id} href={`/journal/${entry.id}`}>
                      <div className="font-medium">
                        {entry.analysis?.subject}
                      </div>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
