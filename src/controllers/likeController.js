import { connection } from "../database.js";

export async function getLikes(req, res) {
  try {
    const select = connection.query(`SELECT * FROM likes`);
    res.status(200).send(select);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function likePostOrNot(req, res) {
  // const {user} = res.locals; user virá dessa forma depois da rota login e exclui debaixo
  const { userId } = req.body;
  const { idPost } = req.params;

  try {
    const postExist = await connection.query(
      `SELECT * FROM posts WHERE id = $1`,
      [idPost]
    );

    if (!(postExist.rowCount > 0)) {
      return res.sendStatus(404);
    }

    const postIsLike = await connection.query(
      `SELECT posts.id, likes."userId" FROM posts 
        JOIN likes ON likes."postId" = posts.id
        WHERE posts.id = $1`,
      [idPost]
    );

    if (postIsLike.rowCount > 0) {
      await connection.query(
        `DELETE FROM likes WHERE "postId" = $1 AND "userId" = $2`,
        [idPost, userId]
      );
      return res.sendStatus(200);
    }

    await connection.query(
      `INSERT INTO likes ("postId", "userId") VALUES ($1, $2)`,
      [idPost, userId]
    );
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
