import Express from "express";
import cone from "../MySQL.js";

const editRouter = Express.Router();

//データの編集フォーム表示
editRouter.get("/:id", (req, res) => {
    const sql = "SELECT * FROM tables WHERE id = ?";
  
    cone.query(sql, [req.params.id], (err, result, fields) => {
      if (err) throw err;
      res.render("edit", { tables: result });
    });
  });

export default editRouter;