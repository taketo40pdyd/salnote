// firebase-messaging-sw.js
// 給与手帳: バックグラウンド(ブラウザを閉じている/タブが非アクティブ)でも
// プッシュ通知を受け取るためのFirebase Cloud Messaging用Service Workerです。
//
// 配置場所: このファイルは index.html と同じ階層(サイトのルート)に置いてください。
// これを置かない場合、プッシュ通知機能は使えませんが、それ以外の機能(入力・保存・
// PDF/CSV出力・クラウド同期そのもの)には影響しません。
//
// 下のconfigは index.html 内の FIREBASE_CONFIG と同じ値にしてください。
// (index.html の FIREBASE_CONFIG を変更したら、こちらも合わせて更新してください)

importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBl6o207NgyTKh-CzeEojbSzAZLStWHk84",
  authDomain: "kyuyomeisai-7100a.firebaseapp.com",
  projectId: "kyuyomeisai-7100a",
  storageBucket: "kyuyomeisai-7100a.firebasestorage.app",
  messagingSenderId: "144055442983",
  appId: "1:144055442983:web:948ca807e256e36ce87802"
});

const messaging = firebase.messaging();

// アプリがフォアグラウンド(開いて見ている状態)のときは index.html 側の
// onMessage ハンドラが処理するため、ここはバックグラウンド受信のみを扱います。
messaging.onBackgroundMessage((payload) => {
  const title = (payload.notification && payload.notification.title) || '給与手帳';
  const body = (payload.notification && payload.notification.body) || (payload.data && payload.data.body) || '通知があります';
  self.registration.showNotification(title, {
    body: body,
    tag: 'kyuyo-techo-notify',
  });
});
