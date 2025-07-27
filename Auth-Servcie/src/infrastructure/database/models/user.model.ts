import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
})

export const UserModel = mongoose.model('User', userSchema)
