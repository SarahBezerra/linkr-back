import { postRepository } from "../repositories/postRepository.js";
import urlMetadata from "url-metadata";

export async function getPosts(req, res) {
  try {
    const result = await postRepository.getPosts();

    const postsList = [];

    for (const r of result.rows) {
      const meta = await urlMetadata(r.url);

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
