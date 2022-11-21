import Express from "express";
import cone from "../MySQL.js";

const mypageRouter = Express.Router();

// マイページの表示
mypageRouter.get("/", (req, res) => {

  const sql = "SELECT id, path, name FROM tables";

  cone.query(sql, (err, result) => {

    result.forEach(i => {
      console.log("これは画像のpath: "+ (i.path));
      console.log("これは画像のpath: "+ JSON.parse(i.path));
      result
    });

    for (let i = 1; i < 1; i++) {
      console.log(result[i]);
      
    }
    console.log(result);
    res.render("mypage.ejs", { tables: result });
    // console.log(result);
  });
});



export default mypageRouter;