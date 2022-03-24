import joi from "joi";

const postSchema = joi.object({

  url: joi.uri().required(),
  text: joi.string().optional(),
});

export default postSchema;