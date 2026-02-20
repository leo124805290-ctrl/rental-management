#!/bin/bash

echo "🚀 部署已觸發！等待完成..."
echo "=========================================="
echo "GitHub 推送完成時間: $(date)"
echo "Vercel 自動部署已觸發"
echo ""
echo "📊 即時監控連結："
echo "https://vercel.com/leo124805290s-projects/rental-management/deployments"
echo ""
echo "⏳ 預計完成時間：2-5分鐘"
echo "我會每30秒檢查一次狀態"
echo "=========================================="

# 等待初始構建時間
echo "等待初始構建（90秒）..."
sleep 90

# 開始循環檢查
CHECK_COUNT=0
MAX_CHECKS=20
SUCCESS=false

while [ $CHECK_COUNT -lt $MAX_CHECKS ] && [ "$SUCCESS" = false ]; do
    CHECK_COUNT=$((CHECK_COUNT + 1))
    
    echo ""
    echo "🔍 檢查 #${CHECK_COUNT} - $(date '+%H:%M:%S')"
    echo "------------------------------------------"
    
    # 檢查所有關鍵頁面
    URLS=(
        "https://rental-management.vercel.app"
        "https://rental-management.vercel.app/quick-login"
        "https://rental-management.vercel.app/dashboard"
        "https://rental-management.vercel.app/login"
    )
    
    ALL_OK=true
    
    for url in "${URLS[@]}"; do
        # 提取路徑名稱
        path=$(echo "$url" | sed 's|https://rental-management.vercel.app||')
        [ -z "$path" ] && path="/"
        
        # 檢查狀態
        status=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null || echo "ERR")
        
        case $status in
            200)
                echo "✅ $path: HTTP 200"
                ;;
            404)
                echo "❌ $path: HTTP 404"
                ALL_OK=false
                ;;
            ERR)
                echo "⚠️  $path: 連線錯誤"
                ALL_OK=false
                ;;
            *)
                echo "⚠️  $path: HTTP $status"
                if [ "$status" != "200" ]; then
                    ALL_OK=false
                fi
                ;;
        esac
    done
    
    echo "------------------------------------------"
    
    # 檢查是否全部成功
    if $ALL_OK; then
        SUCCESS=true
        echo ""
        echo "🎉 🎉 🎉 部署完成！所有頁面正常！"
    else
        if [ $CHECK_COUNT -lt $MAX_CHECKS ]; then
            echo "⏳ 等待30秒後再次檢查..."
            sleep 30
        else
            echo "⏱️  檢查次數已達上限"
        fi
    fi
done

echo ""
echo "=========================================="

if $SUCCESS; then
    echo "✅ 部署成功完成！"
    echo ""
    echo "🔗 立即測試連結："
    echo ""
    echo "1. ⚡ 快速登入（推薦）"
    echo "   https://rental-management.vercel.app/quick-login"
    echo "   • 點擊角色即可登入，無需密碼"
    echo "   • 4種測試角色：管理員、房東、經理、檢視者"
    echo ""
    echo "2. 🌐 主網站"
    echo "   https://rental-management.vercel.app"
    echo "   • 會自動重定向到快速登入"
    echo ""
    echo "3. 📊 儀表板"
    echo "   https://rental-management.vercel.app/dashboard"
    echo "   • 登入後可訪問"
    echo ""
    echo "4. 🔐 傳統登入"
    echo "   https://rental-management.vercel.app/login"
    echo "   • 開發模式下跳過密碼驗證"
    echo ""
    echo "💡 開發模式功能："
    echo "- 無需密碼，點擊即登入"
    echo "- 自動跳過身份驗證"
    echo "- 多角色測試環境"
    echo ""
    echo "🎯 開始測試吧！"
else
    echo "⚠️  部署可能遇到問題"
    echo ""
    echo "🔧 建議操作："
    echo "1. 手動檢查 Vercel 部署狀態："
    echo "   https://vercel.com/leo124805290s-projects/rental-management/deployments"
    echo ""
    echo "2. 查看構建日誌是否有錯誤"
    echo ""
    echo "3. 如果需要，手動點擊「Redeploy」按鈕"
    echo ""
    echo "4. 或等待 Vercel 自動重試"
fi

echo "=========================================="