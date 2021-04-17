import { Repository, EntityRepository } from 'typeorm'
import { User } from '../entity/User'

@EntityRepository(User)
class UsersRepository extends Repository<User> {}

export { UsersRepository }
