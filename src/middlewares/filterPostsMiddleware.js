export default function filterPostMiddleware(req, res, next){

    const { hashtag } = req.params;
    const { id } = req.params;

    const conditions =  res.locals.conditions || [];
    const params = res.locals.params || [];

    if(hashtag){
        params.push(`%#${hashtag} %`);
        params.push(`%#${hashtag}`);
        conditions.push(`text ILIKE $${params.length-1} OR
                         text ILIKE $${params.length}`);
    }

    if(id){
        params.push(id);
        conditions.push(`"userId"=$${params.length}`);
    }


    res.locals.conditions = conditions;
    res.locals.params = params;

    next()
}