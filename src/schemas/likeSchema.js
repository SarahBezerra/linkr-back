import joi from "joi";

const likeSchema = joi.object({
  userId: joi.number().required(), //quando houver usuário logado não precisa de schema o like
});

export default likeSchema;
