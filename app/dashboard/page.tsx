import { Building2, Users, DollarSign, Wrench, Calendar, TrendingUp } from 'lucide-react'
import StatCard from '@/components/StatCard'
import RecentActivity from '@/components/RecentActivity'
import RevenueChart from '@/components/RevenueChart'

export default function DashboardPage() {
  const stats = [
    {
      title: '總物業數',
      value: '8',
      change: '+2',
      icon: Building2,
      color: 'blue',
    },
    {
      title: '現住租客',
      value: '24',
      change: '+3',
      icon: Users,
      color: 'green',
    },
    {
      title: '本月收入',
      value: 'NT$ 256,800',
      change: '+12%',
      icon: DollarSign,
      color: 'purple',
    },
    {
      title: '待處理報修',
      value: '5',
      change: '-2',
      icon: Wrench,
      color: 'orange',
    },
    {
      title: '即將到期租約',
      value: '3',
      change: '0',
      icon: Calendar,
      color: 'red',
    },
    {
      title: '入住率',
      value: '92%',
      change: '+4%',
      icon: TrendingUp,
      color: 'teal',
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* 歡迎標題 */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">儀表板</h1>
        <p className="text-gray-600 mt-2">歡迎回來！以下是您的物業管理概覽</p>
      </div>

      {/* 統計卡片網格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* 圖表與活動區域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 收入圖表 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">收入趨勢</h2>
                <p className="text-gray-600 text-sm">過去12個月收入分析</p>
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>過去12個月</option>
                <option>過去6個月</option>
                <option>今年至今</option>
              </select>
            </div>
            <RevenueChart />
          </div>
        </div>

        {/* 近期活動 */}
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>

      {/* 快速操作 */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">快速操作</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <Building2 className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">新增物業</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <Users className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">新增租客</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <DollarSign className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">記錄繳費</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <Wrench className="h-8 w-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">報修申請</span>
          </button>
        </div>
      </div>
    </div>
  )
}