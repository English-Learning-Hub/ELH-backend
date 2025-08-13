import { ConflictException, NotFoundException } from '@nestjs/common';
import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';

export class BaseService<T extends { id: number }> {
  // protected throwIfDeleted(entity: T, entityName = 'Entity') {
  //   if (entity.isDeleted) {
  //     throw new NotFoundException(`${entityName} is deleted`);
  //   }
  // }

  protected async findOneOrFailNotDeleted(
    entityName = 'Entity',
    repository: Repository<T>,
    where?: FindOptionsWhere<T>,
    relations?: FindOptionsRelations<T>,
  ): Promise<T> {
    const entity = await repository.findOne({
      where: where,
      relations: relations,
    });
    if (!entity) throw new NotFoundException(`${entityName} not found`);
    // this.throwIfDeleted(entity, entityName);
    return entity;
  }

  protected async findExisting(
    entityName = 'Entity',
    repository: Repository<T>,
    where?: FindOptionsWhere<T>,
  ) {
    const entity = await repository.findOne({ where: where });
    if (entity) throw new ConflictException(`${entityName} already exists`);
  }
}
