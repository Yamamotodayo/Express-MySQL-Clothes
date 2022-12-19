import Express from "express";
import cone from "../MySQL.js";

const searchRouter = Express.Router();

// 検索結果ページの表示
searchRouter.get("/", (req, res) => {
    // console.log(req.query.q);
    const sql = "SELECT * FROM tables WHERE name LIKE ?";
    // const sql = "SELECT * FROM tables WHERE name || detail LIKE ?"; 名前と詳細を条件に指定

    const query = req.query.q
    const word = "%" + query + "%";

    // クエリがない場合はマイページに戻る
    if (!query) {
        return res.redirect("/");
      }
  
    cone.query(sql, [word], (err, result, fields) => {
        if (err) throw err;
        console.log(result);

        // 検索結果がない場合の処理を書く
        let message = null;
        if (!result.length) {
            message = "検索結果なし"
        }

        console.log(message);
        res.render("search.ejs", { tables: result, searchWord: query, message: message });

      // console.log(result);
    // console.log(req.body.search);
    //   console.log(req.query.q);
    //   console.log(word);
    //   res.render("search.ejs", { tables: result, searchWord: query });
    });
  });

  export default searchRouter;