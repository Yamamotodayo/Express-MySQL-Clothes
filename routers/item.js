import Express from "express";
import cone from "../MySQL.js";

const itemRouter = Express.Router();

// アイテム紹介ページの表示
itemRouter.get("/:id", (req, res) => {
    console.log("aaaa");
    console.log(req.body);
    const sql = "SELECT * FROM tables WHERE id = " + req.params.id;
  
    cone.query(sql, [req.params.id], (err, result, fields) => {
      if (err) throw err;
      // console.log(result);
      res.render("item", { tables: result });
    });
  });

  export default itemRouter;