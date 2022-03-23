export default function validateSchemaMiddleware(schema) {
  return (req, res, next) => {
    const validation = schema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      const err = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(err);
    }

    next();
  };
}
