'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Building2, User, Key, Zap, Shield } from 'lucide-react'

export default function QuickLoginPage() {
  const router = useRouter()
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  
  const handleQuickLogin = (role: string) => {
    setIsLoggingIn(true)
    
    // 模擬登入過程
    console.log(`快速登入為: ${role}`)
    
    // 儲存登入狀態到 localStorage（開發用）
    localStorage.setItem('dev_auth', 'true')
    localStorage.setItem('dev_user_role', role)
    localStorage.setItem('dev_user_name', `開發者_${role}`)
    
    // 延遲後跳轉到儀表板
    setTimeout(() => {
      router.push('/dashboard')
    }, 500)
  }
  
  const testUsers = [
    {
      id: 'admin',
      name: '系統管理員',
      role: 'admin',
      description: '完整權限，可管理所有功能',
      color: 'bg-purple-100 text-purple-800',
      icon: Shield,
    },
    {
      id: 'landlord',
      name: '房東',
      role: 'landlord',
      description: '管理自己的物業和租客',
      color: 'bg-blue-100 text-blue-800',
      icon: Building2,
    },
    {
      id: 'manager',
      name: '物業經理',
      role: 'manager',
      description: '協助管理多個物業',
      color: 'bg-green-100 text-green-800',
      icon: User,
    },
    {
      id: 'viewer',
      name: '檢視者',
      role: 'viewer',
      description: '僅檢視權限，無法修改',
      color: 'bg-gray-100 text-gray-800',
      icon: Key,
    },
  ]
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* 標題 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            房東管理平台 - 快速登入
          </h1>
          <p className="text-gray-600 text-lg">
            開發階段專用 • 點擊角色即可登入 • 無需密碼驗證
          </p>
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
            <Shield className="h-4 w-4 mr-2" />
            開發模式：密碼驗證已停用
          </div>
        </div>
        
        {/* 角色選擇 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {testUsers.map((user) => {
            const Icon = user.icon
            return (
              <button
                key={user.id}
                onClick={() => handleQuickLogin(user.role)}
                disabled={isLoggingIn}
                className={`${user.color} rounded-2xl p-6 text-left transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-opacity-50 focus:ring-current disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="flex items-start mb-4">
                  <div className={`p-3 rounded-full ${user.color.replace('text-', 'bg-').replace('800', '200')}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{user.name}</h3>
                <p className="text-sm opacity-90 mb-4">{user.description}</p>
                <div className="text-sm font-medium">
                  點擊登入 →
                </div>
              </button>
            )
          })}
        </div>
        
        {/* 快速操作 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">快速操作</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
            >
              直接前往儀表板
            </button>
            <button
              onClick={() => {
                localStorage.clear()
                alert('已清除開發登入狀態')
              }}
              className="bg-red-100 hover:bg-red-200 text-red-800 font-medium py-3 px-4 rounded-lg transition-colors"
            >
              清除登入狀態
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-3 px-4 rounded-lg transition-colors"
            >
              重新整理頁面
            </button>
          </div>
        </div>
        
        {/* 開發資訊 */}
        <div className="bg-gray-900 text-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">開發資訊</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-blue-300">當前狀態</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  網站已部署：https://rental-management.vercel.app
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  儀表板路由：需要修復（目前 404）
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  開發模式：啟用快速登入
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-blue-300">注意事項</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• 此為開發階段專用功能</li>
                <li>• 正式環境應啟用完整身份驗證</li>
                <li>• 所有資料僅供測試使用</li>
                <li>• 登入狀態儲存在瀏覽器 localStorage</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* 登入狀態 */}
        {isLoggingIn && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">登入中...</h3>
                <p className="text-gray-600 text-center">
                  正在為您設定開發環境
                  <br />
                  即將跳轉到儀表板
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* 頁尾 */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>房東管理平台 • 開發版本 • {new Date().toLocaleDateString()}</p>
        <p className="mt-2">
          遇到問題？請檢查：
          <a href="https://vercel.com/leo124805290s-projects/rental-management/deployments" 
             target="_blank" 
             rel="noopener noreferrer"
             className="text-blue-600 hover:underline ml-2">
            Vercel 部署狀態
          </a>
        </p>
      </footer>
    </div>
  )
}