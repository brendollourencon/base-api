const Joi = require('joi');
const Validator = require('./Validator');

class UserValidator extends Validator{

  constructor() {
    super();
    this.joi = Joi;
  }

  create(req, res, next){
    const schema = this.joi.object({
      name: this.joi.string().required().label('nome'),
      email: this.joi.string().email().required(),
      phone: this.joi.string().required().label('telefone'),
      password: this.joi.string().required().label('senha'),
      passwordConfirmation: this.joi.string().label('Confirmação de senha'),
    });

    return this.processSchemaBody(schema, req, res, next);
  }

  login(req, res, next){
    const schema = this.joi.object({
      email: this.joi.string().email().required(),
      password: this.joi.string().required().label('senha'),
    });

    return this.processSchemaBody(schema, req, res, next);
  }
}

module.exports = UserValidator;
