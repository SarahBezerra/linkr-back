import { connection } from "../database.js";

async function getUsers(email){
    return connection.query(`
        SELECT * 
        FROM users 
        WHERE email=$1
    `, [email]);
}

async function createUser(email, password){
    return connection.query(`
        INSERT INTO users (email, password) 
        VALUES ($1, $2)
    `, [email, password]);
}

async function createPublicContent(userId, username, image_url){
    return connection.query(`
        INSERT INTO public_contents ("userId", username, image_url) 
        VALUES ($1, $2, $3)
    `, [userId, username, image_url]);
}

export const authRepository = {
    getUsers,
    createUser,
    createPublicContent
}