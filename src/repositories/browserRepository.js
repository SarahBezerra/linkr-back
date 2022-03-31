import { connection } from "../database.js"

async function filterUsers(string){

    string += '%'
    string = '%' + string;
    try{
        const {rows: usersArray} = await connection.query(
            `SELECT
                pc.username, pc.image_url, u.id 
             FROM 
                public_contents pc
             JOIN
                users u
             ON
                u.id = pc."userId"
            WHERE 
                pc.username LIKE $1`

        ,[string])

        return usersArray
    }
    catch(error){
        res.status(500).send(error)
    }


}


export const browserRepository = {

    filterUsers
}