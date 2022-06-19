const express = require('express');
const UserRouter = require('./UserRouter');
const SentryUtil = require('../utils/SentryUtil');

class Routes {
  constructor() {
    this.router = express.Router();
    this.userRouter = new UserRouter();
    this.sentry = new SentryUtil();
  }

  routes() {
    this.router.get('/health-check', (req, res) => res.status(200).send());

    this.router.get('/sentry', async (req, res) => {
      try {
        throw new Error('Testando sentry na aplicação.');
      } catch (e) {
        await this.sentry.notifyErrors(e, req);
        res.status(500).send('Erro enviado');
      }
    });

    this.router.use('/user', this.userRouter.routes());

    return this.router;
  }
}

module.exports = Routes;
