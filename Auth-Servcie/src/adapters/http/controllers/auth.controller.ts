import { Request, Response } from 'express'
import { AuthUseCase } from '../../../application/auth/auth.usecase'
import { MongoUserRepository } from '../../../infrastructure/database/repositories/user.mongo.repository'
import { sendTokenAsCookie } from '../../../shared/utils/cookie.service'

const userRepo = new MongoUserRepository()
const authUseCase = new AuthUseCase(userRepo)

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authUseCase.register(req.body)
    res.status(201).json(user)
  } catch (err) {
    res.status(400).json({ error: err })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const { token } = await authUseCase.login(email, password)
    sendTokenAsCookie(req, res, token)
    res.status(200).json(token)
  } catch (err) {
    res.status(401).json({ error: err })
  }
}
