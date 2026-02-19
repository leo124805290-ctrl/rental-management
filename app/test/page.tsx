export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">系統測試頁面</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 功能測試卡片 */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">✅ 基本功能測試</h2>
          <ul className="space-y-3">
            <li className="flex items-center">
              <div className="h-2 w-2 bg-green-500 rounded-full mr-3"></div>
              <span>Next.js 15 App Router</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 bg-green-500 rounded-full mr-3"></div>
              <span>Tailwind CSS 樣式系統</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 bg-green-500 rounded-full mr-3"></div>
              <span>響應式設計佈局</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 bg-green-500 rounded-full mr-3"></div>
              <span>導航系統</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 頁面功能</h2>
          <ul className="space-y-3">
            <li className="flex items-center">
              <div className="h-2 w-2 bg-green-500 rounded-full mr-3"></div>
              <span>儀表板 (完整功能)</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 bg-green-500 rounded-full mr-3"></div>
              <span>物業管理 (完整列表)</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 bg-yellow-500 rounded-full mr-3"></div>
              <span>租客管理 (基礎框架)</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 bg-yellow-500 rounded-full mr-3"></div>
              <span>繳費管理 (基礎框架)</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 bg-yellow-500 rounded-full mr-3"></div>
              <span>報修管理 (基礎框架)</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🎨 設計系統</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">顏色系統</p>
              <div className="flex space-x-2">
                <div className="h-8 w-8 bg-blue-600 rounded"></div>
                <div className="h-8 w-8 bg-green-600 rounded"></div>
                <div className="h-8 w-8 bg-purple-600 rounded"></div>
                <div className="h-8 w-8 bg-orange-600 rounded"></div>
                <div className="h-8 w-8 bg-red-600 rounded"></div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">按鈕樣式</p>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">主要按鈕</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg">次要按鈕</button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🚀 部署狀態</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">當前網址</p>
              <p className="font-mono text-sm bg-gray-100 p-2 rounded mt-1">
                https://rental-management-virid.vercel.app
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">所需環境變數</p>
              <ul className="text-sm text-gray-700 mt-1 space-y-1">
                <li>✅ DATABASE_URL (已設定)</li>
                <li>❌ NEXTAUTH_SECRET (待設定)</li>
                <li>❌ NEXTAUTH_URL (待設定)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">下一步行動</h3>
        <ol className="list-decimal list-inside space-y-2 text-blue-800">
          <li>完成 npm install 依賴安裝</li>
          <li>設定 Vercel 環境變數 (NEXTAUTH_SECRET, NEXTAUTH_URL)</li>
          <li>推送到 GitHub 並觸發 Vercel 重新部署</li>
          <li>測試所有功能頁面</li>
        </ol>
      </div>
    </div>
  )
}