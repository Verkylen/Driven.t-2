import Joi from "joi";

const naturalNumberSchema = Joi.string().pattern(new RegExp("^[1-9][0-9]*$")).required();

export const readPaymentsSchema = Joi.object({
  ticketId: naturalNumberSchema
});

export const paymentRequestSchema = Joi.object({
  ticketId: Joi.number().integer().positive().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: naturalNumberSchema,
    name: Joi.string().required(),
    expirationDate: Joi.string().required(),
    cvv: naturalNumberSchema
  }).required()
});
