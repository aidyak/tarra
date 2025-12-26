# Hono導入まとめ（2025-12-27）

- 目的: フロント（Vite + React）に軽量なAPI層（Hono）を併設し、開発時はViteのプロキシ経由で`/api`にアクセスできるようにする。

## 変更概要
- 追加: `api/server.ts`（Hono + `@hono/node-server`、ポート`8787`）
- 更新: `vite.config.ts`（`/api`→`http://localhost:8787` にプロキシ）
- 更新: `tsconfig.node.json`（`api/**/*.ts`を型チェック対象へ）
- 更新: `package.json`（`concurrently`と`tsx`で同時起動、依存追加）
- 更新: `README.md`（導入と使い方を追記）

## 追加・更新依存
- 依存: `hono`, `@hono/node-server`
- 開発依存: `tsx`, `concurrently`

## 開発起動
```bash
# フロント+API同時起動
pnpm dev

- 個別起動
pnpm dev:web   # Viteのみ
pnpm dev:api   # Honoのみ（http://localhost:8787）
```

## プロキシ動作
- フロントから`/api/*`にアクセスすると、Viteが`http://localhost:8787`へ転送。
- CORSは`/api/*`に対して有効化済み。

## 動作確認例
```bash
# 直接API
curl http://localhost:8787/api/health

# フロント経由（Viteプロキシ）
curl http://localhost:5173/api/health
# 5173が使用中の場合は、Viteが別ポートへ切り替え（例: 5174）
```

## エンドポイント（初期）
- `GET /api/health` → `{ ok: true }`
- `GET /api/hello` → "Hello from Hono"

## デプロイ戦略の候補
- Nodeランタイム: `server.ts`を常駐（Render/Fly.io/自前VM）
- Edge/Workers: Cloudflare Workers等でHonoを運用、静的は別CDN
- Vercel/Netlify: HonoアダプタでFunctionsとして提供

## 次のステップ案
- ルート整理（`/api/v1`化、モジュール分割）
- 認証（Cookie/JWT）
- エラーハンドリング/バリデーション（zod等）
- 本番構成（同一プロセス or 分離・リバプロ）
