export default function filterPostMiddleware(req, res, next){

    const { hashtag } = req.params;
    const { id } = req.params;
    const { user } = res.locals;
    
    const conditions =  res.locals.conditions || [];
    const conditionsUnion =  res.locals.conditionsUnion || [];
    const params = res.locals.params || [];
    

    if(!hasParams(req.params)){
        params.push(user.userId);
        const query = `
                (po."userId" IN (SELECT "followedId" FROM follows WHERE "followerId"=$${params.length}) AND re."userId" IS NULL)
            OR  po."userId" IN ($${params.length})
            OR  re."userId" IN ($${params.length})
            OR 	re."userId" IN (SELECT "followedId" FROM follows WHERE "followerId"=$${params.length})
        `;
        const queryUnion = `
                po."userId" IN (SELECT "followedId" FROM follows WHERE "followerId"=$${params.length})
            OR  po."userId" IN ($${params.length})
        `;
        conditions.push(query);
        conditionsUnion.push(queryUnion);
    }
    
    if(hashtag){
        params.push(`%#${hashtag} %`, `%#${hashtag}`, `%#${hashtag}%`);
        const query =   `
                text ILIKE $${params.length-2}
            OR  text ILIKE $${params.length-1}
            OR  text ILIKE $${params.length}
        `;
        conditions.push(query);
        conditionsUnion.push(query);
    }

    if(id){
        params.push(id);
        conditions.push(`
                re."userId" IN ($${params.length})
        `)
        conditionsUnion.push(`
                po."userId" IN ($${params.length})
        `)
    }


    res.locals.conditions = conditions;
    res.locals.conditionsUnion = conditionsUnion;
    res.locals.params = params;

    next()
}


function hasParams(obj){
    return Object.keys(obj).length !==0
}