import { browserRepository } from "../repositories/browserRepository.js";

async function getUsers(req, res){

    const {username, userId} = req.query;

    try{

        const usersArray = await browserRepository.filterUsers(username, userId);
        res.status(200).send([...usersArray])
    }
    catch(error){
        res.status(500).send(error);
    }
}

export {getUsers};