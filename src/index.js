require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const Routes = require("./routes/Routes");
const Tasks = require("./tasks/Tasks");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.text({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(helmet());

app.use(new Routes().routes());

app.use((req, res) => {
  res.status(404).send("Erro 404");
});

app.use(function (err, req, res, next) {
  res.status(500).send(err.stack);
});

new Tasks().run();

app.listen(port, async () => {
  try {
    console.log(`Aplicação rodando na porta ${port}`);
  } catch (error) {
    console.log(`Houve um erro ao subir a aplicação ${error}`);
  }
});
