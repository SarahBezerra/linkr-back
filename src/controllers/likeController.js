import { connection } from "../database.js";
import { likeRepository } from "../repositories/likeRepository.js";

export async function getLikes(req, res) {
  // const {user} = res.locals; user virá dessa forma depois da rota login e exclui debaixo
  const theUser = 1;

  try {
    const requestLikes = await likeRepository.countLikesPosts();

    const likes = requestLikes.rows;

    const requestPostsIsLiked = await likeRepository.theUserLiked(theUser);

    const postIsLiked = requestPostsIsLiked.rows;

    const requestUsersNames = await likeRepository.namesLikesPosts();

    const userNames = requestUsersNames.rows;

    const userLikes = likes.map(({ countLikes, postId }) => {
      let liked = false;
      postIsLiked.map(({ id }) => {
        id === postId ? (liked = true) : "";
      });

      const arrayUsersNames = [];

      userNames.map(({ id, userId, username }) => {
        if (id === postId && userId === theUser)
          return arrayUsersNames.unshift("Você");
        if (id === postId && arrayUsersNames.length < 3)
          return arrayUsersNames.push(username);
      });

      const othersPeoples = countLikes - arrayUsersNames.length;
      othersPeoples !== 0
        ? arrayUsersNames.push(`and others ${othersPeoples} peoples`)
        : "";

      return { countLikes, postId, liked, arrayUsersNames };
    });

    res.status(200).send(userLikes);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function likePostOrNot(req, res) {
  // const {user} = res.locals; user virá dessa forma depois da rota login e exclui debaixo
  const { userId } = req.body;
  const { idPost } = req.params;

  try {
    const postExist = await likeRepository.verifyPostExist(idPost);

    if (!(postExist.rowCount > 0)) {
      return res.sendStatus(404);
    }

    const postIsLike = await likeRepository.verifyPostLiked(idPost, userId);

    if (postIsLike.rowCount > 0) {
      await likeRepository.deleteLike(idPost, userId);
      return res.sendStatus(200);
    }

    await likeRepository.insertLike(idPost, userId);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
