快速 PoC：DeepSeek 主模型路由 (Next.js)

目標：建立一個最小可運行的 PoC，示範如何將 deepseek-chat 當作預設模型、deepseek-reasoner 作為 on‑demand，用 Redis（可選）做 prompt cache，並計算 token 使用量與估算成本。

目錄結構（已 scaffold）
- package.json
- .env.example
- pages/
  - index.js            （簡易聊天前端）
  - api/chat.js         （API 路由：model router + cache + DeepSeek 呼叫）
- lib/
  - modelRouter.js      （決策邏輯）
  - cache.js            （Redis 或 in-memory cache 抽象）
  - usageLogger.js      （簡單使用量記帳）
- data/
  - usage.json          （PoC 會寫入）

快速開始
1) 複製並安裝依賴：
   npm install

2) 建立環境變數（參考 .env.example）：
   - DEEPSEEK_API_KEY：您的 DeepSeek API key
   - DEEPSEEK_BASE_URL（可選，預設 https://api.deepseek.com）
   - REDIS_URL（可選，若提供則使用 Redis，否則使用 memory cache）

3) 啟動開發伺服器：
   npm run dev
   打開 http://localhost:3000

注意事項
- 請勿把真實金鑰提交到版本控制。PoC 只用 env 讀取 key。
- 使用 PoC 測試後，建議在 DeepSeek 控制台輪換或撤銷用過的 key。

下一步建議
- 若您同意，我可以在本環境替您跑一次小量測試（需您再次確認允許使用 key）。
- 我也可以把這個 PoC 補上 Dockerfile 與部署指令。
