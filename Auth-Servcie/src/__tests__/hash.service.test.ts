import { hashedPassword } from '../shared/utils/hash.service'

describe('Password Hashing Service', () => {
  const password = 'mySecret123'

  it('should hash a password', async () => {
    const hash = await hashedPassword(password)
    expect(typeof hash).toBe('string')
    expect(hash).not.toBe(password)
  })
})
