"use strict";
import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config();
import Express from "express";
import mysql from "mysql2";
import ip from "ip";
import multer from "multer";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import fs from "fs";
import url from "url";


const app = Express();
const PORT = process.env.PORT;
const ipAddress = ip.address(); // IPアドレス取得
const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename);
// const publicpath = path.resolve(__dirname, 'public')

app.listen(PORT);
console.log(`http://localhost:${PORT}`);
console.log(`http://${ipAddress}:${PORT}`);

app.set("view engine", "ejs");

//body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
// app.use(Express.static(path.join(__dirname + '/public')));
app.use(Express.static(__dirname + '/public'));
app.use('/images', Express.static('/images'))

// データベース接続情報
const cone = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Yama1106",
  database: "clothes",
});

// テーブルtableのデータを取得してmypage.ejsで表示
app.get("/", (req, res) => {
  const sql = "SELECT * FROM tables";

  cone.query(sql, (err, result) => {
    res.render("mypage.ejs", { tables: result });
    console.log(result);
  });
});

// アイテム紹介ページの表示
app.get("/item/:id", (req, res) => {
  const sql = "SELECT * FROM tables WHERE id = " + req.params.id;

  cone.query(sql, [req.params.id], (err, result, fields) => {
    if (err) throw err;
    res.render("item", { tables: result });
  });
});

// アップロードフォームを表示
app.get("/upload/", (req, res) => {
  res.render("upload.ejs");
});

// データの追加
app.post("/upload/", (req, res) => {
  // アップロードされた画像の情報を取得
  let uploadFile = req.files.path;

  // サーバー上の保存位置
  let uploadPath = `public/images/${uploadFile.name}`;

  // メモリ上にあるファイルをサーバーパスへ移動させる
  uploadFile.mv(uploadPath);

  fs.writeFile(uploadPath, req.files.path.data, (err) => {
    if (err) throw err;

    // let data = {'path': uploadFile.name};
    // console.log(data);
    req.body.path = `${uploadFile.name}`

    // const sql = `INSERT INTO tables VALUES (id, "${data}", ?)`;
    const sql = `INSERT INTO tables SET ?`;

    cone.query(sql, req.body, (err, result, fields) => {
      if (err) throw err;
      console.log(result);
      console.log("upload");
      console.log(req.body);
    //   console.log(data);
    //   console.log(obj);
      res.redirect("/");
    });
  });
});

//データの編集
app.get("/edit/:id", (req, res) => {
  const sql = "SELECT * FROM tables WHERE id = ?";

  cone.query(sql, [req.params.id], (err, result, fields) => {
    if (err) throw err;
    res.render("edit", { table: result });
  });
});

//データの更新
app.post("/update/:id", (req, res) => {
  const sql = "UPDATE tables SET ? WHERE id = " + req.params.id;

  cone.query(sql, req.body, (err, result, fields) => {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
});

// データの削除
app.get("/delete/:id", (req, res) => {
  const sql = "DELETE FROM tables WHERE id = ?";

  cone.query(sql, [req.params.id], (err, result, fields) => {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
});

// app.get('/upload/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views/'))
// })
