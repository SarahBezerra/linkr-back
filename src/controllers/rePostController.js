export async function getRePosts(req, res) {
    const { user } = res.locals;
    const theUser = user?.userId;
  
    try {
        const {rows : rePosts} = await likeRepository.getRePosts();
  
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