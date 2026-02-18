import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

async function getStats() {
  const properties = await prisma.property.findMany({
    include: { rooms: true },
  })

  const totalRooms = properties.reduce((sum, p) => sum + p.rooms.length, 0)
  const occupiedRooms = properties.reduce(
    (sum, p) => sum + p.rooms.filter(r => r.status === 'OCCUPIED').length,
    0
  )

  return {
    totalProperties: properties.length,
    totalRooms,
    occupiedRooms,
    availableRooms: totalRooms - occupiedRooms,
    occupancyRate: totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0,
  }
}

export default async function Home() {
  const stats = await getStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          🏢 房東管理系統 v3.0
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-sm text-gray-600 mb-2">總物業數</div>
            <div className="text-4xl font-bold text-blue-600">{stats.totalProperties}</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-sm text-gray-600 mb-2">總房間數</div>
            <div className="text-4xl font-bold text-green-600">{stats.totalRooms}</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-sm text-gray-600 mb-2">已出租</div>
            <div className="text-4xl font-bold text-purple-600">{stats.occupiedRooms}</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-sm text-gray-600 mb-2">出租率</div>
            <div className="text-4xl font-bold text-orange-600">{stats.occupancyRate}%</div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">✅ 系統部署成功！</h2>
          <p className="text-gray-600">
            房東管理系統已成功部署到 Zeabur 雲端平台。
            您現在可以開始管理您的物業了！
          </p>
        </div>
      </div>
    </div>
  )
}