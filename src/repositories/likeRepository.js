import { connection } from "../database.js";

async function countLikesPosts() {
  return connection.query(
    `SELECT COUNT("userId") AS "countLikes", "postId"  
          FROM likes GROUP BY "postId"
        ORDER BY "postId"`
  );
}

async function theUserLiked(theUser) {
  return connection.query(
    `SELECT "postId" as id FROM likes WHERE "userId" = $1`,
    [theUser]
  );
}
async function namesLikesPosts(theUser) {
  return connection.query(
    `SELECT likes."userId", likes."postId" as id,public_contents.username 
    FROM public_contents 
  JOIN likes ON likes."userId" = public_contents."userId"
  ORDER BY likes."postId"
  `
  );
}

async function verifyPostExist(idPost) {
  return connection.query(`SELECT * FROM posts WHERE id = $1`, [idPost]);
}

async function verifyPostLiked(idPost, userId) {
  return connection.query(
    `SELECT * FROM likes WHERE "postId" = $1 AND "userId" = $2`,
    [idPost, userId]
  );
}

async function deleteLike(idPost, userId) {
  return connection.query(
    `DELETE FROM likes WHERE "postId" = $1 AND "userId" = $2`,
    [idPost, userId]
  );
}

async function insertLike(idPost, userId) {
  return connection.query(
    `INSERT INTO likes ("postId", "userId") VALUES ($1, $2)`,
    [idPost, userId]
  );
}

export const likeRepository = {
  countLikesPosts,
  theUserLiked,
  namesLikesPosts,
  verifyPostExist,
  verifyPostLiked,
  deleteLike,
  insertLike,
};
