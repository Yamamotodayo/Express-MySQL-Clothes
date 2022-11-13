import Express from "express";
import cone from "../MySQL.js";

const itemRouter = Express.Router();

// アイテム紹介ページの表示
itemRouter.get("/:id", (req, res) => {
    console.log("aaaa");
    const sql = "SELECT * FROM tables WHERE id = " + req.params.id;
  
    cone.query(sql, [req.params.id], (err, result, fields) => {
      if (err) throw err;
      res.render("item", { tables: result });
    });
  });

  export default itemRouter;