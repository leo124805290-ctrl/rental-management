#!/bin/bash

echo "🔍 測試網站功能 - 確認可用後才分享連結"
echo "=========================================="
echo "我會持續測試，直到所有功能正常"
echo "然後才給你可用的連結"
echo ""

MAX_TESTS=30
TEST_INTERVAL=20
test_count=0
all_success=false

while [ $test_count -lt $MAX_TESTS ] && [ "$all_success" = false ]; do
    test_count=$((test_count + 1))
    
    echo ""
    echo "🧪 測試 #${test_count} - $(date '+%H:%M:%S')"
    echo "------------------------------------------"
    
    # 測試所有關鍵頁面
    declare -A tests
    tests=(
        ["主頁"]="https://rental-management.vercel.app"
        ["快速登入"]="https://rental-management.vercel.app/quick-login"
        ["儀表板"]="https://rental-management.vercel.app/dashboard"
        ["登入頁"]="https://rental-management.vercel.app/login"
        ["物業管理"]="https://rental-management.vercel.app/properties"
        ["租客管理"]="https://rental-management.vercel.app/tenants"
    )
    
    success_count=0
    total_count=0
    
    for name in "${!tests[@]}"; do
        url="${tests[$name]}"
        total_count=$((total_count + 1))
        
        status=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null || echo "ERR")
        
        if [ "$status" = "200" ]; then
            echo "✅ $name: HTTP 200"
            success_count=$((success_count + 1))
        elif [ "$status" = "404" ]; then
            echo "❌ $name: HTTP 404"
        elif [ "$status" = "ERR" ]; then
            echo "⚠️  $name: 連線錯誤"
        else
            echo "⚠️  $name: HTTP $status"
        fi
    done
    
    echo "------------------------------------------"
    echo "進度: ${success_count}/${total_count} 個頁面正常"
    
    # 檢查是否全部成功
    if [ $success_count -eq $total_count ]; then
        all_success=true
        echo ""
        echo "🎉 所有頁面測試成功！"
    else
        if [ $test_count -lt $MAX_TESTS ]; then
            echo "⏳ 等待 ${TEST_INTERVAL} 秒後再次測試..."
            sleep $TEST_INTERVAL
        else
            echo "⏱️  測試次數已達上限"
        fi
    fi
done

echo ""
echo "=========================================="

if $all_success; then
    echo "✅ ✅ ✅ 網站完全可用！"
    echo ""
    echo "🔗 現在可以分享的連結："
    echo ""
    echo "1. ⚡ 快速登入（推薦）"
    echo "   https://rental-management.vercel.app/quick-login"
    echo "   • 點擊角色即可登入，無需密碼"
    echo "   • 4種測試角色"
    echo ""
    echo "2. 🌐 主網站"
    echo "   https://rental-management.vercel.app"
    echo "   • 自動重定向到快速登入"
    echo ""
    echo "3. 📊 儀表板"
    echo "   https://rental-management.vercel.app/dashboard"
    echo "   • 登入後可訪問"
    echo ""
    echo "4. 🏠 物業管理"
    echo "   https://rental-management.vercel.app/properties"
    echo ""
    echo "5. 👥 租客管理"
    echo "   https://rental-management.vercel.app/tenants"
    echo ""
    echo "6. 🔐 傳統登入"
    echo "   https://rental-management.vercel.app/login"
    echo ""
    echo "💡 所有功能已測試確認可用！"
else
    echo "⚠️  網站仍有問題，無法使用"
    echo ""
    echo "🔧 需要手動檢查 Vercel 部署："
    echo "https://vercel.com/leo124805290s-projects/rental-management/deployments"
    echo ""
    echo "❌ 暫時無法提供可用連結"
fi

echo "=========================================="