import Express from "express";
import cone from "../MySQL.js";

const mypageRouter = Express.Router();

// マイページの表示
mypageRouter.get("/", (req, res) => {

  const sql = "SELECT * FROM tables";

  cone.query(sql, (err, result) => {
    res.render("mypage.ejs", { tables: result });
    // console.log(result);
  });
});

export default mypageRouter;