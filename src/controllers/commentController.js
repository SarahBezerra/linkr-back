import { connection } from "../database.js";
import { commentRepository } from "../repositories/commentRepository.js";

export async function getInitComments(req, res) {
  try {
    const response = await commentRepository.getNumberComments();
    const numberComments = response.rows;

    res.status(200).send(numberComments);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getPostComments(req, res) {
  const { user } = res.locals;
  const { postId } = req.params;
  const userLog = user.userId;

  try {
    const postExist = await commentRepository.verifyPostExist(postId);

    if (!(postExist.rowCount > 0)) return res.sendStatus(404);

    const resListComments = await commentRepository.getPostComments(
      userLog,
      postId
    );

    const listComments = resListComments.rows;

    let sendComments = [];
    sendComments = listComments.map(
      ({
        id,
        text,
        image_url,
        idUserComment,
        username,
        idAuthor,
        followerId,
      }) => {
        const authorPost = idUserComment === idAuthor ? true : false;
        const followUser = followerId === userLog ? true : false;

        return { id, text, image_url, username, authorPost, followUser };
      }
    );

    res.status(200).send(sendComments);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postNewComment(req, res) {
  const { user } = res.locals;
  const { postId } = req.params;
  const { text } = req.body;
  const userId = user.userId;

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
