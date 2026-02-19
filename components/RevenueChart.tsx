'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { month: '3月', revenue: 220000 },
  { month: '4月', revenue: 185000 },
  { month: '5月', revenue: 210000 },
  { month: '6月', revenue: 195000 },
  { month: '7月', revenue: 230000 },
  { month: '8月', revenue: 245000 },
  { month: '9月', revenue: 220000 },
  { month: '10月', revenue: 255000 },
  { month: '11月', revenue: 240000 },
  { month: '12月', revenue: 265000 },
  { month: '1月', revenue: 250000 },
  { month: '2月', revenue: 256800 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-sm text-blue-600 font-bold">
          NT$ {payload[0].value.toLocaleString()}
        </p>
      </div>
    )
  }
  return null
}

export default function RevenueChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            stroke="#666" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#666" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `NT$${value / 1000}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#1d4ed8' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}