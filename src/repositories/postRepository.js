import { connection } from "../database.js";

async function getPosts(){
    return connection.query(`
        SELECT po.*, pu.username, pu."image_url" 
        FROM posts po
        JOIN public_contents pu ON po."userId"=pu."userId"
    `);
}


export const postRepository = {
    getPosts,
}