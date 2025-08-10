export interface User {
  id?: string
  name: string
  email: string
  passwordHash: string
  role: 'user' | 'admin'
  createdAt?: Date
  updatedAt?: Date
}

export interface UpdateUserPayload {
  name: string
}
