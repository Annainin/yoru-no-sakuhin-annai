夜の作品案内所 Ver.6.3.12
更新日：2026-11-23

■ サイト概要
「夜の作品案内所」は、作品名・出演者・メーカー・品番などを手掛かりに、公開情報と確認元をたどれるよう整理した独立運営の作品情報サイトです。
GitHub Pages 公開先： https://annainin.github.io/yoru-no-sakuhin-annai/
GitHub リポジトリ： https://github.com/Annainin/yoru-no-sakuhin-annai

■ 現在の掲載構成
- 作品レコード：32件
- 出演者プロフィール：10名
- オリジナルガイド：12本
- 作品情報の確認区分：メーカー公式個別商品ページで主要項目を確認した記録30件、メーカー公式出演者一覧・発売日一覧を照合した記録2件
- 出演者ごとの掲載数：3～4件（確認区分は出演者ページ・各作品ページに表示）

■ 作品データの扱い
- catalog.json が作品・出演者データの基準ファイルです。
- 作品の表示名に編集部による短縮表記を使う場合は titleKind=editorial_short_title として区別します。正式表記と表示用短縮表記を混同しません。
- 公式個別商品ページ本文の確認ができていない2件（凪ひかる SSIS817 / SSIS784）は、公式出演者一覧・発売日一覧との照合として扱い、個別商品ページ全項目確認済みとは表示しません。
- 不明な収録時間・レーベル等は推測せず、未確認または空欄とします。
- 発売日と配信開始日、DVDと配信商品、通常作品とVR作品を混同しません。

■ 広告・API・画像の状態
- 現在、DMM/FANZAアフィリエイトリンク、購入ボタン、バナー広告は未掲載です。メーカー公式ページへのリンクは出典リンクであり、報酬を受け取る広告リンクではありません。
- DMM/FANZA APIは未接続です。承認・利用条件・発行権限が整う前にAPIや広告リンクを装った導線を追加しません。
- 権利・利用条件を確認できないパッケージ画像、出演者写真、動画、紹介文は掲載していません。
- 口コミ、視聴済みレビュー、人気順位を創作しません。ranking.html は発売日順のピックアップです。

■ 問い合わせ先
mgz2ym5db@yahoo.co.jp
contact.html の表示と mailto リンクを同じ宛先にします。実際の受信・返信テストは運営者側で行ってください。

■ 主なファイル
- index.html：トップページ
- catalog.json：作品・出演者データ
- app.js：検索・一覧・カード表示
- age-gate.js：18歳以上の自己申告確認表示（本人確認・年齢認証ではありません）
- style.css：共通スタイル
- works.html / search.html / genre.html / ranking.html：作品探索ページ
- actors.html / performer-*.html：出演者ページ
- work-*.html：作品詳細ページ
- article-01.html～article-12.html：オリジナルガイド
- about.html / editorial-policy.html / privacy.html / affiliate-policy.html / contact.html：運営・方針ページ
- sitemap.xml / robots.txt：検索エンジン向けファイル

■ GitHub Pagesへの反映
1. 現在のリポジトリをバックアップします。
2. ZIPを解凍し、ZIPそのものではなく中身をリポジトリのルートにアップロードします。
3. 同名ファイルは最新版で置き換えます。README.txt、PRE_PUBLISH_CHECKLIST.md、verification-report.md も最新版を維持します。
4. コミット後、GitHub Pagesの公開サイトで実機表示・導線・メールリンクを確認します。
5. GitHub Pages の設定やリポジトリ自体は削除しません。

■ 公開前の注意
このREADMEは運用者向けの管理資料です。公開・審査の前には PRE_PUBLISH_CHECKLIST.md を確認してください。静的ファイル検査だけでは、実機ブラウザーでの操作、メール受信、外部メーカーサイトの稼働、DMM審査結果までは保証できません。
