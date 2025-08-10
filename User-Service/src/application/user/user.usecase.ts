import { UpdateUserPayload, User } from '../../domain/entities/user.entity'
import { UserRepository } from '../../domain/repositories/user.repository'
import { AppError } from '../../shared/errors/app.error'

export class UserUseCase {
  constructor(private userRepository: UserRepository) {}

  // Basic email format validation helper
  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new AppError('Invalid Email Format', 400)
    }
  }

  async createNewUser(user: User): Promise<User> {
    this.validateEmail(user.email)
    const existingUser = await this.userRepository.findUserByEmail(user.email)
    if (existingUser) throw new AppError('User already exists', 409)
    return await this.userRepository.createUser(user)
  }

  async getUserByEmail(email: string): Promise<User | null> {
    this.validateEmail(email)
    return await this.userRepository.findUserByEmail(email)
  }

  async getUserById(id: string): Promise<User | null> {
    if (!id) throw new AppError('User ID is required', 400)
    return await this.userRepository.findUserById(id)
  }

  async deleteUser(id: string): Promise<User | null> {
    if (!id) throw new AppError('User ID is required', 400)
    const deletedUser = await this.userRepository.deleteUser(id)
    if (!deletedUser) throw new AppError('User not found', 404)
    return deletedUser
  }

  async updateUser(
    id: string,
    payload: UpdateUserPayload,
  ): Promise<User | null> {
    if (!id) throw new AppError('User ID is required', 400)
    return await this.userRepository.updateUser(id, payload)
  }
}
