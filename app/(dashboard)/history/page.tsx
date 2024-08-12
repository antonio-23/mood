import HistoryChart from '@/components/HistoryChart'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getData = async () => {
  const user = await getUserByClerkID()
  const analysis = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  const sum = analysis.reduce((acc, curr) => acc + curr.sentimentScore, 0)
  const average = Math.round(sum / analysis.length)

  return { analysis, average }
}

export default async function History() {
  const { analysis, average } = await getData()

  console.log(analysis)

  return (
    <div className="h-full w-full">
      <div>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {`Avg. Sentiment ${average}`}
        </h3>
      </div>
      <div>
        <HistoryChart data={analysis} />
      </div>
    </div>
  )
}
