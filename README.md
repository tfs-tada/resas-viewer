# Resas-Viewer

## 動作確認
* 手持ちのresas apiキーをenv.localに追加してください
* 下のコードの{your_api_key}を書き換えて実行すると楽です
```bash
cp .env.local.example .env.local
echo "NEXT_PUBLIC_RESAS_API_KEY={your_api_key}" > .env.local
```

## テスト
* cypressディレクトリ内のdockerコンテナを立てていることを前提に
```bash
npm run e2e:front
npm run e2e:back
```