import { hashtagRepository } from "../repositories/hashtagRepository.js";


export async function getTopHashtags(req,res){

    try {
        const {rows: result} = await hashtagRepository.getTopHashtags();
        console.log(result);
        res.send(result);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}