export interface BaseOrmRepository<Entity, Filter> {
  findByFilter(filter: Filter): Promise<Entity[]>;
  findOne (id: number | string): Promise<Entity>;
  save (data: Entity): Promise<Entity>;
  update (id: number | string, data: Entity): Promise<Entity>;
  delete (id: number): Promise<Entity>;
}
