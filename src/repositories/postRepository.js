import { connection } from "../database.js";

async function sendPost(id){


}

async function getPosts(){
    return connection.query(`
        SELECT po.*, pu.username, pu."image_url" 
        FROM posts po
        JOIN public_contents pu ON po."userId"=pu."userId"
        ORDER BY po.post_date DESC
        LIMIT 20
    `);
}

export const postRepository = {
    sendPost,
    getPosts
}