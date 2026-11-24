# まちカフェ！ 固定URLの案内ページ

既存のPythonアプリとは独立した、GitHub Pages用の静的ページです。
大きな見出しと概要文は置かず、ブランド名・公開状況・検索サイトへのボタン・再訪案内を配置しています。

## ローカルで確認

index.html をブラウザで開いてください。サーバーや追加パッケージは不要です。
公開状況と移動先は config.js の設定に従います。

## 公開先を設定

config.js の設定を次のように変更します。URLは実際のCloudflare公開URLに置き換えてください。

```js
window.EVENT_GUIDE_CONFIG = {
  published: true,
  publicUrl: "https://実際のホスト名.trycloudflare.com"
};
```

停止表示にする場合は published を false にします。
公開状況は手動設定です。サーバーの稼働を自動検知したり、サーバーを起動・停止したりする機能はありません。
遷移は同じタブで行います。ページで接続先の疎通確認はしません。

## GitHub Pagesへの配置

案内ページ専用のリポジトリに index.html / styles.css / config.js / guide.js / .nojekyll を配置します。
GitHub Pagesの公開元を設定すると、このリポジトリの固定URLから案内ページを開けます。
相対パスで参照しているため、プロジェクト名を含むURLでも動作します。
現在のアプリのファイルや認証情報は、このリポジトリにコピーしないでください。

Cloudflare再起動後は config.js の publicUrl を更新して反映します。
反映・キャッシュ更新に時間がかかることがあります。
固定の案内ページ: https://lostmilk.github.io/machicafe-guide/
専用リポジトリ: https://github.com/lostmilk/machicafe-guide

config.js をローカルで変更した後は、このフォルダでコミット・プッシュする必要があります。
GitHub上で config.js を直接編集してコミットする方法でも反映できます。
既存アプリのリポジトリへのプッシュでは反映されません。

## 接続先リンクの更新日時

ページ下部に `config.js` の `linkUpdatedAt` を日本時間で表示します。
URL変更時は `python update_link.py "https://実際のホスト名.trycloudflare.com/"` を実行すると、URLと日時を同時に更新できます。その後コミット・プッシュしてください。
同じURLの公開状態だけを変える場合、リンクの更新日時は変わりません。停止設定には `--closed` を付けます。
GitHubで直接URLを変更する場合は `linkUpdatedAt` もタイムゾーン付き日時で更新してください（例: `2026-11-24T20:00:00+09:00`）。
