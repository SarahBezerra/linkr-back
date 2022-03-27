import { postRepository } from "../repositories/postRepository.js";
import urlMetadata from "url-metadata";
import { connection } from "../database.js";

export async function getPosts(req, res) {
  const { conditions } = res.locals;
  const { params } = res.locals;

  try {
    const result = await postRepository.getPosts(conditions, params);

    const postsList = [];

    for (const r of result.rows) {
      const meta = await urlMetadata(r.url);
      // console.log(meta);

      const postObject = {
        id: r.id,
        userId: r.userId,
        username: r.username,
        text: r.text,
        image_url: r.image_url,

        metaData: {
          url: meta.url,
          title: meta.title,
          image: meta.image,
          description: meta.description,
        },
      };

      postsList.push(postObject);
    }

    res.send(postsList);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function sendPost(req, res) {
  const userId = 3;
  const { url, text } = req.body;
  try {
    const postId = await postRepository.storePost(userId, url, text);
    await postRepository.storeHashtags(postId, text);

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function deletePost(req, res) {
  const { user } = res.locals;
  const { idPost } = req.params;

  try {
    const postExist = await postRepository.verifyAuthPost(idPost, user.id);

    if (!(postExist.rowCount > 0)) return res.sendStatus(400);

    await postRepository.deletePostId(idPost);
    res.sendStatus(200);
  } catch (err) {
    //console.log(err);
    res.sendStatus(500);
  }
}
