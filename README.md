# Resas-Viewer

## 概要
* カジュアル面談受験用のコーディングディレクトリです
* resasapiをグラフに起こします

## 仕様技術
* Next.js + TypeScript
* recharts
* cypress
* fastapi(e2eモック)

## 動作確認
* 手持ちのresas apiキーをenv.localに追加してください
* 下のコードの{your_api_key}を書き換えて実行すると楽です
```bash
cp .env.local.example .env.local
echo "NEXT_PUBLIC_RESAS_API_KEY={your_api_key}" > .env.local
```

## テスト
* cypressディレクトリ内のdockerコンテナを組み立てていることを前提に
```bash
npm run e2e:front
npm run e2e:back
```