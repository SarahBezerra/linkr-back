import { connection } from "../database.js";

async function getRePosts() {
  return connection.query(`
    SELECT COUNT(r."userId") AS "countRePosts", r."postId", aux."IReposted"
    FROM reposts r 
    LEFT JOIN (select "postId", TRUE AS "IReposted" from reposts WHERE "userId"=36) AS aux 
	    ON aux."postId"=r."postId"
    GROUP BY r."postId", aux."IReposted"
`);
}

async function verifyPostRePosted(idPost, userId) {
  return connection.query(`
      SELECT * FROM reposts 
      WHERE "postId" = $1 AND "userId" = $2
  `,[idPost, userId]
  );
}

async function deleteRePost(idPost, userId) {
  return connection.query(
    `DELETE FROM reposts WHERE "postId" = $1 AND "userId" = $2`,
    [idPost, userId]
  );
}

async function insertRePost(idPost, userId) {
  return connection.query(
    `INSERT INTO reposts ("postId", "userId") VALUES ($1, $2)`,
    [idPost, userId]
  );
}

export const rePostRepository = {
    getRePosts,
    verifyPostRePosted,
    deleteRePost,
    insertRePost,
};
