# 4.8.0 ビルド検証レポート

- 作成日：2026-11-04
- 出演者：10名
- 作品レコード：22件
- 重複作品タイトル候補：1組
- 作品確認状況：
  - `fanza_catalog_reference_crosschecked`：2件
  - `official_maker_actor_and_sales_lists`：1件
  - `official_maker_actor_list`：1件
  - `official_maker_product_page`：4件
  - `official_talent_listing`：3件
  - `retailer_product_page_crosschecked`：1件
  - `third_party_catalog_crosschecked`：1件
  - `third_party_listing_only`：7件
  - `third_party_multi_source_crosschecked`：1件
  - `verified_official`：1件

## 重要な注意
「作品レコード22件」は「22件すべてがメーカー公式個別ページで確認済み」を意味しません。作品カードと詳細ページに確認レベルを表示し、第三者一覧情報を公式情報と混同しないようにしています。

## work-002
MOODYZ公式個別商品ページで作品名、石川澪、発売日2026-05-05、品番MIMK267、収録時間120分、ジャンルを確認しました。
出典：https://moodyz.com/works/detail/MIMK267?page_from=series&sys_code=11082

## 重複タイトル候補
同一タイトルが別出演者一覧に現れる2レコードを検出しました。現段階では出演者の紐づけを断定せず、作品詳細に追加照合が必要な旨を表示しています。

## 機能確認
- 作品一覧の検索・ジャンル絞り込み
- 出演者一覧・出演者詳細
- 作品詳細・関連作品
- ジャンルページ
- ホームページの作品・出演者表示
- 人気順位を創作しないピックアップページ
- 年齢確認画面
- 編集部ガイド12記事
- JSON構文／ID重複／出演者参照チェック

## 公開前に必須
- 問い合わせ窓口の設定・受信テスト
- 重複候補の出演者・商品情報の追加照合
- 第三者情報のみの作品の追加確認
- GitHub Pages上での実機表示・リンク確認
- アフィリエイトURLと画像は、権利・利用条件・正式発行が確認できる場合のみ設定
