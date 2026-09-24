# midori-lacquer-site

漆芸作家 齋藤みどり のホームページ用リポジトリです。

- 仕組み：GitHub Pages（Jekyll）で公開、Pages CMS で更新
- 仮URL：https://toasty-air.github.io/midori-lacquer-site/

## ふだんの更新（みどり）

Pages CMS（https://app.pagescms.org）から行います。このリポジトリのファイルを直接編集する必要はありません。

## フォルダの役割（遼太向けメモ）

| 場所 | 役割 | CMSで編集 |
|---|---|---|
| `index.md` | トップ（ABOUT）：トップ写真と制作への想い | ○ |
| `_works/` | 作品データ（1作品＝1ファイル） | ○ |
| `profile.md` | プロフィール・経歴 | ○ |
| `contact.md` | お問い合わせページの文章 | ○ |
| `gallery.md` | ギャラリーページの枠 | × |
| `assets/works/` | 作品写真（CMSからアップロードすると入る） | （自動） |
| `_layouts/` | ページの型紙（ヘッダー・メニュー・フッター） | × |
| `assets/css/` `assets/js/` | デザイン・拡大表示の動き | × |
| `_config.yml` | サイト名・メニュー・URL設定 | × |
| `.pages.yml` | Pages CMS の設定 | × |

## 本公開（独自ドメイン取得）のときに変えること

1. `_config.yml` の `url` を取得したドメインに、`baseurl` を `""` にする
2. `_config.yml` の `noindex` を `false` にする（検索エンジンへの登録を許可）
3. GitHub の Settings → Pages → Custom domain にドメインを設定
