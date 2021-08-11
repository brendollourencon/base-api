class Repository {
  constructor(model) {
    this.model = model;
  }

  async all(attributes = ["id"], options) {
    let order = options && options.order ? options.order : ["id", "asc"];
    let limit = options && options.limit ? options.limit : 10;
    let offset = options && options.offset ? options.offset : 0;
    return await this.model.findAndCountAll({
      attributes: attributes,
      order: [order],
      limit,
      offset,
    });
  }

  async create(data) {
    return this.model.create(data);
  }

  async findOneBy(where, transaction) {
    return await this.model.findOne(
      {
        where: where,
      },
      transaction
    );
  }

  async exist(where) {
    return await this.model.findAndCountAll({
      where: where,
    });
  }

  async delete(id) {
    const data = await this.findOneBy({ id: id });
    if (!data) return false;
    await data.destroy();
    return true;
  }
}

module.exports = Repository;
