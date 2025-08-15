import { User } from '../../domain/entities/user.entity'
import jwt from 'jsonwebtoken'

class JwtService {
  private JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'
  constructor() {}

  async createJwtToken(user: User): Promise<string> {
    const token = jwt.sign(
      { id: user.id, email: user.email },
      this.JWT_SECRET,
      {
        expiresIn: '1h',
      },
    )
    return token
  }

  async decodeJwtToken(token: string): Promise<{ id: string; email: string }> {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, this.JWT_SECRET, (err, decoded) => {
        if (err) reject(err)
        resolve(decoded)
      })
    })
    return decoded as { id: string; email: string }
  }
}

export function createJwtService() {
  return new JwtService()
}
