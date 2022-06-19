const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_SECRET, JWT_REFRESH_SECRET} = process.env;

const UserRepository = require('../repositories/UserRepository');
const UserStatusEnum = require('../enum/UserStatusEnum');

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async login(email, password) {
    const user = await this.repository.model.findOne({where: {email}});

    if (!user) throw 'Usuário não encontrado';
    if (!user.password || !bcrypt.compareSync(password, user.password)) throw 'Usuário ou senha incorretos';

    const data = {email: user.email, id: user.id};
    const token = jwt.sign({data}, JWT_SECRET, {expiresIn: '1y', algorithm: 'HS512'});
    const refreshToken = jwt.sign({data}, JWT_REFRESH_SECRET, {expiresIn: '24h', algorithm: 'HS512'});
    return {token, refreshToken, id: user.id};
  }

  async createUser({name, email, password, phone}) {
    const hasUser = await this.repository.model.findOne({where: {email}});
    if (hasUser) throw new Error('Este usuário já está cadastrado na base de dados');

    return await this.repository.model.create({
      phone: phone.replace(/\D/g, ""),
      email,
      status: UserStatusEnum.get('ACTIVE').value.id,
      password: bcrypt.hashSync(password.trim(), bcrypt.genSaltSync()),
      name,
    });
  }
}

module.exports = UserService;
