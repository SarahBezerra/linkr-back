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

export const likeRepository = {
    getRePosts,
};
