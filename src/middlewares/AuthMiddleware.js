const jwt = require("jsonwebtoken");

class AuthMiddleware {
  constructor() {

  }

  async ValidateToken(req, res, next) {
    try {
      const {authorization} = req.headers || "";
      const [type, token] = authorization ? authorization.split(" ") : [];

      if (!token || type !== "Bearer") {
        return res.status(401).json({message: "Not Authorized"});
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          if (err === "TokenExpiredError") {
            return res.status(403).json({message: "Token Expired"});
          }
          return res.status(401).json({message: "Not Authorized"});
        }

        const {data} = decoded;

        req.idUser = data.id;
        req.emailUser = data.email;

        next();
      });
    } catch (error) {
      res.status(500).send(`Houve um erro ao validar o token de autenticação: ${error}`);
    }
  }
}

module.exports = AuthMiddleware;
