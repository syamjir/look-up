import { UpdateUserPayload, User } from '../entities/user.entity'

export interface UserRepository {
  createUser(user: User): Promise<User>
  findUserByEmail(email: string): Promise<User | null>
  findUserById(id: string): Promise<User | null>
  updateUser(id: string, payload: UpdateUserPayload): Promise<User | null>
  deleteUser(id: string): Promise<boolean>
}
