# AGENTS

このリポジトリの役割分担（"エージェント"）を明確化し、所有範囲・運用手順・コマンドを整理します。ディレクトリ構造に基づき、軽量な二層（フロント/API）での開発を前提とします。

## 目的
- **整流化**: フロントとAPIの責務境界を明確にし、変更影響範囲を把握しやすくする。
- **運用効率**: 起動/ビルド/検証の共通手順を簡潔に共有する。

## エージェント一覧
- **Frontend Agent**: React UI/UXの開発・テスト
- **API Agent**: HonoによるAPI実装・ルーティング・ミドルウェア
- **Tooling Agent**: ビルド/型/リンター/開発サーバ設定の維持
- **Docs Agent**: ドキュメント体系の整備・更新

## 所有範囲（Ownership Map）
- **Frontend Agent**:
  - `src/`（Reactアプリ）: [src/App.tsx](../src/App.tsx), [src/main.tsx](../src/main.tsx), [src/index.css](../src/index.css), [src/App.css](../src/App.css)
  - 静的: [public/](../public), [index.html](../index.html)
  - アセット: [src/assets/](../src/assets)
- **API Agent**:
  - サーバ: [api/server.ts](../api/server.ts)
  - 型設定(Node): [tsconfig.node.json](../tsconfig.node.json)
- **Tooling Agent**:
  - ビルド/Dev設定: [vite.config.ts](../vite.config.ts)
  - 型/リンター: [tsconfig.json](../tsconfig.json), [tsconfig.app.json](../tsconfig.app.json), [eslint.config.js](../eslint.config.js)
  - パッケージ管理: [package.json](../package.json), [pnpm-lock.yaml](../pnpm-lock.yaml)
- **Docs Agent**:
  - リポジトリドキュメント: [README.md](../README.md), [docs/hono-setup.md](./hono-setup.md), [docs/api-endpoints.md](./api-endpoints.md)

## 共通ランブック（Runbooks）
- **開発同時起動**:
```bash
pnpm dev
```
  - フロント: Vite（ポートは既定5173、占有時は5174等へ自動変更）
  - API: Hono（`http://localhost:8787`）
- **個別起動**:
```bash
pnpm dev:web   # フロントのみ
pnpm dev:api   # APIのみ
```
- **Lint**:
```bash
pnpm lint
```
- **ビルド**:
```bash
pnpm build
```
- **プレビュー（静的ビルドの確認）**:
```bash
pnpm preview
```

## インタラクション規約（API利用）
- 開発時はフロントから`/api/*`へアクセス（Viteが`http://localhost:8787`へプロキシ）。
- 例: `fetch('/api/health')` → `{"ok":true}`
- 仕様詳細: [docs/api-endpoints.md](./api-endpoints.md)

## エージェント責務詳細
- **Frontend Agent**:
  - UI実装、状態管理、API呼び出し（`/api`経由）、アクセシビリティ・パフォーマンス改善。
  - 変更対象: `src/*`, `index.html`, `public/*`
- **API Agent**:
  - ルート追加/修正、ミドルウェア（CORS/Logger等）、バリデーション/エラーハンドリング。
  - 変更対象: `api/server.ts`, `tsconfig.node.json`
- **Tooling Agent**:
  - プロキシ設定、型/ESLintルール、ビルド最適化、ロックファイル健全性。
  - 変更対象: `vite.config.ts`, `tsconfig*`, `eslint.config.js`, `package.json`
- **Docs Agent**:
  - 開発/運用手順、設計方針、エンドポイント仕様、変更履歴。
  - 変更対象: `README.md`, `docs/*`

## 運用チェックリスト
- **起動確認**:
```bash
curl http://localhost:8787/api/health     # 直接
curl http://localhost:5173/api/health     # Vite経由（ポートは変動あり）
```
- **プロキシ健全性**: `/api/*`がHonoへ到達する（CORS/Loggerが作動）。
- **型/Lint**: `pnpm lint`が通る、TypeScriptエラーがない。

## 将来拡張
- APIの`/api/v1`化とルート分割、認証（Cookie/JWT）、zod等でのスキーマ検証。
- Edge/Workers対応（Cloudflare等）やFunctions（Vercel/Netlify）への移行。

## 必ずやること
- 大きめの差分が発生するときはdocs配下にやったことを記録すること
