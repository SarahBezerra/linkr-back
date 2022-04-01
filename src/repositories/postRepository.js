import { connection } from "../database.js";

async function getPosts(
  conditions = [],
  conditionsUnion = [],
  params = [],
  loadCount = 0
) {
  const query = `${conditions.join(" AND ")}`;
  const queryUnion = `${conditionsUnion.join(" AND ")}`;

  const loadCountInt = parseInt(loadCount);

  return connection.query(
    `
          SELECT * FROM(
            SELECT 	po.*, pu.username, pu."image_url",
                    me.title, me.image, me.description,
                    re.id AS "repostId", re."userId" AS "reposterId", re.date AS "repostDate",
                    pu2.username AS "reposterName",
                    "repostCount"."shareCount"
            FROM posts po
            JOIN public_contents pu ON po."userId"=pu."userId"
            LEFT JOIN reposts re ON re."postId"=po.id
            LEFT JOIN public_contents pu2 ON re."userId"=pu2."userId"
            JOIN metadata me ON po.id = me."postId"
            LEFT JOIN 
                      ( select p.id, count(p.id) AS "shareCount"
                        from posts p
                        join reposts r on p.id=r."postId" 
                      group by p.id ) AS "repostCount" ON "repostCount".id=po.id
              WHERE 

                  ${query}

              UNION

              SELECT 	po.*, pu.username, pu."image_url",
                    me.title, me.image, me.description,
                    NULL AS "repostId", NULL AS "reposterId", NULL AS "repostDate",
                    NULL AS "reposterName",
                    NULL AS "shareCount"
              FROM posts po
              JOIN public_contents pu ON po."userId"=pu."userId"
              JOIN metadata me ON po.id = me."postId"
              WHERE 
                  
                    ${queryUnion}

            ) "finalTable"

            ORDER BY GREATEST("repostDate", post_date) DESC NULLS LAST
            LIMIT ${loadCountInt > 0 ? 10 * loadCountInt : 10}
        `,
    params
  );
}

async function getFollowed(userId) {
  
  return connection.query(
    `SELECT * 
    FROM follows
    WHERE follows."followerId"=${userId}`
  );

}

async function storeHashtags(id, text) {
  try {
    let hashtags = text.match(/(^#[a-zA-Z0-9]+)|(\s#[a-zA-Z0-9]+)/gi);

    const hashtagArray = hashtags?.reduce((prev, curr) => {
      let [junk, hashtag] = curr.split("#");
      prev.push(hashtag);
      return prev;
    }, []);

    for (let i = 0; i < hashtagArray?.length; i++) {
      let newId = 0;

      const {
        rows: [hashtagObject],
      } = await connection.query(
        "SELECT * FROM hashtags WHERE hashtags.name = $1",
        [hashtagArray[i]]
      );
      if (hashtagObject) {
        await connection.query(
          'INSERT INTO "hashtagsPosts" ("postId","hashtagId") VALUES ($1, $2) ',
          [id, hashtagObject.id]
        );
      } else {
        const {
          rows: [{ id: newHashtagId }],
        } = await connection.query(
          "INSERT INTO hashtags (name) VALUES ($1) RETURNING id",
          [hashtagArray[i]]
        );
        await connection.query(
          'INSERT INTO "hashtagsPosts" ("postId","hashtagId") VALUES ($1, $2) ',
          [id, newHashtagId]
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function storeMetadata(postId, meta) {
  return connection.query(
    `
    INSERT INTO metadata ("postId", image, title, description)
    VALUES ($1, $2, $3, $4)
  `,
    [postId, meta.image, meta.title, meta.description]
  );
}

async function getDatePost(idPost) {
  return connection.query(
    `
    SELECT post_date as date from posts 
    WHERE id=$1
  `,
    [idPost]
  );
}

async function countNumberPosts(date, userId) {
  return connection.query(
    `
    SELECT COUNT(po.text) FROM posts po
      LEFT JOIN reposts re ON re."postId" = po.id 
      LEFT JOIN (
        SELECT * FROM follows
        WHERE "followerId" = $1) se 
      ON se."followedId" = po."userId"
    WHERE po.post_date > cast($2 as timestamp without time zone) 
    OR re.date > cast($2 as timestamp without time zone) 
  `,
    [userId, date]
  );
}

function verifyPostExist(postId) {
  return connection.query(`SELECT * FROM posts WHERE id=$1`, [postId]);
}

async function storePost(id, url, text) {
  try {
    const {
      rows: [{ id: newPostId }],
    } = await connection.query(
      'INSERT INTO posts ("userId", url, text) VALUES ($1, $2, $3) RETURNING id',
      [id, url, text]
    );
    return newPostId;
  } catch (error) {
    console.log(error);
  }
}

async function verifyAuthPost(idPost, idUser) {
  return connection.query(
    ` SELECT * FROM posts WHERE id = $1 AND "userId" = $2`,
    [idPost, idUser]
  );
}

async function deleteLikesPost(idPost) {
  return connection.query(`DELETE FROM likes WHERE "postId" = $1`, [idPost]);
}

async function deleteHashtagsPost(idPost) {
  return connection.query(`DELETE FROM "hashtagsPosts" WHERE "postId" = $1`, [
    idPost,
  ]);
}

async function deleteMetadataPost(idPost) {
  return connection.query(`DELETE FROM metadata WHERE "postId" = $1`, [idPost]);
}

async function deletePostId(idPost) {
  return connection.query(`DELETE FROM posts WHERE id = $1`, [idPost]);
}

async function updatePost(postId, message) {
  return connection.query(`UPDATE posts SET text=$1 WHERE id=$2`, [
    message,
    postId,
  ]);
}

export const postRepository = {
  getPosts,
  getFollowed,
  storePost,
  storeHashtags,
  verifyPostExist,
  getDatePost,
  countNumberPosts,
  storeMetadata,
  verifyAuthPost,
  deleteLikesPost,
  deletePostId,
  deleteMetadataPost,
  deleteHashtagsPost,
  updatePost,
};
