import { postRepository } from "../repositories/postRepository.js";
import urlMetadata from "url-metadata";

export async function getPosts(req, res) {
  const { conditions } = res.locals;
  const { conditionsUnion } = res.locals;
  const { params } = res.locals;
  const { loadCount } = req.query;

  try {
    const result = await postRepository.getPosts(
      conditions,
      conditionsUnion,
      params,
      loadCount
    );

    const postsList = [];

    for (const r of result.rows) {
      const postObject = {
        id: r.id,
        userId: r.userId,
        username: r.username,
        text: r.text,
        image_url: r.image_url,

        repost:
          r.repostId === null
            ? undefined
            : {
                id: r.repostId,
                reposterId: r.reposterId,
                reposterName: r.reposterName,
                date: r.repostDate,
                shareCount: r.shareCount,
              },

        metaData: {
          url: r.url,
          title: r.title,
          image: r.image,
          description: r.description,
        },
      };

      postsList.push(postObject);
    }

    if (postsList.length === 0) {
      const followSomeone = await postRepository.getFollowed(params[0]);

      if (followSomeone.rowCount === 0) {
        const noFriends = true;
        return res.send({ noFriends });
      }

      const noPosts = true;
      return res.send({ noPosts });
    }

    res.send(postsList);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getPostsWithInterval(req, res) {
  const { idPost } = req.params;
  const { user } = res.locals;
  const { date } = req.body;
  const userId = user.userId;

  try {
    let lastDate = "";

    if (date === undefined) {
      const responseVerify = await postRepository.verifyPostExist(idPost);

      if (responseVerify.rowCount === 0) return res.sendStatus(404);

      const responseDate = await postRepository.getDatePost(idPost);
      lastDate = responseDate.rows[0].date;
      console.log(lastDate);
    }

    if (lastDate.length === 0) lastDate = date;

    const requestNumber = await postRepository.countNumberPosts(
      lastDate,
      userId
    );
    const number = requestNumber.rowCount;
    console.log(lastDate);
    console.log(number);

    res
      .status(200)
      .send(date !== undefined ? { count: number } : { count: number - 1 });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function sendPost(req, res) {
  const { user } = res.locals;
  const { url, text } = req.body;
  try {
    const meta = await urlMetadata(url);
    const postId = await postRepository.storePost(user.userId, url, text);
    await postRepository.storeHashtags(postId, text);
    await postRepository.storeMetadata(postId, meta);

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function deletePost(req, res) {
  const { user } = res.locals;
  const { idPost } = req.params;

  try {
    const postExist = await postRepository.verifyAuthPost(idPost, user.userId);

    if (!(postExist.rowCount > 0)) return res.sendStatus(400);

    await postRepository.deleteLikesPost(idPost);
    await postRepository.deleteHashtagsPost(idPost);
    await postRepository.deleteMetadataPost(idPost);
    await postRepository.deletePostId(idPost);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function updatePost(req, res) {
  const { user } = res.locals;
  const { postId } = req.params;
  const { message } = req.body;

  try {
    const postExist = await postRepository.verifyAuthPost(postId, user.userId);
    if (postExist.rowCount === 0) return res.sendStatus(400);

    await postRepository.deleteHashtagsPost(postId);
    await postRepository.updatePost(postId, message);
    await postRepository.storeHashtags(postId, message);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
