import Joi from "joi";
import mongoose from "mongoose";

const objectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

export const createAppValidator = Joi.object({
  appName: Joi.string().trim().min(3).max(100).required(),

  appCode: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .required(),

  isActive: Joi.boolean().optional(),
});

export const updateAppValidator = Joi.object({
  appName: Joi.string().trim().min(3).max(100),

  appCode: Joi.string()
    .trim()
    .min(3)
    .max(30),
    
  isActive: Joi.boolean(),
}).min(1);

export const appIdValidator = Joi.object({
  id: Joi.string().custom(objectId).required(),
});