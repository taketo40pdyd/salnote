# 給与手帳 (Kyuyo Techo)

単一HTMLファイルで動く給与・賞与の記録アプリです。GitHub Pagesにそのまま公開できます。

## ファイル構成

```
.
├── index.html                 アプリ本体(このファイル1つだけで動作します)
├── firebase-messaging-sw.js   プッシュ通知用Service Worker(任意・push通知を使う場合のみ)
├── .nojekyll                  GitHub PagesのJekyll処理を無効化するための空ファイル
└── README.md                  このファイル
```

## 公開手順(GitHub Pages)

1. これらのファイルをリポジトリの直下(ルート)に置いて、GitHubにpushする
2. リポジトリの **Settings → Pages** を開く
3. **Source** を「Deploy from a branch」にし、対象ブランチ(通常 `main`)と
   フォルダを `/ (root)` に設定して **Save**
4. 数分待つと `https://<ユーザー名>.github.io/<リポジトリ名>/` で公開されます

GitHub Pagesは自動的にHTTPSで配信されるので、追加設定は不要です。

## データの保存について

- 既定では **localStorage**(このブラウザ・この端末の中だけ)にデータが保存されます。
  GitHub Pagesにそのまま公開するだけであれば、これ以上の設定は不要です。
- 任意でGoogleアカウントによるクラウド同期(Firebase)を使う場合のみ、下記の追加設定が必要です。

## クラウド同期(Firebase)を使う場合の追加設定

`index.html` にはすでにFirebaseプロジェクトの `FIREBASE_CONFIG` が設定済みです。
GitHub Pagesの公開ドメインでログインできるようにするには:

1. [Firebase Console](https://console.firebase.google.com) で該当プロジェクトを開く
2. **Authentication → Settings → 承認済みドメイン** に、公開先のドメイン
   (例: `<ユーザー名>.github.io`)を追加する
3. 別のFirebaseプロジェクトを使いたい場合は、`index.html` 内の `FIREBASE_CONFIG` と
   `firebase-messaging-sw.js` 内のconfigの両方を、新しいプロジェクトの値に差し替える
   (2箇所とも同じ値にすること)

## プッシュ通知(任意)を使う場合

1. Firebase Console → **Cloud Messaging → ウェブ設定 → ウェブプッシュ証明書** で
   鍵ペアを生成し、公開鍵を `index.html` 内の `VAPID_KEY` に貼り付ける
2. `firebase-messaging-sw.js` を `index.html` と同じ階層(サイトのルート)に配置する
   (このリポジトリ構成ならそのままで問題ありません)
3. 実際に通知を送信するサーバー側の処理(Cloud Functions)は別途デプロイが必要です

## 注意

- `FIREBASE_CONFIG` はクライアント側に公開される値です(Firebaseの仕組み上、
  これ自体は秘密情報ではありません)。ただし誰でも読み書きできないよう、
  Firestoreのセキュリティルールは必ず設定してください(`index.html` 内のコメントに
  ルール例を記載しています)。
- クラウド同期を使わない場合は、Firebase関連のファイル・設定は無視して
  `index.html` を公開するだけで問題ありません。
