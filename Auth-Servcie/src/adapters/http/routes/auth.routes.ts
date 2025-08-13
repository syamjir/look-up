import express from 'express'
import { login, register, verifyToken } from '../controllers/auth.controller'

const router = express.Router() // express router

router.post('/register', register)
router.post('/login', login)
router.post('/verifyToken', verifyToken)

export default router
