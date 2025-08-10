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
import { Request, Response, NextFunction } from 'express'
import { IAppError } from '../../../shared/errors/error.entity'

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
    this.globalErrorHandling()
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
  private globalErrorHandling(): void {
    this.app.use(
      (err: IAppError, req: Request, res: Response, _next: NextFunction) => {
        // If no statusCode is set, treat it as 500
        const statusCode = err.statusCode || 500
        const status = err.status || 'error'

        // API routes
        if (req.originalUrl.startsWith('/api')) {
          if (err.isOperational) {
            return res.status(statusCode).json({
              status,
              message: err.message,
            })
          }

          // Unknown or programming error:don't leak error details
          console.error('ERROR 💥', err)
          return res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!',
          })
        }
      },
    )
  }
}

export function connectServer() {
  new ExpressServer()
}
