import { Response, Request } from 'express'

export function sendTokenAsCookie(res: Response, req: Request, token: string) {
  const cookieExpiresIn = Number(process.env.JWT_COOKIE_EXPIRES_IN)
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + cookieExpiresIn * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  })
}
