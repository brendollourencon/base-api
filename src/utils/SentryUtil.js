const Sentry = require("@sentry/node");
require("@sentry/tracing");

class SentryUtil {
  constructor() {
    this.canNotifyErrors = process.env.CAN_NOTIFY_ERRORS ? process.env.CAN_NOTIFY_ERRORS : false;
    Sentry.init({
      dsn: process.env.SENTRY_DNS,
      tracesSampleRate: 1,
      integrations: [
        new Sentry.Integrations.Http({tracing: true}),
      ],
      debug: !!(process.env.NODE_ENV && process.env.NODE_ENV === 'development'),
    });
    this.sentry = Sentry
  }

  async notifyErrors(error, req) {
    if (this.canNotifyErrors) {
      try {
        this.sentry.captureException(error, {
          user: {
            id: req?.idUser || 'Usuário não logado',
            email: req?.emailUser || 'Usuário não logado',
          },
        });
      } catch (e) {
        console.error('Não foi possível estabelecer uma nova conexão com o sentry: ' + e);
      }
    }
  }

}

module.exports = SentryUtil;
