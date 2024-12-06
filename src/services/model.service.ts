class ModelService<T> {
  public model: any;

  constructor(model: any) {
    this.model = model;
  }

  // get entity by id
  async findById(id: number) {
    return this.model.findUnique({ where: { id } });
  }

  // get all entities
  async findAll() {
    return this.model.findMany();
  }

  // create entity
  async create(data: any) {
    return this.model.create({ data });
  }

  // update entity
  async update(id: number, data: any) {
    return this.model.update({ where: { id }, data });
  }

  //   delete entity
  async delete(id: number) {
    return this.model.delete({ where: { id } });
  }
}

export default ModelService;
