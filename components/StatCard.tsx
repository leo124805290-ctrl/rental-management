import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'teal'
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    change: 'text-blue-700 bg-blue-100',
  },
  green: {
    bg: 'bg-green-50',
    icon: 'text-green-600',
    change: 'text-green-700 bg-green-100',
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'text-purple-600',
    change: 'text-purple-700 bg-purple-100',
  },
  orange: {
    bg: 'bg-orange-50',
    icon: 'text-orange-600',
    change: 'text-orange-700 bg-orange-100',
  },
  red: {
    bg: 'bg-red-50',
    icon: 'text-red-600',
    change: 'text-red-700 bg-red-100',
  },
  teal: {
    bg: 'bg-teal-50',
    icon: 'text-teal-600',
    change: 'text-teal-700 bg-teal-100',
  },
}

export default function StatCard({ title, value, change, icon: Icon, color }: StatCardProps) {
  const colors = colorClasses[color]

  return (
    <div className={cn('rounded-xl p-5', colors.bg)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={cn('p-3 rounded-lg', colors.bg)}>
          <Icon className={cn('h-6 w-6', colors.icon)} />
        </div>
      </div>
      <div className="flex items-center mt-4">
        <span className={cn('px-2 py-1 rounded text-xs font-medium', colors.change)}>
          {change.startsWith('+') ? '↗ ' : change.startsWith('-') ? '↘ ' : ''}
          {change}
        </span>
        <span className="text-gray-500 text-sm ml-2">相較上月</span>
      </div>
    </div>
  )
}