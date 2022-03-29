import { connection } from "../database.js";
import { commentRepository } from "../repositories/commentRepository.js";

export async function getInitComments(req, res) {
  res.sendStatus(200);
}

export async function getPostComments(req, res) {}

export async function postNewComment(req, res) {
  const { user } = res.locals;
  const { postId } = req.params;
  const { text } = req.body;
  const userId = user.id;

  try {
    const postExist = await commentRepository.verifyPostExist(postId);

    if (!(postExist.rowCount > 0)) return res.sendStatus(404);

    await commentRepository.insertNewComment(userId, postId, text);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
