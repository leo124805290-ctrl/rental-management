const https = require('https');

console.log('🔍 檢查房東管理平台部署狀態...\n');

const tests = [
  { name: '首頁', url: 'https://rental-management-virid.vercel.app' },
  { name: '測試頁', url: 'https://rental-management-virid.vercel.app/test' },
  { name: '登入頁', url: 'https://rental-management-virid.vercel.app/auth/signin' },
  { name: '儀表板', url: 'https://rental-management-virid.vercel.app/dashboard' },
  { name: '部署助手', url: 'https://rental-management-virid.vercel.app/deploy-helper.html' },
  { name: '快速登入', url: 'https://rental-management-virid.vercel.app/quick-login.html' }
];

async function testUrl(name, url) {
  return new Promise((resolve) => {
    const req = https.request(url, { method: 'HEAD' }, (res) => {
      resolve({ name, url, status: res.statusCode, headers: res.headers });
    });
    
    req.on('error', (error) => {
      resolve({ name, url, status: 'ERROR', error: error.message });
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      resolve({ name, url, status: 'TIMEOUT', error: '請求超時' });
    });
    
    req.end();
  });
}

async function runTests() {
  console.log('📊 開始測試各頁面狀態：\n');
  
  const results = [];
  
  for (const test of tests) {
    process.stdout.write(`測試 ${test.name}... `);
    const result = await testUrl(test.name, test.url);
    results.push(result);
    
    if (result.status === 200) {
      console.log('✅ 正常');
    } else if (result.status === 404) {
      console.log('❌ 404 找不到頁面');
    } else if (result.status === 'ERROR') {
      console.log('❌ 連線錯誤');
    } else if (result.status === 'TIMEOUT') {
      console.log('⏱️  請求超時');
    } else {
      console.log(`⚠️  HTTP ${result.status}`);
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📋 測試結果分析：\n');
  
  // 分析結果
  const successCount = results.filter(r => r.status === 200).length;
  const errorCount = results.filter(r => r.status !== 200).length;
  
  console.log(`✅ 正常頁面: ${successCount} 個`);
  console.log(`❌ 異常頁面: ${errorCount} 個\n`);
  
  // 顯示詳細結果
  results.forEach(result => {
    if (result.status !== 200) {
      console.log(`${result.name}:`);
      console.log(`  網址: ${result.url}`);
      console.log(`  狀態: ${result.status}`);
      if (result.error) console.log(`  錯誤: ${result.error}`);
      if (result.headers && result.headers['x-vercel-cache']) {
        console.log(`  緩存: ${result.headers['x-vercel-cache']}`);
      }
      console.log('');
    }
  });
  
  // 診斷建議
  console.log('='.repeat(50));
  console.log('💡 問題診斷與建議：\n');
  
  if (successCount === 0) {
    console.log('❌ 所有頁面都無法訪問');
    console.log('   可能原因：');
    console.log('   1. 部署完全失敗');
    console.log('   2. 環境變數未正確設定');
    console.log('   3. 專案建置錯誤');
  } else if (successCount === 1 && results[0].name === '首頁') {
    console.log('⚠️ 只有首頁可訪問，其他頁面 404');
    console.log('   可能原因：');
    console.log('   1. 路由設定錯誤');
    console.log('   2. Next.js 建置問題');
    console.log('   3. 靜態檔案未正確部署');
  } else {
    console.log('✅ 部分頁面正常，需要進一步檢查');
  }
  
  console.log('\n🔧 建議解決方案：');
  console.log('   1. 檢查 Vercel 部署日誌');
  console.log('   2. 確認環境變數已設定');
  console.log('   3. 清除 Vercel 緩存並重新部署');
  console.log('   4. 檢查 Next.js 建置設定');
  
  console.log('\n' + '='.repeat(50));
  console.log('🚀 立即操作：');
  console.log('   1. 查看部署日誌：https://vercel.com/leo124805290s-projects/rental-management/deployments');
  console.log('   2. 檢查環境變數：https://vercel.com/leo124805290s-projects/rental-management/settings/environment-variables');
  console.log('   3. 重新部署：在部署頁面點擊「Redeploy」');
}

runTests().catch(console.error);