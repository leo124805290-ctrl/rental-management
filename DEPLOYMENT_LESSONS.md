# 房東管理平台部署經驗總結

## 專案概述
- **專案類型**：房東管理平台（傳統 Web 應用，非 AI 應用）
- **技術棧**：Next.js 16.1.6 + TypeScript + Tailwind CSS
- **部署平台**：Vercel
- **問題時期**：2026-02-20

## 遇到的問題與解決方案

### 問題 1：專案類型混淆
**症狀**：部署指南錯誤，誤以為是 AI 應用
**根本原因**：Copilot 筆記針對 AI 應用，但專案是傳統 Web 應用
**解決方案**：
- 明確識別專案類型
- 移除 AI 相關代碼（DeepSeek 集成）
- 更新專案文檔

### 問題 2：依賴管理混亂
**症狀**：包含未使用的依賴（Prisma、NextAuth）
**根本原因**：專案混入不相關的 AI 應用依賴
**解決方案**：
- 移除未使用的依賴：
  - `@prisma/client`
  - `prisma` (devDependency)
  - `next-auth`
- 簡化 `package.json`
- 添加 `engines` 配置：`node >=20.0.0`

### 問題 3：環境變數配置錯誤
**症狀**：Vercel 部署後路由 404
**根本原因**：環境變數配置不正確
**解決方案**：
- 重寫 `.env` 和 `.env.example`
- 設定正確的環境變數：
  - `NODE_ENV=production`
  - `NEXT_PUBLIC_APP_URL=https://rental-management.vercel.app`
  - `NEXT_PUBLIC_DEV_MODE=true`（開發階段）

### 問題 4：Vercel 部署持續 ERROR
**症狀**：部署顯示 ERROR 狀態，但構建日誌顯示成功
**根本原因**：多個問題疊加

#### 子問題 4.1：錯誤的目錄名稱
**症狀**：`app/{properties,tenants,payments,maintenance,auth}` 目錄
**解決方案**：移除錯誤的 shell 擴展語法目錄

#### 子問題 4.2：Next.js middleware/proxy 規範變更
**症狀**：`middleware.ts` 需要改為 `proxy.ts`
**錯誤訊息**：`Proxy is missing expected function export name`
**解決方案**：
- 將 `middleware.ts` 改名為 `proxy.ts`
- 將 `middleware` 函數改名為 `proxy`

#### 子問題 4.3：TypeScript 依賴問題（最關鍵！）
**症狀**：Vercel 構建失敗，錯誤碼 1
**錯誤日誌**：
```
看起來您正在嘗試使用 TypeScript，但沒有安裝所需的軟體包。
請執行以下命令安裝 TypeScript 和 @types/node：
npm install --save-dev typescript @types/node
```
**根本原因**：Vercel 在生產構建時可能不安裝 devDependencies
**解決方案**：
1. 建立 `.npmrc` 檔案：
   ```
   # 確保生產環境也安裝 devDependencies
   production=false
   ```
2. 更新 `vercel.json`：
   ```json
   {
     "installCommand": "npm ci --include=dev"
   }
   ```
3. 確保 TypeScript 依賴在 `devDependencies` 中

### 問題 5：部署監控與測試
**症狀**：無法確定部署是否成功
**解決方案**：
- 建立部署驗證頁面
- 實現自動化測試腳本
- 先測試再分享連結的原則

## 關鍵學習點

### 1. Vercel 部署最佳實踐
- **TypeScript 處理**：確保 devDependencies 在生產構建時可用
- **環境變數**：必須在 Vercel 控制台正確設定
- **構建配置**：使用正確的 `vercel.json` 配置
- **監控**：部署後立即測試關鍵功能

### 2. Next.js 專案維護
- **目錄結構**：避免特殊字元和 shell 擴展語法
- **middleware/proxy**：遵循最新 Next.js 規範
- **依賴管理**：定期清理未使用的依賴
- **TypeScript**：確保開發和生產環境一致性

### 3. 問題診斷流程
1. **檢查部署日誌**：Vercel 提供詳細構建日誌
2. **本地測試**：確保本地 `npm run build` 成功
3. **環境驗證**：檢查環境變數和配置
4. **逐步排除**：從最可能的問題開始解決

### 4. 開發流程改進
- **先測試後分享**：確認功能可用再提供連結
- **自動化監控**：建立部署狀態檢查腳本
- **文檔記錄**：記錄所有問題和解決方案
- **版本控制**：每次修復都有明確的 commit 訊息

## 成功部署檢查清單

### 部署前檢查
- [ ] 本地 `npm run build` 成功
- [ ] 所有路由在構建輸出中顯示
- [ ] 沒有 TypeScript 錯誤
- [ ] `package.json` 依賴正確

### Vercel 配置檢查
- [ ] `vercel.json` 配置正確
- [ ] `.npmrc` 存在並配置正確
- [ ] 環境變數已設定
- [ ] 專案連結到正確的 GitHub 倉庫

### 部署後驗證
- [ ] 主頁可訪問（HTTP 200）
- [ ] 關鍵功能頁面可訪問
- [ ] 開發模式功能正常
- [ ] 沒有 404 錯誤

## 緊急修復方案

如果部署再次失敗，按順序執行：

1. **檢查 Vercel 部署日誌**：找出具體錯誤
2. **驗證本地構建**：`rm -rf .next && npm run build`
3. **檢查 TypeScript 依賴**：確保 `typescript` 和 `@types/node` 可用
4. **檢查 middleware/proxy 配置**：符合 Next.js 規範
5. **強制重新部署**：在 Vercel 控制台點擊 "Redeploy"

## 預防措施

1. **定期更新依賴**：保持 Next.js 和相關套件最新
2. **測試部署流程**：在開發環境模擬部署
3. **監控生產環境**：設定健康檢查
4. **備份配置**：保存成功的部署配置

## 總結

這次部署問題的核心是 **TypeScript 依賴在 Vercel 生產構建環境中的處理問題**。關鍵教訓：

1. **Vercel 對 devDependencies 的處理可能與預期不同**
2. **Next.js 規範變更需要及時跟進**
3. **自動化測試和監控至關重要**
4. **詳細的錯誤日誌是解決問題的關鍵**

將此文件作為未來部署的參考，避免重複相同的問題。

---
**最後更新**：2026-02-20  
**部署狀態**：部分成功（主頁和登入頁可用，部分功能待修復）  
**部署連結**：https://rental-management.vercel.app  
**Vercel 控制台**：https://vercel.com/leo124805290s-projects/rental-management/deployments