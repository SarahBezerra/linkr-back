import { authRepository } from "../repositories/authRepository.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function postSingUp(req, res) {
  const { email, password, image_url } = req.body;
  let { username } = req.body;
  username = username[0].toUpperCase() + username.slice(1);

  try {
    const user = await authRepository.getUserByEmail(email);
    if (user.rowCount !== 0) {
      return res.sendStatus(400);
    }

    const encriptedPassword = bcrypt.hashSync(password, 10);

    await authRepository.createUser(email, encriptedPassword);

    const registeredUser = await authRepository.getUserByEmail(email);
    const userId = registeredUser.rows[0].id;
    await authRepository.createPublicContent(userId, username, image_url);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postSingIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await authRepository.getUserByEmail(email);
    if (user.rowCount === 0) {
      return res.sendStatus(400);
    }

    if (bcrypt.compareSync(password, user.rows[0].password)) {
      const token = uuid();

      await authRepository.createSession(user.rows[0].id, token);
      const {
        rows: [publicContentObject],
      } = await authRepository.getPublicContent(user.rows[0].id);

      const { image_url, userId, username } = publicContentObject;

      res.send({ token, userId, image_url, username });
    } else {
      return res.sendStatus(400);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
