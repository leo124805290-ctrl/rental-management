import { CheckCircle, Clock, AlertCircle, DollarSign, UserPlus, Wrench } from 'lucide-react'

const activities = [
  {
    id: 1,
    type: 'payment',
    title: '租金已繳納',
    description: '王先生繳納3月租金 NT$15,000',
    time: '10分鐘前',
    icon: DollarSign,
    color: 'text-green-600 bg-green-100',
  },
  {
    id: 2,
    type: 'maintenance',
    title: '新報修申請',
    description: 'B棟302室 - 浴室漏水',
    time: '1小時前',
    icon: Wrench,
    color: 'text-orange-600 bg-orange-100',
  },
  {
    id: 3,
    type: 'tenant',
    title: '新租客入住',
    description: '林小姐入住A棟501室',
    time: '3小時前',
    icon: UserPlus,
    color: 'text-blue-600 bg-blue-100',
  },
  {
    id: 4,
    type: 'payment',
    title: '租金逾期提醒',
    description: '張先生3月租金尚未繳納',
    time: '1天前',
    icon: AlertCircle,
    color: 'text-red-600 bg-red-100',
  },
  {
    id: 5,
    type: 'maintenance',
    title: '報修已完成',
    description: 'C棟201室 - 冷氣維修完成',
    time: '2天前',
    icon: CheckCircle,
    color: 'text-green-600 bg-green-100',
  },
]

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">近期活動</h2>
          <p className="text-gray-600 text-sm">系統最新動態</p>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          查看全部
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`p-2 rounded-lg ${activity.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1 truncate">{activity.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <Clock className="h-4 w-4" />
          <span className="text-sm">即時更新，每5分鐘同步</span>
        </div>
      </div>
    </div>
  )
}