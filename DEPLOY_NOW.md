# 一鍵部署指南

## 方法 1：使用 Vercel CLI（最簡單）

### 步驟 1：安裝 Vercel CLI
```bash
npm install -g vercel
```

### 步驟 2：登入 Vercel
```bash
vercel login
```
按照提示完成登入

### 步驟 3：部署專案
```bash
cd /path/to/rental-management
vercel --prod
```

### 步驟 4：設定環境變數（CLI 會提示）
部署時會詢問：
```
? Set up and deploy "~/rental-management"? [Y/n] y
? Which scope do you want to deploy to? [您的帳號]
? Link to existing project? [y/N] n
? What's your project's name? rental-management
? In which directory is your code located? ./
? Want to override the settings? [y/N] n
```

**當詢問環境變數時**：
```
? Want to define environment variables? [y/N] y
? Enter environment variable name: NEXT_PUBLIC_APP_URL
? Enter environment variable value: https://rental-management-[隨機].vercel.app
? Apply to all environments? [Y/n] y
```

## 方法 2：GitHub 自動部署

### 步驟 1：推送修正到 GitHub
```bash
git add .
git commit -m "fix: complete deployment fixes"
git push origin main
```

### 步驟 2：在 Vercel 網頁設定
1. 前往 https://vercel.com/new
2. 選擇「Import Git Repository」
3. 選擇您的 `rental-management` 專案
4. 在設定頁面添加環境變數：
   - `NEXT_PUBLIC_APP_URL`: `https://rental-management-[專案名稱].vercel.app`

## 方法 3：直接下載部署包

我也可以生成一個完整的部署包，包含所有修正：

```bash
# 下載修正後的專案
curl -L [下載連結] -o rental-management-fixed.zip
unzip rental-management-fixed.zip
cd rental-management-fixed
vercel --prod
```

## 部署後的測試網址

部署完成後，您將獲得：
```
✅ 部署完成！
網址：https://rental-management-[專案名稱].vercel.app

測試路由：
- 首頁：https://rental-management-[專案名稱].vercel.app
- 儀表板：https://rental-management-[專案名稱].vercel.app/dashboard
- 物業管理：https://rental-management-[專案名稱].vercel.app/properties
- 租客管理：https://rental-management-[專案名稱].vercel.app/tenants
- 繳費管理：https://rental-management-[專案名稱].vercel.app/payments
- 報修管理：https://rental-management-[專案名稱].vercel.app/maintenance
```

## 當前專案狀態

✅ **已完成的修正**：
1. Next.js 從 15.5.12 更新到 16.1.6
2. 修正 next.config.js 無效配置
3. 清理環境變數設定
4. 確保所有依賴正確安裝
5. 驗證所有路由正常工作

✅ **本地測試通過**：
- 開發伺服器正常啟動
- 所有路由返回 200 OK
- Tailwind CSS 正常運作
- TypeScript 編譯正常

## 立即行動

**選擇一個方法，我幫您生成對應的指令或檔案！**