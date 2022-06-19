const schedule = require('node-schedule');

class Tasks {

  constructor() {
    this.task = schedule;
    this.enableTasks = process.env.ENABLE_TASKS;
  }

  run() {
    if (this.enableTasks === 'true') {
      return;
    }

    console.log('Tarefas em background desabilitadas');
  }
}

module.exports = Tasks;
