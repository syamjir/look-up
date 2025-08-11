import mongoose from 'mongoose'

export const connectToMongoDB = async (uri: string) => {
  try {
    await mongoose.connect(uri)
    console.log('✅ MongoDB connected')
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error)
    process.exit(1)
  }
}
