import { browserRepository } from "../repositories/browserRepository.js";

async function getUsers(req, res){

    const {username} = req.query;

    try{

        const usersArray = await browserRepository.filterUsers(username);
        res.status(200).send([...usersArray])
    }
    catch(error){
        res.status(500).send(error);
    }
}

export {getUsers};