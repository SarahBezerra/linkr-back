import { followersRepository } from "../repositories/followersRepository.js";

export async function getFollowers(req, res) {
    const { userId } = res.locals.user;
    const pageUserId = Number(req.params.pageUserId);

    let isUserProfile = false;
    let isFollower = false;

    if(userId === pageUserId) {
        isUserProfile = true;
        return res.send( { isUserProfile } );
    }

    try {
        const response = await followersRepository.getFollowers(userId, pageUserId);
        if(response.rowCount) isFollower = true;
    
        res.send( { isUserProfile, isFollower } )
        
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }

    
}

export async function postFollow(req, res){
    const { userId } = res.locals.user;
    const pageUserId = Number(req.body.pageUserId);

    try {
        await followersRepository.postFollow(userId, pageUserId)
        res.sendStatus(200)

    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function deleteFollow(req, res){
    const { userId } = res.locals.user;
    const pageUserId = Number(req.params.pageUserId);

    try {
        await followersRepository.deleteFollow(userId, pageUserId)
        res.sendStatus(200)  
         
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }


}