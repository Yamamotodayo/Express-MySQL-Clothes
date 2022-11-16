import Express from "express";
import cone from "../MySQL.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const deleteRouter = Express.Router();

// データの削除
deleteRouter.post("/:id", (req, res) => {
    const sql = "DELETE FROM tables WHERE id = ?";
  
    if (req.body.postID !== req.params.id) {
      res.redirect("/")
      return
    }
  
    // サーバーの画像を削除する
    const sql2 = `SELECT tables.path FROM tables WHERE id = ${req.params.id}`
    cone.query(sql2, (err, result, fields) => {
      console.log("↓");
      console.log(result[0].path);
      console.log("↓↓↓↓↓↓");
      JSON.parse(result[0].path).forEach(element => {
        fs.unlinkSync(__dirname + "/../public/images/" + element)
      });
    })
  
  
    cone.query(sql, [req.params.id], (err, result, fields) => {
      if (err) throw err;
      console.log(result);
      res.redirect("/");
    });
  });
  
export default deleteRouter;