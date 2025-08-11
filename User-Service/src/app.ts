import dotenv from 'dotenv'
import { connectToMongoDB } from './infrastructure/database/connection/mongo.connection'
import { connectServer } from './infrastructure/server/express/ExpressServer'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

// Check env available
if (!MONGO_URI) {
  throw new Error('env access failure')
}

async function startApp() {
  try {
    await connectToMongoDB(MONGO_URI!)
    connectServer()
  } catch (err) {
    console.error('❌ App failed to start:', err)
    process.exit(1)
  }
}

startApp()
