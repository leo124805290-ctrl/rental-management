# Memory

- 語言偏好: 繁體中文（永久）
- 專案類型識別: 房東管理平台（非 AI 應用），部署時需注意區分
- 部署教訓: AI 應用的部署指南不適用於傳統 Web 應用，需根據專案實際需求調整
- 依賴管理原則: 只保留實際使用的依賴，定期清理未使用的套件
- 環境配置: 清晰的環境變數指引有助於部署成功，避免混淆
- 問題診斷: 當部署出現路由 404 時，檢查依賴、環境變數和專案配置
- 專案維護: 保持專案文檔更新，記錄重要決策和修正

## 2026-02-20 重大部署經驗

### Vercel 部署問題總結
1. **TypeScript 依賴問題**：Vercel 生產構建時可能不安裝 devDependencies
   - 解決方案：建立 `.npmrc` 和更新 `vercel.json`
   - 關鍵配置：`production=false` 和 `npm ci --include=dev`

2. **Next.js middleware/proxy 規範變更**
   - `middleware.ts` → `proxy.ts`
   - `middleware` 函數 → `proxy` 函數
   - 錯誤訊息：`Proxy is missing expected function export name`

3. **目錄結構問題**
   - 避免特殊字元：`app/{properties,tenants,...}` 是錯誤的 shell 擴展語法
   - 保持目錄名稱簡單明確

4. **部署監控原則**
   - 先測試後分享：確認功能可用再提供連結
   - 建立自動化測試腳本
   - 檢查所有關鍵路由的 HTTP 狀態

### 成功部署檢查清單
- ✅ 本地 `npm run build` 成功
- ✅ TypeScript 依賴正確處理
- ✅ middleware/proxy 配置符合規範
- ✅ Vercel 環境變數設定正確
- ✅ 部署後立即驗證關鍵功能

### 未來預防措施
1. 定期檢查 Next.js 規範變更
2. 測試 Vercel 部署流程
3. 保持部署文檔更新
4. 建立部署問題診斷指南

**完整經驗記錄**：參見 `DEPLOYMENT_LESSONS.md`
