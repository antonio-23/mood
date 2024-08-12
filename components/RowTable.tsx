import { Badge } from '@/components/ui/badge'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'

const getEntry = async (id: string) => {
  const user = await getUserByClerkID()

  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  })

  return entry
}

export default async function RowTable({ entry }: { entry: any }) {
  const entryData = await getEntry(entry.id)

  return (
    <>
      {entry.map((entry) => (
        <>
          <TableCell key={entry.id}>
            <Link key={entry.id} href={`/journal/${entry.id}`}>
              <div className="font-medium">{entry.title}</div>
            </Link>
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            <Link key={entry.id} href={`/journal/${entry.id}`}>
              Text summary
            </Link>
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            <Link key={entry.id} href={`/journal/${entry.id}`}>
              <Badge className="text-xs" variant="secondary">
                Mood
              </Badge>
            </Link>
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <Link key={entry.id} href={`/journal/${entry.id}`}>
              {new Date(entry.createdAt).toDateString()}
            </Link>
          </TableCell>
        </>
      ))}
    </>
  )
}
