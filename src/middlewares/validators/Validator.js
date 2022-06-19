const {messages} = require('joi-translation-pt-br');

class Validator {
  constructor() {
    this.messages = messages;
  }

  process(error, res, next) {
    if (error) {
      let message = error.details.map(detail => detail.message.replace(/[\\"]/g, ''));
      message = message.toString().replaceAll(',', '\n');
      return res.status(400).send(message);
    }
    next();
  }

  processSchemaBody(schema, req, res, next) {
    const {error} = schema.validate(req.body, {messages: this.messages, abortEarly: false});
    return this.process(error, res, next);
  }

  processSchemaParams(schema, req, res, next) {
    const {error} = schema.validate(req.params, {messages: this.messages, abortEarly: false});
    return this.process(error, res, next);
  }

}

module.exports = Validator;
