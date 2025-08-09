import { hashedPassword, comparePassword } from '../shared/utils/hash.service'

describe('Password Hashing Service', () => {
  const password = 'mySecret123'

  it('should hash a password', async () => {
    const hash = await hashedPassword(password)
    expect(typeof hash).toBe('string')
    expect(hash).not.toBe(password)
  })
  const plainPassword = 'mySecret123'
  it('should return true for correct password', async () => {
    const hash = await hashedPassword(plainPassword)
    const result = await comparePassword(plainPassword, hash)
    expect(result).toBe(true)
  })

  it('should return false for incorrect password', async () => {
    const hash = await hashedPassword(plainPassword)
    const result = await comparePassword('wrongPassword', hash)
    expect(result).toBe(false)
  })
})
