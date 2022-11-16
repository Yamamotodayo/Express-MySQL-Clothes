"use strict";
import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config();
import Express from "express";
import cone from "./MySQL.js";
import mysql from "mysql2";
import ip from "ip";
import multer from "multer";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import fs from "fs";
import url from "url";

// ↓ Router
import mypageRouter from "./routers/mypage.js";
import uploadRouter from "./routers/upload.js";
import itemRouter from "./routers/item.js";
import deleteRouter from "./routers/delete.js";
import editRouter from "./routers/edit.js";
import updataRouter from "./routers/updata.js";

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
app.use(Express.static(__dirname + "/public"));
app.use("/images", Express.static("/images"));



app.use('/', mypageRouter);

app.use('/upload', uploadRouter);

app.use('/item', itemRouter);
// app.use('/item/:id', itemRouter); これだとダメなぜ

app.use('/delete', deleteRouter);

app.use('/edit', editRouter);

app.use('/edit/updata', updataRouter);







// //データの編集
// app.get("/edit/:id", (req, res) => {
//   const sql = "SELECT * FROM tables WHERE id = ?";

//   cone.query(sql, [req.params.id], (err, result, fields) => {
//     if (err) throw err;
//     res.render("edit", { tables: result });
//   });
// });

//データの更新
// app.post("edit/:id", (req, res) => {

// //ここにファイルが空の場合の処理を書く、空だった場合もとの画像を入れるなど
// // if (req.files)



//   console.log("↓↓↓↓↓↓↓");
//   console.log(req.files);
//   // console.log(req.body);
//   // console.log(req.files);
//   console.log(req.body.oldpath);
//   console.log(req.body);
//   const sql = "UPDATE tables SET ? WHERE id = " + req.params.id;

//   cone.query(sql, req.body, (err, result, fields) => {
//     if (err) throw err;
//     console.log(result);
//     res.redirect("/");
//   });
// });


// app.get('/upload/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views/'))
// })
