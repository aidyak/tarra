## Honoの導入と開発フロー

- 目的: フロント（Vite + React）に軽量なAPI層（Hono）を併設し、開発時はViteのプロキシ経由で`/api`にアクセスできるようにします。

### セットアップ済みの構成
- APIサーバ: `api/server.ts`（Hono + `@hono/node-server`、ポート`8787`）
- ルート例: `/api/health`, `/api/hello`
- 開発同時起動: `pnpm dev`（ViteとAPIを`concurrently`で並行起動）
- Devプロキシ: Viteが`/api`を`http://localhost:8787`へ転送

### よく使うコマンド
```bash
# 依存インストール（必要時）
pnpm add hono @hono/node-server
pnpm add -D tsx concurrently

# 開発同時起動（フロントとAPI）
pnpm dev

# 個別起動
pnpm dev:web   # Viteのみ
pnpm dev:api   # Honoのみ（http://localhost:8787）
```

### フロント側からの呼び出し例
```ts
// 例: Reactコンポーネント内でヘルスチェックを取得
const res = await fetch('/api/health')
const data = await res.json() // { ok: true }
```

### デプロイ戦略の例
- Nodeランタイム: `server.ts`をNodeサーバとして運用（Render/Fly.io/自前VMなど）
- Edge/Workers: Cloudflare Workers等でHonoを動かし、静的ファイルは別CDNに配置
- Vercel/Netlify: Honoのアダプタを利用してAPIをFunctionsとして提供

いずれの戦略でも、開発時は`/api`プロキシによりフロントから透過的にAPIへアクセスできます。

# Tarra

ステッカーを管理したり楽しんだりするサイト
tarraはフィンランド語でステッカーの意味です

