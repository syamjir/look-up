import { Router } from 'express'
import {
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  getUserById,
} from '../controllers/user.controller'

const router = Router()

// Create a new user
router.post('/', createUser)

// Update a user by ID
router.patch('/me', updateUser)

// Delete a user by ID
router.delete('/me', deleteUser)

// Get a user by email
router.get('/email/:email', getUserByEmail)

// Get a user by ID
router.get('/:id', getUserById)

export default router
