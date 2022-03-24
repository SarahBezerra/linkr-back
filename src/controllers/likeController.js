import { connection } from "../database.js";

export async function getLikes(req, res) {
  // const {user} = res.locals; user virá dessa forma depois da rota login e exclui debaixo
  const theUser = 1;

  try {
    const requestLikes = await connection.query(
      `SELECT COUNT("userId") AS "countLikes", "postId"  
        FROM likes GROUP BY "postId"
      ORDER BY "postId"`
    );

    const likes = requestLikes.rows;

    const requestPostsIsLiked = await connection.query(
      `SELECT "postId" as id FROM likes WHERE "userId" = $1`,
      [theUser]
    );

    const postIsLiked = requestPostsIsLiked.rows;

    const requestUsersNames = await connection.query(
      `SELECT likes."userId", likes."postId" as id,public_contents.username 
        FROM public_contents 
      JOIN likes ON likes."userId" = public_contents."userId"
      ORDER BY likes."postId"
      `
    );

    const userNames = requestUsersNames.rows;

    const userLikes = likes.map(({ countLikes, postId }) => {
      let liked = false;
      postIsLiked.map(({ id }) => {
        id === postId ? (liked = true) : "";
      });

      const arrayUsersNames = [];

      userNames.map(({ id, userId, username }) => {
        if (id === postId && userId === theUser)
          return arrayUsersNames.unshift("Você");
        if (id === postId && arrayUsersNames.length < 3)
          return arrayUsersNames.push(username);
      });

      const othersPeoples = countLikes - arrayUsersNames.length;
      othersPeoples !== 0
        ? arrayUsersNames.push(`and others ${othersPeoples} peoples`)
        : "";

      return { countLikes, postId, liked, arrayUsersNames };
    });

    res.status(200).send(userLikes);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function requesitionTest(req, res) {
  try {
    const test = request.rows[0];

    const array = test.map(({ postId, username }) => {
      return { postId, username };
    });
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
