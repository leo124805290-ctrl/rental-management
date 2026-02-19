import { Building2, MapPin, DollarSign, Users, Plus } from 'lucide-react'

const properties = [
  {
    id: 1,
    name: '中山區公寓大樓',
    address: '台北市中山區中山北路一段100號',
    type: '公寓',
    units: 12,
    occupied: 10,
    monthlyRent: 180000,
    status: 'active',
  },
  {
    id: 2,
    name: '信義區商業大樓',
    address: '台北市信義區信義路五段7號',
    type: '商業大樓',
    units: 8,
    occupied: 6,
    monthlyRent: 320000,
    status: 'active',
  },
  {
    id: 3,
    name: '大安區住宅社區',
    address: '台北市大安區仁愛路四段300號',
    type: '社區住宅',
    units: 24,
    occupied: 22,
    monthlyRent: 450000,
    status: 'active',
  },
  {
    id: 4,
    name: '松山區辦公大樓',
    address: '台北市松山區南京東路五段188號',
    type: '辦公大樓',
    units: 6,
    occupied: 4,
    monthlyRent: 280000,
    status: 'maintenance',
  },
]

export default function PropertiesPage() {
  return (
    <div className="p-6 space-y-6">
      {/* 頁面標題與操作 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">物業管理</h1>
          <p className="text-gray-600 mt-2">管理您的所有物業資產</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-5 w-5" />
          <span className="font-medium">新增物業</span>
        </button>
      </div>

      {/* 統計卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">總物業數</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">4</p>
            </div>
            <Building2 className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">總房間數</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">50</p>
            </div>
            <Users className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">入住率</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">84%</p>
            </div>
            <div className="text-green-600 font-bold">↗ 5%</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">月租金總額</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">NT$ 1,230,000</p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* 物業列表 */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">物業列表</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">物業名稱</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">地址</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">類型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">房間數</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">月租金</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">狀態</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {properties.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Building2 className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{property.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">{property.address}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {property.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {property.occupied}/{property.units}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    NT$ {property.monthlyRent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      property.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {property.status === 'active' ? '營運中' : '維修中'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">編輯</button>
                    <button className="text-gray-600 hover:text-gray-900">查看</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}