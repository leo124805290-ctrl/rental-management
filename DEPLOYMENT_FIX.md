# 房東管理平台 Vercel 部署修復指南

## 問題分析
專案部署到 Vercel 後遇到「新路由返回 404」的問題，原因如下：

1. **環境變數缺失**：專案需要基本環境變數才能正常運行
2. **Next.js 配置問題**：可能需要調整 Next.js 配置
3. **構建過程問題**：專案構建可能失敗

## 解決方案

### 1. Vercel 環境變數設定
登入 Vercel 控制台 (https://vercel.com)，為專案設定以下環境變數：

```
# 基本環境變數
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://rental-management-virid.vercel.app

# 資料庫配置（如果使用資料庫）
# DATABASE_URL=postgresql://user:password@host:port/database

# 身份驗證（如果使用 NextAuth）
# NEXTAUTH_SECRET=your-secret-key-here
# NEXTAUTH_URL=https://rental-management-virid.vercel.app
```

### 2. 專案配置檢查
確保專案有以下配置：

#### package.json 修正
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}
```

#### vercel.json 修正
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next",
  "regions": ["hkg1"]
}
```

### 3. 重新部署步驟
1. 在 Vercel 控制台設定環境變數
2. 觸發重新部署：
   - 方法 A：推送更新到 GitHub
   - 方法 B：在 Vercel 控制台點擊「重新部署」
   - 方法 C：使用 Vercel CLI：`vercel --prod`

### 4. 測試部署
部署完成後測試以下路由：
- `/` - 應該重定向到 `/dashboard`
- `/dashboard` - 儀表板頁面
- `/properties` - 物業管理
- `/tenants` - 租客管理
- `/payments` - 繳費管理
- `/maintenance` - 報修管理

### 5. 故障排除

#### 如果仍然遇到 404 錯誤：
1. 檢查構建日誌是否有錯誤
2. 確認所有路由檔案存在於 `app/` 目錄
3. 檢查 `next.config.js` 配置

#### 如果構建失敗：
1. 檢查 Node.js 版本（需要 >= 20）
2. 檢查依賴衝突：`rm -rf node_modules package-lock.json && npm install`
3. 檢查 TypeScript 錯誤：`npm run lint`

## 專案狀態檢查清單
- [ ] Node.js 版本 >= 20 ✓ (目前: v22.22.0)
- [ ] package.json 配置正確 ✓
- [ ] vercel.json 配置正確 ✓
- [ ] 環境變數已設定
- [ ] 所有路由檔案存在 ✓
- [ ] 專案可以本地構建

## 注意事項
1. 這個專案是**房東管理平台**，不是 AI 應用，不需要 OpenClaw/Seeker/DeepSeek 配置
2. 如果不需要資料庫功能，可以移除 Prisma 依賴
3. 專案使用靜態資料，不需要真實資料庫連接

## 緊急修復方案
如果無法立即設定環境變數，可以修改專案為完全靜態：

1. 移除所有資料庫相關代碼
2. 使用靜態資料檔案
3. 重新部署

這樣可以立即解決 404 問題，後續再添加資料庫功能。