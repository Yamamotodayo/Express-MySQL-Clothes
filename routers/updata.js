import { count } from "console";
import Express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cone from "../MySQL.js";

const updataRouter = Express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


updataRouter.post("/:id", async (req, res) => {

    let images = JSON.parse(req.body.oldpath) // 配列に古い画像を格納しておく
    // console.log(req.body.path);
    let now = new Date().getTime()

    // ↓新しい画像が送られてきたかどうかの判別
    if (req.files !== null) {
      const file = req.files["path"];
    
      if (file.length) {
        for await(const i of file) {
          let imgname = now + i.name
          
          const path = __dirname + "/../public/images/" + imgname
          images.push(imgname)// 古い画像の名前が入っている配列に新しい画像の名前をプッシュ
          i.mv(path)

          req.body.path = `${i.name}` // ？

        }
      } else {
        const imgname = now + file.name
        const path = __dirname + "/../public/images/" + imgname
        images.push(imgname)
        file.mv(path)      
      }
    }
    
      const sql = "UPDATE tables SET ? WHERE id = " + req.params.id;

      const data = {
        path: JSON.stringify(images),
        name: req.body.name,
        price: req.body.price,
        date: req.body.date,
        shop: req.body.shop,
        detail: req.body.detail
      }
    
      cone.query(sql, data, (err, result, fields) => {
        if (err) throw err;
        console.log(result);
        res.redirect("/");
      });
    });
    
export default updataRouter;