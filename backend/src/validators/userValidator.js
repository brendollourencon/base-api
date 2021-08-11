const Joi = require('joiptbr');

const userValidatorSchemaSave = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { } }).required(),
    password: Joi.string().required()
});

const userValidatorSchemaVerifyLogin = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { } }).required(),
    password: Joi.string().required()
});

module.exports = {
    userValidatorSchemaSave,
    userValidatorSchemaVerifyLogin
};
