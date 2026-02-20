# 房東管理平台

這是一個完整的房東管理平台，包含以下功能：

## 功能模組
- 🏠 物業管理
- 🛏️ 房間管理  
- 👥 租客管理
- 💰 繳費管理
- 🔧 報修管理
- 📊 數據分析儀表板

## 技術架構
- **前端框架**: Next.js 15.5.12 (App Router)
- **樣式**: Tailwind CSS
- **UI 元件**: Radix UI
- **圖表**: Recharts
- **表單**: React Hook Form + Zod 驗證
- **狀態管理**: React 狀態 + 本地儲存

## 部署狀態

### 當前問題
專案部署到 Vercel 後遇到「新路由返回 404」的問題。

### 問題原因
1. 缺少必要的環境變數配置
2. 專案包含未使用的依賴（Prisma, NextAuth）
3. 部署配置需要調整

### 已執行的修正
1. ✅ 移除了未使用的依賴（Prisma, NextAuth）
2. ✅ 更新了 package.json 配置
3. ✅ 建立了部署修復指南（DEPLOYMENT_FIX.md）
4. ✅ 更新了環境變數配置
5. ✅ 簡化了專案結構

## 部署步驟

### 1. Vercel 環境變數設定
登入 Vercel 控制台，設定以下環境變數：
```
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://rental-management-virid.vercel.app
```

### 2. 重新部署
1. 推送更新到 GitHub
2. 或在 Vercel 控制台點擊「重新部署」

### 3. 測試路由
部署完成後測試：
- `/` → 重定向到 `/dashboard`
- `/dashboard` → 儀表板
- `/properties` → 物業管理
- `/tenants` → 租客管理
- `/payments` → 繳費管理
- `/maintenance` → 報修管理

## 本地開發
```bash
# 安裝依賴
npm install

# 開發模式
npm run dev

# 構建
npm run build

# 生產模式
npm start
```

## 專案結構
```
app/
├── dashboard/      # 儀表板
├── properties/     # 物業管理
├── tenants/       # 租客管理
├── payments/      # 繳費管理
├── maintenance/   # 報修管理
└── test/         # 測試頁面

components/        # 共用元件
lib/              # 工具函數
```

## 注意事項
1. 這是一個**靜態前端應用**，目前使用模擬資料
2. 如果需要資料庫功能，後續可以添加 Prisma 和 PostgreSQL
3. 專案已優化為 Vercel 部署，移除了所有不相關的 AI 代碼

## 聯絡資訊
如有部署問題，請參考 `DEPLOYMENT_FIX.md` 檔案。