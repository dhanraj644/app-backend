import Joi from "joi";
import mongoose from "mongoose";

const objectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }

  return value;
};

export const createCheckInValidator = Joi.object({
  appId: Joi.string().custom(objectId).required(),

  deviceId: Joi.string().trim().required(),

  platform: Joi.string()
    .valid("Android", "iOS")
    .required(),

  deviceName: Joi.string().trim().required(),

  osVersion: Joi.string().trim().required(),

  timezone: Joi.string().trim().required(),

  ipAddress: Joi.string().ip().optional(),
});

export const checkInIdValidator = Joi.object({
  id: Joi.string().custom(objectId).required(),
});

export const appCheckInValidator = Joi.object({
  appId: Joi.string().custom(objectId).required(),
});

export const checkInQueryValidator = Joi.object({
  page: Joi.number().integer().min(1).default(1),

  limit: Joi.number().integer().min(1).max(100).default(10),

  deviceId: Joi.string().trim().allow(""),

  from: Joi.date(),

  to: Joi.date(),
});