# APIエンドポイント仕様（初期）

## ベースURL
- 開発直アクセス: `http://localhost:8787`
- フロント経由（Viteプロキシ）: `http://localhost:5173`（※ポートは状況により変動、例: 5174）
- フロントからの呼び出しは`/api/*`で透過的にプロキシされます。

## エンドポイント一覧

### GET /api/health
- 目的: ヘルスチェック
- レスポンス例:
```json
{ "ok": true }
```
- 例:
```bash
curl http://localhost:8787/api/health
curl http://localhost:5173/api/health
```

### GET /api/hello
- 目的: 簡易レスポンス
- レスポンス: プレーンテキスト
```text
Hello from Hono
```
- 例:
```bash
curl http://localhost:8787/api/hello
curl http://localhost:5173/api/hello
```

## フロントからの呼び出し例（TypeScript）
```ts
// 例: Reactコンポーネント内
const res = await fetch('/api/health')
const data = await res.json() // { ok: true }
```

## ミドルウェア
- Logger: 全ルートにロギング
- CORS: `/api/*`に対して有効化
