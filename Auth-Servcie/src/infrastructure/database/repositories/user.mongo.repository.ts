import { UserModel } from '../models/user.model'
import { User } from '../../../domain/entities/user.entity'
import { UserRepository } from '../../../domain/repositories/user.repository'

export class MongoUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const newUser = new UserModel(user)
    return await newUser.save()
  }

  async findByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ email })
  }
}
