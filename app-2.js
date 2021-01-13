//モジュールの読み込み
const express = require("express");
//MySQLモジュールの読み込み
const mysql = require("mysql");
//BodyParserの読み込み
const bodyParser = require("body-parser");
//初期化
const app = express();
//MySQL接続情報
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "KUAD"
});
//使用するポート番号
const port = 4000;
//リクエストボディをJSONに変換する
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORSを許可する
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//expressのgetメソッドを使用したルートアクセスの処理。
//reqはクライアントからのHTTPリクエストの情報が入っている。
//resはクライアントに送り返すHTTPレスポンスの情報が入っている。
app.get("/", function(req, res) {
  res.send("Hello Express!");
});

//api/folk_toyにアクセスがあった場合、全てのfolk_toyレコードを返す。
app.get("/api/folk_toy", function(req, res) {
  connection.query("SELECT * FROM folk_toy", function(error, results, fields) {
    if(!error) {
      res.send(results);
    } else {
      throw error;
    }
  });
});

//folk_toyデータ追加
app.post("/api/folk_toy", (req, res) => {
  console.log(req.body.name);
  console.log(req.body.type);

  connection.query('INSERT INTO folk_toy(name, type) VALUES (?, ?)', [req.body.name, req.body.type],
    function(error, results) {
      if(!error) {
        res.send(results);
      } else {
        throw error;
    }
  });
});

//指定したポート番号でアプリケーションを起動。
app.listen(port, function() {
  console.log("listen: " + port);
});
