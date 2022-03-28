import { connection } from "../database.js";


async function getTopHashtags(){
    return connection.query(`
        SELECT sorted.hashname AS text, sorted.counter1 AS count
        FROM  (
            select DISTINCT ON (lower(agr.hashname)) agr.*
            from (
                SELECT h.name AS hashname, COUNT(*) AS counter, sub.counter1
                FROM  hashtags h
                JOIN "hashtagsPosts" hp ON h.id=hp."hashtagId"
                JOIN (
                    SELECT LOWER(h1.name) AS hashname1, COUNT(*) AS counter1
                    FROM  hashtags h1
                    JOIN "hashtagsPosts" hp1 ON h1.id=hp1."hashtagId"
                    GROUP BY hashname1
                ) AS sub ON sub.hashname1 ILIKE h.name
                GROUP BY hashname, sub.counter1
                order by sub.counter1 DESC) as agr
            ORDER BY lower(agr.hashname), counter DESC) AS sorted
        ORDER BY counter1 DESC
        LIMIT 10
    `);
}



export const hashtagRepository = {
    getTopHashtags,
}