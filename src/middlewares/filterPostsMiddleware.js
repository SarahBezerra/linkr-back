export default function filterPostMiddleware(req, res, next){

    const { hashtag } = req.params;
    const { id } = req.params;
    const { user } = res.locals;
    
    const conditions =  res.locals.conditions || [];
    const params = res.locals.params || [];
    

    if(!hasParams(req.params)){
        params.push(user.userId);
        conditions.push(`
                po."userId" IN (SELECT "followedId" FROM follows WHERE "followerId"=$${params.length}) 
            OR 	re."userId" IN (SELECT "followedId" FROM follows WHERE "followerId"=$${params.length})
            OR  po."userId" IN ($${params.length})
        `)
    }
    
    if(hashtag){
        params.push(`%#${hashtag} %`);
        params.push(`%#${hashtag}`);
        conditions.push(`text ILIKE $${params.length-1} OR
        text ILIKE $${params.length}`);
    }

    // if(id){
    //     params.push(id);
    //     conditions.push(`pu."userId"=$${params.length}`);
    // }
    if(id){
        params.push(id);
        conditions.push(`
                po."userId" IN ($${params.length}) 
            OR 	re."userId" IN ($${params.length})
        `)
    }


    res.locals.conditions = conditions;
    res.locals.params = params;

    next()
}


function hasParams(obj){
    return Object.keys(obj).length !==0
}