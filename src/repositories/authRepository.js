import { connection } from "../database.js";

async function getUserByEmail(email){
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

async function createSession(userId, token){
    return connection.query(`
        INSERT INTO sessions ("userId", token) 
        VALUES ($1, $2)
    `, [userId, token]);
}

export const authRepository = {
    getUserByEmail,
    createUser,
    createPublicContent,
    createSession
}