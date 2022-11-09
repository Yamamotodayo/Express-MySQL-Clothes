"use strict"
import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config()
import Express from "express";
import mysql from "mysql2";
import ip from "ip"
import multer from 'multer';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { log } from 'console';

const app = Express();
const PORT = process.env.PORT;
const ipAddress = ip.address() // IPアドレス取得

app.listen(PORT);
console.log(`http://localhost:${PORT}`);
console.log(`http://${ipAddress}:${PORT}`);

app.set("view engine", 'ejs');

//body-parserの設定
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

// データベース接続情報
const cone = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Yama1106",
    database: "clothes"
});



// テーブルtableのデータを取得してmypage.ejsで表示
app.get('/', (req, res) => {
    const sql = "SELECT * FROM tables";
    
    cone.query(sql, (err, result) => {
        res.render('mypage.ejs', {tables: result})
        // console.log(result);
    });
});


// アイテム紹介ページの表示
app.get('/item/:id', (req, res) => {
    const sql = "SELECT * FROM tables WHERE id = " + req.params.id

    cone.query(sql, [req.params.id], (err, result, fields) => {
        if(err) throw err;
        res.render('item', {tables : result});
    });
})


// アップロードフォームを表示
app.get('/upload/', (req, res) => {
    res.render('upload.ejs')
});


// データの追加
app.post('/upload/', (req, res) => {

    // let img_path = req.files.path.mv
    
    console.log(req.files.path);

    const sql = "INSERT INTO tables SET ?"

    cone.query(sql, req.body, (err, result , fields) => {
        if (err) throw err;
        // console.log(result);
        console.log('upload');
        res.redirect('/')
    });
});


//データの編集
app.get('/edit/:id', (req, res) => {
    const sql = "SELECT * FROM tables WHERE id = ?"

    cone.query(sql, [req.params.id], (err, result, fields) => {
        if(err) throw err;
        res.render('edit', {table : result});
    });
});


//データの更新
app.post('/update/:id', (req, res) => {
    const sql = "UPDATE tables SET ? WHERE id = " + req.params.id

    cone.query(sql, req.body, (err, result, fields) => {
        if (err) throw err;
        console.log(result);
        res.redirect('/');
    });
});


// データの削除
app.get('/delete/:id', (req, res) => {
    const sql = "DELETE FROM tables WHERE id = ?"
  
    cone.query(sql, [req.params.id], (err, result, fields) => {
      if (err) throw err;
      console.log(result);
      res.redirect('/')
    });
  });
  


// app.get('/upload/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views/'))
// })

