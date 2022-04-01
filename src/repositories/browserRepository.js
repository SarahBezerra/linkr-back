import { connection } from "../database.js"

async function filterUsers(username, userId){


    username += '%'


    try{
        const {rows: usersArray} = await connection.query(
            `
            WITH
                followed_ref AS (
                    SELECT 
                        f."followedId" 
                    FROM 
                        follows f 
                    WHERE 
                        f."followerId" = $1
                ), 
                users_rank AS (
                    SELECT users.id, CASE 
                    WHEN users.id = followed_ref."followedId" 
                        THEN 1
                        ELSE 0
                    END AS 
                        status 
                    FROM 
                        users
                    LEFT JOIN 
                        followed_ref 
                    ON
                        followed_ref."followedId" = users.id
                )
            SELECT
                pc.username, pc.image_url, u.id, ur.status
            FROM 
                public_contents pc
            JOIN
                users u
            ON
                u.id = pc."userId"
            JOIN
                users_rank ur
            ON 
                u.id = ur.id
            WHERE 
                lower(pc.username) ILIKE $2
            ORDER BY
                ur.status
            DESC
                
            `
            
            

        ,[userId, username])

        return usersArray
    }
    catch(error){
        res.status(500).send(error)
    }


}


export const browserRepository = {

    filterUsers
}