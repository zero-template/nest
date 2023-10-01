import { Repository } from '@zero-template/helper';
import { DataSource, Repository as EntityRepository } from 'typeorm';
import { User } from '../../entities/user/user.entity';

@Repository
export class UserRepository extends EntityRepository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager(), dataSource.createQueryRunner());
  }

  /**
   * write your DAO methods here
   * you also can create same class to write other DAO, but the class name must end with `Repository`
   * otherwise it will not be recognized as DAO
   *
   * 在此处编写 DAO 方法
   * 你也可以以相同的方法来编写其他 DAO，但是类名必须以 `Repository` 结尾
   * 否则无法被识别为 DAO
   */
}
