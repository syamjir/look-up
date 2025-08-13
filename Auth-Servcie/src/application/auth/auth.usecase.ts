import { User } from '../../domain/entities/user.entity'
import { UserRepository } from '../../domain/repositories/user.repository'
import { AppError } from '../../shared/errors/app.error'
import {
  comparePassword,
  hashedPassword,
} from '../../shared/utils/hash.service'
import { createJwtService } from '../../shared/utils/jwt.service'

export class AuthUseCase {
  constructor(private userRepo: UserRepository) {}

  async register(user: User) {
    const hashed = await hashedPassword(user.password)
    const newUser = await this.userRepo.create({ ...user, password: hashed })
    return { id: newUser.id, email: newUser.email }
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email)
    if (!user) throw new Error('User not found')
    const isValid = await comparePassword(password, user.password)
    if (!isValid) throw new Error('Invalid credentials')
    const token = await createJwtService().createJwtToken(user)
    if (!token) throw new Error('Failed to create token')
    return { token }
  }
  async verifyToken(token: string) {
    if (!token) throw new AppError('Token missing', 401)
    try {
      const decoded = await createJwtService().decodeJwtToken(token)
      const currentUser = await this.userRepo.findById(decoded.id)
      if (!currentUser) throw new AppError('User no longer exists', 401)
      return { id: currentUser.id, email: currentUser.email }
    } catch (err) {
      throw new AppError('Invalid token', 401)
    }
  }
}
