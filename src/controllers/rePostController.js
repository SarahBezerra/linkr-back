import { likeRepository } from "../repositories/likeRepository.js";
import { rePostRepository } from "../repositories/rePostRepository.js";

export async function getRePosts(req, res) {
    const { user } = res.locals;
    const theUser = user?.userId;
  
    try {
        const {rows : rePosts} = await rePostRepository.getRePosts();
  
        const rePostsList = rePosts.map(r =>{
            const IReposted = r.IReposted === null ? false : true;
            return {countRePosts: r.countRePosts, id: r.postId, IReposted}
        });
  
        res.status(200).send(rePostsList);

    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }


export async function toggleRePost(req, res) {
  const { idPost } = req.params;
  const { user: {userId} } = res.locals;

  try {
    const post = await likeRepository.verifyPostExist(idPost);

    if (post.rowCount === 0)
      return res.sendStatus(404);
    if(post.rows[0].userId === userId)
      return res.status(403).send('impossível compartilhar seu próprio post');

    const postIsReposted = await rePostRepository.verifyPostRePosted(idPost, userId);

    if (postIsReposted.rowCount > 0) {
      await rePostRepository.deleteRePost(idPost, userId);
      return res.sendStatus(200);
    } else{
      await rePostRepository.insertRePost(idPost, userId);
      return res.sendStatus(201);
    }

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}