import Express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cone from "../MySQL.js";

const uploadRouter = Express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// アップロードフォームを表示
uploadRouter.get('/', (req, res) => {
    res.render("upload.ejs");
});
// uploadRouter.get('/upload', ) だと無理なんで?


// データの追加
uploadRouter.post("/", async (req, res) => {
  console.log(req.body);
    const file = req.files["path"];
    console.log("fileのレングスは" + file.length);

    let now = new Date().getTime();
  
    let images = [];
  
    if (file.length) {
      for await(const i of file) {
        let imgname = now + i.name 

        const path = __dirname + "/../public/images/" + imgname;
        images.push(imgname)
        i.mv(path);
        req.body.path = `${i.name}`
      
      }
    } else {
      const imgname = now + file.name

      const path = __dirname + "/../public/images/" + imgname;
      images.push(imgname)
      file.mv(path)
    }

    const sql = `INSERT INTO tables SET ?`;

    console.log(req.files);
  
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
      
      console.log(req.body);
      res.redirect("/");
    });
  });

export default uploadRouter;