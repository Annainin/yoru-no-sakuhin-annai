夜の作品案内所 4.4
テーマ：DMM Webサービス公式API連携の実装準備

今回追加したもの
- api-search.html / api-search.js：公式API検索画面
- worker.js：Cloudflare Worker用のAPIプロキシ
- api-config.js：Worker URLのみを設定する公開設定ファイル
- api-integration-guide.html：初期設定手順
- style.css：検索画面・ガイド画面の追加スタイル
- index.html / sitemap.html：公式データ検索への導線

重要：このZIPをアップロードしただけでは、実際のAPI検索はまだ動きません。
DMM API利用登録と認証情報、Cloudflare Workerのデプロイが必要です。
API ID・アフィリエイトIDをHTML/JS/GitHubへ絶対に書かないでください。
チャットにも認証情報を貼らないでください。

設定手順
1. DMM Webサービス利用登録とAPI ID発行を確認。
2. Cloudflare Workerを作成し、worker.jsを貼り付けてデプロイ。
3. WorkerのSecretに DMM_API_ID / DMM_AFFILIATE_ID を登録。
4. Workerの通常変数 ALLOWED_ORIGIN に https://annainin.github.io を登録。
5. api-config.js の YORU_API_BASE_URL にWorker URLを設定。
6. GitHub Pagesへ全ファイルをアップロードし、api-search.htmlで確認。

対象API
DMM Affiliate Web Service v3 ItemList
site=FANZA / service=digital / floor=videoa
検索語句を使った商品情報検索（最大20件）

セキュリティ・規約
- Worker URLは公開されてもよいが、API ID/アフィリエイトIDは必ずWorker Secretで管理。
- API利用条件、表示クレジット、画像・データの利用範囲はDMM公式の最新規約・ガイドを必ず確認。
- API接続やサイト更新がDMMアフィリエイト審査通過を保証するものではありません。
- API連携前の表示サンプルは実在データではありません。

参考
https://support.fanza.jp/affiliate/article/44538
https://support.dmm.com/affiliate/article/47546
https://affiliate.dmm.com/api/
https://developers.cloudflare.com/workers/

このバージョンはAPI連携の土台です。API認証情報を含めずに配布しています。
