import { User } from '../../domain/entities/user.entity'
import { UserRepository } from '../../domain/repositories/user.repository'
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
    const token = await createJwtService(user).createJwtToken
    if (!token) throw new Error('Failed to create token')
    return { token }
  }
}
