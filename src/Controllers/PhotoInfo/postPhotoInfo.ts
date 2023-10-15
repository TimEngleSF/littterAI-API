import { Request, Response } from 'express';
import Joi from 'joi';
import { logError } from '../../Errors/logError';
import { RequestWithUser } from '../../middleware/isAuth';
import Models from '../../Models';

const reqBodySchema = Joi.object({
  category: Joi.string()
    .valid(
      'paper',
      'cardboard',
      'compost',
      'metal',
      'glass',
      'plastic',
      'trash',
      'other',
      'unknown'
    )
    .required(),
});

export const postPhotoInfo = async (req: RequestWithUser, res: Response) => {
  const { error } = reqBodySchema.validate(req.body);
  if (error) {
    res.status(400).send({ message: error.details[0].message });
    return;
  }
  try {
    const { code, data } = await Models.photoInfoModels.addPhoto(
      req.user?.userId,
      req.body.category
    );
    res.status(code).send(data);
  } catch (error) {}
};
