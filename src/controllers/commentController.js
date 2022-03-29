import { connection } from "../database.js";

export async function getInitComments(req, res) {
  res.sendStatus(200);
}

export async function postNewComment(req, res) {
  const { user } = res.locals;
  const { postId } = req.params;
  const { text } = req.body;
  const userId = user.id;
  console.log(user.id);

  try {
    const postExist = await connection.query(
      `SELECT * FROM posts WHERE id = $1`,
      [postId]
    );

    if (!(postExist.rowCount > 0)) return res.sendStatus(404);

    await connection.query(
      `INSERT INTO comments ("userId", "postId", text) VALUES ($1, $2, $3)`,
      [userId, postId, text]
    );

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
