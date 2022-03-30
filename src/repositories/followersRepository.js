import { connection } from "../database.js";

async function getFollowers(userId, pageUserId) {
  return connection.query(
    `SELECT *
      FROM follows
        WHERE "followerId"=$1
          AND "followedId"=$2
    `, [userId, pageUserId]
  );

}

async function postFollow(userId, pageUserId) {
  return connection.query(
    `INSERT INTO follows
       ("followerId", "followedId")
       VALUES($1, $2)
    `, [userId, pageUserId]
  );
}

async function deleteFollow(userId, pageUserId) {
  return connection.query(
    `DELETE FROM follows
      WHERE "followerId"=$1 
        AND "followedId"=$2
    `, [userId, pageUserId]
  );
}

export const followersRepository = {
    getFollowers,
    postFollow,
    deleteFollow
}