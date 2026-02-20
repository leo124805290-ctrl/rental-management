#!/bin/bash

echo "🚀 房東管理平台一鍵部署腳本"
echo "=============================="

# 檢查是否已安裝 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 安裝 Vercel CLI..."
    npm install -g vercel
fi

# 檢查是否已登入
if [ ! -f "$HOME/.local/share/com.vercel.cli/auth.json" ]; then
    echo "🔑 請先登入 Vercel："
    vercel login
fi

echo "🔧 準備部署專案..."

# 建立部署配置
cat > vercel-deploy.json << EOF
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next",
  "projectSettings": {
    "framework": "nextjs",
    "devCommand": "npm run dev",
    "installCommand": "npm install",
    "buildCommand": "npm run build",
    "outputDirectory": ".next",
    "rootDirectory": null
  }
}
EOF

echo "📤 開始部署到 Vercel..."
echo "💡 提示：當詢問環境變數時，請設定："
echo "   NEXT_PUBLIC_APP_URL=https://rental-management-YOUR_PROJECT.vercel.app"
echo ""

# 執行部署
vercel --prod --yes --confirm

echo ""
echo "✅ 部署完成！"
echo "🌐 您的網站網址將會顯示在上面"
echo ""
echo "📋 部署後測試："
echo "   1. 訪問首頁：https://您的專案名稱.vercel.app"
echo "   2. 測試儀表板：/dashboard"
echo "   3. 測試所有管理頁面"
echo ""
echo "🔧 如果需要修改環境變數："
echo "   vercel env add NEXT_PUBLIC_APP_URL https://您的專案名稱.vercel.app"