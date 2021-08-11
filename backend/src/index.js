require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const Routes = require("./routes/Routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: process.env.URL_FRONTEND }));
app.use(bodyParser.json());
app.use(helmet());

app.use(new Routes().routes());

app.use((req, res) => {
  res.status(404).send("Erro 404");
});

app.use(function (err, req, res, next) {
  res.status(500).send(err.stack);
});

app.listen(port, async () => {
  try {
    console.log(`Aplicação rodando em http://localhost:${port}`);
  } catch (error) {
    console.log(`Falha na conexão com o banco de dados: ${error}`);
  }
});
