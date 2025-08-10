import { Request, Response, NextFunction } from 'express'
import { MongoUserRepository } from '../../../infrastructure/database/repositories/user.mongo.repository'
import { UserUseCase } from '../../../application/user/user.usecase'
import { AppError } from '../../../shared/errors/app.error'

const userRepo = new MongoUserRepository()
const userUseCase = new UserUseCase(userRepo)

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await userUseCase.createNewUser(req.body)
    res.status(201).json(user)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const statusCode = err?.statusCode || 400
    next(new AppError(err.message || 'Failed to create user', statusCode))
  }
}

export async function getUserByEmail(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const email = req.params.email
  const user = await userUseCase.getUserByEmail(email)
  if (!user) next(new AppError('User not found', 404))
  res.json(user)
}

export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const id = req.params.id
  const user = await userUseCase.getUserById(id)
  if (!user) next(new AppError('User not found', 404))
  res.json(user)
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const id = req.user?.id
  if (!id) return next(new AppError('User ID missing from request', 400))
  try {
    await userUseCase.deleteUser(id)
    res
      .status(204)
      .json({ status: 'success', message: 'User deleted successfully' })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const statusCode = err?.statusCode || 500
    next(new AppError(err.message || 'Failed to create user', statusCode))
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const id = req.user?.id
  if (!id) return next(new AppError('User ID missing from request', 400))

  const payload = req.body
  if (!payload || Object.keys(payload).length === 0) {
    return next(new AppError('Payload missing or empty in request', 400))
  }

  try {
    const updatedUser = await userUseCase.updateUser(id, payload)
    if (!updatedUser) {
      return next(new AppError('User not found', 404))
    }
    res.status(200).json(updatedUser)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const statusCode = err?.statusCode || 500
    next(new AppError(err.message || 'Failed to update user', statusCode))
  }
}
