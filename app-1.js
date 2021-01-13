//モジュールの読み込み
const express = require("express");
//初期化
const app = express();
//使用するポート番号
const port = 4000;

//expressのgetメソッドを使用したルートアクセスの処理。
//reqはクライアントからのHTTPリクエストの情報が入っている。
//resはクライアントに送り返すHTTPレスポンスの情報が入っている。
app.get("/", function(req, res) {
  res.send("Hello Express!");
});

//指定したポート番号でアプリケーションを起動。
app.listen(port, function() {
  console.log("listen: " + port);
});
