import { connection } from "../database.js";

function verifyPostExist(postId) {
  return connection.query(`SELECT * FROM posts WHERE id=$1`, [postId]);
}

function insertNewComment(userId, postId, text) {
  return connection.query(
    `INSERT INTO comments ("userId", "postId", text) VALUES ($1, $2, $3)`,
    [userId, postId, text]
  );
}

export const commentRepository = { verifyPostExist, insertNewComment };
