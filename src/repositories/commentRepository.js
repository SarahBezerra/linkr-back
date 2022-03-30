import { connection } from "../database.js";

function verifyPostExist(postId) {
  return connection.query(`SELECT * FROM posts WHERE id=$1`, [postId]);
}

function getPostComments(userId, postId) {
  return connection.query(
    `SELECT c.id, c.text, c."userId", po."userId" as "authorPost", 
      se."followerId", p."image_url", p.username
    FROM comments c
      JOIN posts po ON po.id = c."postId"
      JOIN public_contents p ON p."userId" = c."userId"
      LEFT JOIN (
        SELECT * FROM follows f 
        WHERE f."followerId" = $1 OR f."followerId" IS NULL) se 
      ON se."followedId" = c."userId"
    WHERE po.id= $2
    ORDER BY c.date
    `,
    [userId, postId]
  );
}

function insertNewComment(userId, postId, text) {
  return connection.query(
    `INSERT INTO comments ("userId", "postId", text) VALUES ($1, $2, $3)`,
    [userId, postId, text]
  );
}

export const commentRepository = {
  verifyPostExist,
  insertNewComment,
  getPostComments,
};
