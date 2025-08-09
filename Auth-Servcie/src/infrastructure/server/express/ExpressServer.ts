import dotenv from 'dotenv'
import express, { Application } from 'express'
import authRoutes from '../../../adapters/http/routes/auth.routes'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import { xss } from 'express-xss-sanitizer'
import compression from 'compression'

dotenv.config()

export class ExpressServer {
  private app: Application
  private PORT: string

  constructor() {
    this.app = express()
    this.PORT = process.env.PORT || ''
    this.checkEnvAvailable()
    this.configureMiddleware()
    this.configureRoutes()
    this.startServer()
  }

  private checkEnvAvailable(): void {
    if (!this.PORT) {
      throw new Error('env access failure')
    }
  }

  private configureMiddleware(): void {
    // Global middlewares
    this.app.use(express.json())
    this.app.use(cookieParser())
    this.app.use(cors())
    //  Security middleware
    this.app.use(helmet()) // Set security HTTP headers
    const apiLimiter = rateLimit({
      // Limit requests from same API
      max: 100,
      windowMs: 60 * 60 * 1000,
      message: 'Too many requests from this IP, please try again in an hour!',
    })
    this.app.use('/api', apiLimiter)
    this.app.use(mongoSanitize()) // Data sanitization against NoSQL query injection
    this.app.use(xss()) // Data sanitization against XSS
    this.app.use(compression()) // Enable gzip compression for all responses
  }

  private configureRoutes(): void {
    this.app.use('/api/auth', authRoutes)
  }

  private startServer(): void {
    this.app.listen(this.PORT, () => {
      console.log(`✅ Server running on port ${this.PORT}`)
    })
  }
}

export function connectServer() {
  new ExpressServer()
}
