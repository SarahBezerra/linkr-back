import { connection } from "../database.js";

export async function getLikes(req, res) {
  // const {user} = res.locals; user virá dessa forma depois da rota login e exclui debaixo
  const userId = 2;

  try {
    const requestLikes = await connection.query(
      `SELECT COUNT("userId") AS "countLikes", "postId"  
        FROM likes GROUP BY "postId"`
    );

    const likes = requestLikes.rows;

    const requestPostsIsLiked = await connection.query(
      `SELECT "postId" FROM likes WHERE "userId" = $1`,
      [userId]
    );
    console.log(requestPostsIsLiked.rows);

    const postIsLiked = requestPostsIsLiked.rows;
    postIsLiked.map((lalal) => console.log(lalal));
    console.log(postIsLiked.includes({ postId: 1 }));

    const userLikes = likes.map(({ countLikes, postId }) => {
      let liked = "";
      if (postIsLiked.includes({ id: postId })) {
        liked = true;
      } else {
        liked = false;
      }
      return { countLikes, postId, liked };
    });

    res.status(200).send(userLikes);
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
      `SELECT * FROM likes WHERE "postId" = $1 AND "userId" = $2`,
      [idPost, userId]
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
