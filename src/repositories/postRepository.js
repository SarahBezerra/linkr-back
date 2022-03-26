import { connection } from "../database.js";

async function getPosts(conditions = [], params = []){

    let query = '';

    if (conditions.length > 0){
        query += `WHERE ${conditions.join(" AND ")}`;
    }

    return connection.query(`
        SELECT po.*, pu.username, pu."image_url" 
        FROM posts po
        JOIN public_contents pu ON pu."userId" = po."userId"

        ${query}

        ORDER BY po.post_date DESC
        LIMIT 20
    `, params);
}




async function storeHashtags(id, text){

    try{
        const hashtags = text.match(/(^#[a-zA-Z0-9]+)|(\s#[a-zA-Z0-9]+)/gi);

        const hashtagArray = hashtags.reduce((prev, curr) => {
            let [junk, hashtag] =  curr.split('#');
            prev.push(hashtag);
            return prev
        },[])

        for(let i=0; i<hashtagArray.length; i++){
            let newId=0;

            const {rows: [hashtagObject]} = await connection.query('SELECT * FROM hashtags WHERE hashtags.name = $1',[hashtagArray[i]])
            if(hashtagObject){
                await connection.query('INSERT INTO "hashtagsPosts" ("postId","hashtagId") VALUES ($1, $2) ',[id, hashtagObject.id])
            }
            else{
                const {rows: [{id: newHashtagId}]} = await connection.query('INSERT INTO hashtags (name) VALUES ($1) RETURNING id',[hashtagArray[i]]);
                await connection.query('INSERT INTO "hashtagsPosts" ("postId","hashtagId") VALUES ($1, $2) ',[id, newHashtagId])
                
            }
        }

    }
    catch(error){
        console.log(error);
    }
    
}

async function storePost(id, url, text){

    try{
        const {rows: [{id: newPostId}]} = await connection.query('INSERT INTO posts ("userId", url, text) VALUES ($1, $2, $3) RETURNING id',[id, url, text]);
        return newPostId;
    }
    catch(error){
        console.log(error);
    }
}

export const postRepository = {
    getPosts,
    storePost,
    storeHashtags

}