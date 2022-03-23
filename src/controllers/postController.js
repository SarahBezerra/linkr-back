import { postRepository } from "../repositories/postRepository.js";


export async function getPosts(req,res){
    try {
        const result = await postRepository.getPosts();

        res.send(result);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}