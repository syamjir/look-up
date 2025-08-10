import { UpdateUserPayload, User } from '../../../domain/entities/user.entity'
import { UserRepository } from '../../../domain/repositories/user.repository'
import { userModel } from '../models/user.model'

export class MongoUserRepository implements UserRepository {
  async createUser(user: User): Promise<User> {
    const createdUser = new userModel(user)
    return createdUser.save()
  }
  async findUserByEmail(email: string): Promise<User | null> {
    return await userModel.findOne({ email }).lean()
  }
  async findUserById(id: string): Promise<User | null> {
    return await userModel.findById(id).lean()
  }
  async updateUser(
    id: string,
    payload: UpdateUserPayload,
  ): Promise<User | null> {
    return await userModel.findByIdAndUpdate(id, payload, { new: true })
  }

  async deleteUser(id: string): Promise<User | null> {
    return await userModel.findByIdAndDelete(id)
  }
}
