import { authRepository } from "../repositories/authRepository.js";

export async function validateToken(req, res, next) {
  const authorization = req.headers.authorization;
  const errorMessage = "Faça login/cadastro para continuar";

  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send(errorMessage);
  }

  const session = await authRepository.getSession(token);
  if (session.rowCount === 0) {
    return res.status(401).send(errorMessage);
  }

  const user = await authRepository.getPublicContent(session.rows[0].userId);
  if (user.rowCount === 0) {
    return res.status(401).send(errorMessage);
  }

  res.locals.user = user.rows[0];

  next();
}