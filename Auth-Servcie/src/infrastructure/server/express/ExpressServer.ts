import dotenv from 'dotenv'
import express, { Application } from 'express'
// import { authRoutes } from './adapters/http/routes/auth.routes' // adjust the path

dotenv.config()

export class ExpressServer {
  private app: Application
  private PORT: string

  constructor() {
    this.app = express()
    this.PORT = process.env.PORT || ''
    this.checkEnvAvailable()
    this.configureMiddleware()
    // this.configureRoutes()
    this.startServer()
  }

  private checkEnvAvailable(): void {
    if (!this.PORT) {
      throw new Error('env access failure')
    }
  }

  private configureMiddleware(): void {
    this.app.use(express.json())
  }

  // private configureRoutes(): void {
  //   this.app.use('/auth', authRoutes)
  // }

  private startServer(): void {
    this.app.listen(this.PORT, () => {
      console.log(`✅ Server running on port ${this.PORT}`)
    })
  }
}

export function connectServer() {
  new ExpressServer()
}
